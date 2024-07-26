const User = require("../models/User");
const Club = require("../models/Club");
const mongoose = require("mongoose");

const createUser = async (req, res) => {

    const { userId } = req.auth;

    const newUser = new User({
      clerkId: userId, // Clerk user ID
      clubs: [],
      reviews: []
    });

    const savedUser = await newUser.save();
}

// handles subscribing and unsubscribing to clubs
const subscribe = async (req, res) => {
  const { clubId } = req.params;
  const { userId } = req.auth;

  try {
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      await createUser(req);
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
  subscribe,
  getAllUsers
};
