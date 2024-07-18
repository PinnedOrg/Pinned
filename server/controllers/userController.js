const User = require("../models/User");
const Club = require("../models/Club");
const mongoose = require("mongoose");

const createUser = async (req) => {
    const { userId } = req.auth;

    const newUser = new User({
      clerk_id: userId, // Clerk user ID
      clubs: []
    });

    const savedUser = await newUser.save();
}

const subscribe = async (req, res) => {
  const { clubId } = req.params;
  const { userId } = req.auth;

  try {
    const user = await User.findOne({ clerk_id: userId });

    if (!user) {
      createUser(req);
      user = await User.findOne({ clerk_id: userId })
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

module.exports = {
	createUser,
  subscribe,
};