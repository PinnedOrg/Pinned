const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

const { connectToDatabase } = require('../database/db');
const Club = require('../models/Club');

async function updateFeaturedClubs () {
    const numFeaturedClubs = 2;
    let session;
    try {
        // Connect to the database
        await connectToDatabase(process.env.MONGO_URI)
        console.log('in')
        session = await mongoose.startSession();
        session.startTransaction();

        const oldClubsOfTheWeek = await Club.find({ featured: 1 }).session(session);
        // const oldUpcomingClub = await Club.findOne({ featured: 2 }).session(session);

        console.log('Old club of the week:', oldClubsOfTheWeek.map(club => club.name));
    
        // Pick a random club to be new club of the week and upcoming club
        let newClubsOfTheWeek = [];
        for (let i = 0; i < numFeaturedClubs; i++) {
            const club = await Club.findOne({ 
                isActive: true,
                validation: true,
                featured: 0,
                _id: { $nin: oldClubsOfTheWeek.map(club => club._id) },
                $expr: { $gte: ["$size", 12] } 
            }).session(session);

            if (!club) {
                console.log('No new club of the week found');
                await session.abortTransaction();
                session.endSession();
                mongoose.connection.close();
                return;
            }
            newClubsOfTheWeek.push(club);
        }
        // const newUpcomingClub = await Club.findOne({ 
        //     isActive: true,
        //     validation: true,
        //     _id: { $nin: [oldClubOfTheWeek._id, oldUpcomingClub._id] },
        //     $expr: { $lt: ["$size", 12] } 
        // }).session(session);
        
        if (newClubsOfTheWeek.length === 0) console.log('No new club of the week found'); 
        // if (!newUpcomingClub) console.log('No new upcoming club found');
        if (newClubsOfTheWeek.length === 0 || !newUpcomingClub) {
            await session.abortTransaction();
            session.endSession();
            mongoose.connection.close();
            return;
        }

        await Club.updateMany({}, { featured: 0 }).session(session);
        foreach(newClubsOfTheWeek, async (club) => {
            await Club.findByIdAndUpdate(club._id, { featured: 1 }).session(session);
        });
        // await Club.findByIdAndUpdate(newUpcomingClub._id, { featured: 2 }).session(session);
    
        // console.log('Club of the week updated from ', oldClubOfTheWeek.name, ' to ', newClubOfTheWeek.name);
        // console.log('Upcoming club updated from ', oldUpcomingClub.name, ' to ', newUpcomingClub.name);
        
        await session.commitTransaction();
        session.endSession();
        mongoose.connection.close();
    } catch (error) {
        await session?.abortTransaction();
        session?.endSession();
        mongoose.connection.close();
        console.error('Error updating club of the week or upcoming club:', error);
    }
}

updateFeaturedClubs();