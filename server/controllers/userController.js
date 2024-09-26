const User = require("../models/User");
const Club = require("../models/Club");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createClerkClient } = require('@clerk/backend');

const { sendEmail } = require("../helpers/emailHelper");

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

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No account found with that email" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const { verified } = await clerkClient.users.verifyPassword({ userId: user.clerkId, password: hashedPassword });

    if (!verified) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, clubs: user.clubs } });


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

    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date(Date.now() + 24*60*60*1000); // 1 day

    // create user in our db
    user = await User.create({
      firstName,
      lastName,
      email,
      clerkId: 'temp',
      verified: false,
      emailVerificationToken,
      tokenExpiration,
      clubs: [],
      reviews: []
    });

    if (!user) {
      return res.status(400).json({ message: "Error creating account" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // create user in Clerk
    clerkUser = await clerkClient.users.createUser({
      externalId: user._id,
      firstName,
      lastName,
      emailAddress: [email], 
      password: hashedPassword,
    });

    // update user with clerkId
    user.clerkId = clerkUser.id;
    await user.save();

    // send email confirmation email to user
    const emailSubject = "UW Pinned - Verify your email";
    const emailText = `Click this link to verify your email: \n${process.env.CLIENT_URL}/verify-email?token=${emailVerificationToken}`;
    sendEmail(email, emailSubject, emailText);

    res.status(201).json(clerkUser);
  } catch (error) {
    errorMessage = error.errors?.[0].message ?? error.message;

    if (user) {
      await User.deleteOne({ email });
    }
    if (clerkUser) {
      await clerkClient.users.deleteUser(clerkUser.id);
    }

    res.status(error.status || 500).json({ message: errorMessage });
  }
}


const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
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
      await createUser(userId);
      user = await User.findOne({ clerkId: userId })
    }
    
    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(404).json({ error: "Club not found." });
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
  verifyEmail
};
