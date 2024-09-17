const User = require("../models/User");
const Club = require("../models/Club");
const mongoose = require("mongoose");
const { createClerkClient } = require('@clerk/backend');

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

  try {
    // const response = await.

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const userSignUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const regex = /^[a-zA-Z0-9._%+-]+@uwaterloo\.ca$/;
  if (!regex.test(email)) {
      return res.status(400).json({ message: "Please use a valid Waterloo email." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Account with that email already exists." });
    }

    // create user in our db
    const user = await User.create({
      firstName,
      lastName,
      email,
      clerkId: 'temp',
      clubs: [],
      reviews: []
    });

    if (!user) {
      return res.status(400).json({ message: "Error creating account" });
    }

    // create user in Clerkkfkt
    const response = await clerkClient.users.createUser({
      externalId: user._id,
      firstName,
      lastName,
      emailAddress: [email], 
      password // TODO: hash this before sending
    });

    // update user with clerkId
    user.clerkId = response.id;
    await user.save();


    res.status(201).json(response)
  } catch (error) {
    errorMessage = error.errors?.[0].message ?? error.message;

    res.status(error.status || 500).json({ message: errorMessage });
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
  getAllUsers
};
