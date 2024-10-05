const User = require("../models/User");
const Club = require("../models/Club");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createClerkClient } = require('@clerk/backend');

const { sendVerificationEmail } = require("../helpers/emailHelper");

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const createUser = async (userId) => {
  if (!userId) {
    throw new Error("userId is missing when calling createUser");
  }

  try {
    const newUser = new User({
      clerkId: userId,
      clubs: [],
      reviews: []
    });

    await newUser.save();
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(400).json({ message: "All fields are required." });
  }

  const regex = /^[a-zA-Z0-9._%+-]+@uwaterloo\.ca$/;
  if (!regex.test(email)) {
      return res.status(400).json({ message: "Please use a valid Waterloo email." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No account found with that email" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email" });
    }

    // const hashedPassword = await bcrypt.hash(password, 12);
    
    return res.status(200).json({verified: true, user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const userSignUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    console.log(firstName, lastName, email, password, confirmPassword);
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const regex = /^[a-zA-Z0-9._%+-]+@uwaterloo\.ca$/;
  if (!regex.test(email)) {
      return res.status(400).json({ message: "Please use a valid Waterloo email." });
  }

  let user, clerkUser;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Account with that email already exists." });
    }

    // create user in our db
    user = await User.create({
      firstName,
      lastName,
      email,
      clerkId: 'temp',
      verified: false,
      clubs: [],
      reviews: []
    });

    if (!user) {
      return res.status(400).json({ message: "Error creating account" });
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    // create user in Clerk
    clerkUser = await clerkClient.users.createUser({
      externalId: user._id,
      firstName,
      lastName,
      emailAddress: [email], 
      password,
      skipPasswordChecks: process.env.ENVIRONMENT === 'Production' ? false : true
    });

    // update user with clerkId
    user.clerkId = clerkUser.id;
    await user.save();

    // send confirmation email to user
    const { status, message } = await sendVerificationEmail(email);
    if (status !== 200) {
      return res.status(status).json({ message });
    }

    res.status(201).json(clerkUser);
  } catch (error) {
    errorMessage = error.errors?.[0].message ?? error.message;

    // delete user accounts in the event of any errors
    if (user) {
      await User.deleteOne({ email });
    }
    if (clerkUser) {
      await clerkClient.users.deleteUser(clerkUser.id);
    }

    res.status(error.status || 500).json({ message: errorMessage });
  }
}

const requestVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const {status, message} = await sendVerificationEmail(email);
    res.status(status).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
}


const verifyEmailToken = async (req, res) => {
  const { email, token } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (user.verified) {
      return res.status(208).json({ message: "Email is already verified" });
    }

    if (token !== user.emailVerificationToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.tokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Token expired" });
    }

    user.verified = true;
    user.emailVerificationToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// handles subscribing and unsubscribing to clubs
const subscribe = async (req, res) => {
  const { clubId } = req.params;
  const { userId } = req.auth;

  try {
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(401).json({ error: "User not found." }) 
    }
    
    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(404).json({ error: "Invalid club id." });
    }

    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ message: "Club not found." });
    } 

    if (club.owner === userId) {
      return res.status(403).json({ message: "Club owner cannot subscribe to their own club." });
    }

    if (!user.clubs.includes(clubId) && !club.subscribers.includes(user._id)) {
      user.clubs.push(clubId);
      club.subscribers.push(user._id);
      await user.save();
      await club.save();
      res.status(200).json({ message: "Subscribed!" });

    } else if (user.clubs.includes(clubId) && club.subscribers.includes(user._id)) {
      user.clubs.pull(clubId);
      club.subscribers.pull(user._id);
      await user.save();
      await club.save();
      res.status(200).json({ message: "Unsubscribed!" });

    } else if (!user.clubs.includes(clubId)) {
      user.clubs.pull(clubId);
      await user.save();
      res.status(200).json({ message: "Unsubscribed!" });

    } else if (!club.subscribers.includes(userId)) {
      club.subscribers.pull(user._id);
      await club.save();
      res.status(200).json({ message: "Unsubscribed!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  userSignIn,
  userSignUp,
  subscribe,
  getAllUsers,
  verifyEmailToken,
  requestVerificationEmail
};
