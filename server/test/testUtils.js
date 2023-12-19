require("dotenv").config({ path: ".env.test" });
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const app = require("../app");

const Event = require("../models/Event");
const Board = require("../models/Board");

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;
const { faker } = require("@faker-js/faker");

const fs = require('fs');
const path = require('path');

// Read the image file
const imagePath = path.join(__dirname, 'testImage.png'); // Adjust the file name
const imageBuffer = fs.readFileSync(imagePath);

// Read the pdf file
const pdfPath = path.join(__dirname, 'testPdf.pdf'); // Adjust the file name
const pdfBuffer = fs.readFileSync(pdfPath);

const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  return client.db();
};

const disconnectFromDatabase = async (client) => {
  await client.close();
};

const event_data = {
    title: faker.word.noun(10),
    description: faker.lorem.sentence(5),
    contact: faker.word.noun(10),
    tags: Array.from({ length: 3 }, () => faker.word.noun()),
    date: faker.date.future().toISOString().split("T")[0],
    time: faker.word.noun(1),
    location: faker.location.city(),
    belongsToBoard: new mongoose.Types.ObjectId() // Generating a random ObjectId
};

const board_data = {
    name: faker.word.noun(10),
    about: faker.lorem.sentence(5),
    publicStatus: true,
    owner: faker.word.noun(),
    admins: Array.from({ length: 3 }, () => faker.word.noun()),
    subscribers: Array.from({ length: 3 }, () => faker.word.noun()),
    location: faker.location.city(),
    events: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

module.exports = {
    mongoose,
    MongoClient,
    app,
    chai,
    expect,
    before,
    after,
    faker,
    Event,
    Board,
    imageBuffer,
    pdfBuffer,
    connectToDatabase,
    disconnectFromDatabase,
    event_data,
    board_data
};