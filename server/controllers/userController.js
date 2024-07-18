const User = require("../models/User");
const Club = require("../models/Club");
const mongoose = require("mongoose");
const { clerkClient } = require("@clerk/clerk-sdk-node");

const clerk = new clerkClient({
  apiKey: process.env.CLERK_API_KEY
});

const createUser = async (req, res) => {
  try {
      const { email, name } = req.body;
  
      // Verify user with Clerk
      const user = await clerk.users.verifyEmailAddress(email);
      
      if (!user) {
        return res.status(400).json({ message: "User not authenticated with Clerk." });
      }
  
      const newUser = new User({
        name,
        email: user.email_addresses[0].email_address, // Use email from Clerk
        clerk_id: user.id, // Clerk user ID
        clubs: []
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const subscribe = async (req, res) => {
  try {
    const { userId, clubId } = req.body;

    const user = await User.findById(userId);
    const club = await Club.findById(clubId);

    if (!user || !club) {
      return res.status(404).json({ message: "User or Club not found." });
    }

    // Add club to user's clubs if not already added
    if (!user.clubs.includes(clubId)) {
      user.clubs.push(clubId);
    }

    // Add user to club's subscribers if not already added
    if (!club.subscribers.includes(userId)) {
      club.subscribers.push(userId);
    }

    await user.save();
    await club.save();

    res.status(200).json({ message: "Subscribed!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
	createUser,
  subscribe,
};
