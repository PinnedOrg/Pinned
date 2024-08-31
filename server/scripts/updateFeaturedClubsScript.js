const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

const { connectToDatabase } = require('../database/db');
const Club = require('../models/Club');

async function updateFeaturedClubs () {
    let session;
    try {
        // Connect to the database
        await connectToDatabase(process.env.MONGO_URI)
        console.log('in')
        session = await mongoose.startSession();
        session.startTransaction();

        const oldClubOfTheWeek = await Club.findOne({ featured: 1 }).session(session);
        const oldUpcomingClub = await Club.findOne({ featured: 2 }).session(session);

        console.log('Old club of the week:', oldClubOfTheWeek.name);
        console.log('Old upcoming club:', oldUpcomingClub.name);
    
        // Pick a random club to be new club of the week and upcoming club
        const newClubOfTheWeek = await Club.findOne({ 
            isActive: true,
            validation: true,
            _id: { $nin: [oldClubOfTheWeek._id, oldUpcomingClub._id] },
            $expr: { $gte: ["$size", 12] } 
        }).session(session);
        
        const newUpcomingClub = await Club.findOne({ 
            isActive: true,
            validation: true,
            _id: { $nin: [oldClubOfTheWeek._id, oldUpcomingClub._id] },
            $expr: { $lt: ["$size", 12] } 
        }).session(session);
        
        if (!newClubOfTheWeek) console.log('No new club of the week found'); 
        if (!newUpcomingClub) console.log('No new upcoming club found');
        if (!newClubOfTheWeek || !newUpcomingClub) {
            await session.abortTransaction();
            session.endSession();
            mongoose.connection.close();
            return;
        }

        await Club.updateMany({}, { featured: 0 }).session(session);
        await Club.findByIdAndUpdate(newClubOfTheWeek._id, { featured: 1 }).session(session);
        await Club.findByIdAndUpdate(newUpcomingClub._id, { featured: 2 }).session(session);
    
        console.log('Club of the week updated from ', oldClubOfTheWeek.name, ' to ', newClubOfTheWeek.name);
        console.log('Upcoming club updated from ', oldUpcomingClub.name, ' to ', newUpcomingClub.name);
        
        await session.commitTransaction();
        session.endSession();
        mongoose.connection.close();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        mongoose.connection.close();
        console.error('Error updating club of the week or upcoming club:', error);
    }
}

updateFeaturedClubs();