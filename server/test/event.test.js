require("dotenv").config({ path: ".env.test" }); // using a test environment
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const app = require("../app");
const { v4: uuidv4 } = require("uuid"); // used when creating multiple events and assigning each one a unique "_id"
const Event = require("../models/Event");

// importing libraries for tests
const chai = require("chai");
const chaiHttp = require("chai-http"); // used to make http requests to database
chai.use(chaiHttp);
const { expect } = chai;

// initializing variables to be used when running the test environment
let db;
let collection;

// faker library to create fake data when creating elements in collections
const { faker } = require("@faker-js/faker");

// initialized eventData to run tests faster when creating documents in database
const eventData = {
  title: faker.word.noun(10),
  description: faker.lorem.sentence(5),
  contact: faker.word.noun(10),
  tags: Array.from({ length: 3 }, () => faker.word.noun()),
  date: faker.date.future().toISOString().split("T")[0], // Get a future date in ISO format
  time: faker.word.noun(1),
  location: faker.location.city(),
};

// Connect to the database
before(async function () {
  this.timeout(30000);
  const client = await MongoClient.connect(process.env.MONGO_URI);
  db = client.db();
  collection = db.collection("events");
});

// Clear the database before each test
beforeEach(async function () {
  this.timeout(30000);
  await Event.deleteMany({}); // This deletes all documents in the collection
});

// Close the database connection after all tests
after(async function () {
  this.timeout(30000);
  await mongoose.disconnect();
});

describe("Event Controller API", () => {
  // Test GET route
  describe("GET /api/events", () => {
    it("It should GET 0 events when none exist", async () => {
      const response = await chai.request(app).get("/api/events");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(0);
    });

    it("It should GET all events when some exist", async () => {
      for (let i = 0; i < 3; i++) {
        const eventDataWithUniqueId = await {
          ...eventData,
          _id: uuidv4(),
        };

        await collection.insertOne(eventDataWithUniqueId);
      }

      const response = await chai.request(app).get("/api/events");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(3);
    });
  });

  // Test GET (by ID) route
  describe("GET /api/events/:id", () => {
    it("It should GET an event by ID", async () => {
      const event = await collection.insertOne(eventData);
      const response = await chai
        .request(app)
        .get(`/api/events/${event.insertedId}`);
      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(event.insertedId.toString());
    });

    it("It should not GET an event with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .get(`/api/events/invalid_id_type`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Event not found.");
    });

    it("It should not GET an event that does not exist anymore", async () => {
      const event = await collection.insertOne(eventData);
      await collection.deleteOne({ _id: event.insertedId });
      const response = await chai
        .request(app)
        .get(`/api/events/${event.insertedId}`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Event not found.");
    });
  });

  // Test POST route
  describe("POST /api/events", () => {
    let title;
    let description;
    let contact;
    let tags;
    let date;
    let time;
    let location;

    before(() => {
      title = "Test title";
      description = "Test description";
      contact = "Test contact";
      tags = ["Tag 1", "Tag 2"];
      date = Date.now();
      time = "3 pm";
      location = "Test location";
    });

    it("It should POST an event", async () => {
      const event_number = await Event.collection.countDocuments(
        {},
        { hint: "_id_" }
      );
      const response = await chai
        .request(app)
        .post("/api/events")
        .set("Content-Type", "application/json")
        .send({
          title: title,
          description: description,
          contact: contact,
          tags: tags,
          date: date,
          time: time,
          location: location,
        });

      const final_event_number = await Event.collection.countDocuments(
        {},
        { hint: "_id_" }
      );
      expect(response).to.have.status(201);
      expect(final_event_number).equal(event_number + 1);
      expect(response.body).to.have.property("title").equal(title);
      expect(response.body).to.have.property("description").equal(description);
      expect(response.body).to.have.property("contact").equal(contact);
      expect(response.body).to.have.property("tags").deep.equal(tags);
      expect(response.body)
        .to.have.property("date")
        .equal(new Date(date).toISOString());
      expect(response.body).to.have.property("time").equal(time);
      expect(response.body).to.have.property("location").equal(location);
    });

    it("It should not POST an event with a validation error", async () => {
      const event_number = await Event.collection.countDocuments(
        {},
        { hint: "_id_" }
      );
      const response = await chai
        .request(app)
        .post("/api/events")
        .set("Content-Type", "application/json")
        .send({
          title:
            "This title is above 30 characters long which is invalid, and should trigger a validation error.",
          description: description,
          contact: contact,
          tags: tags,
          date: date,
          time: time,
          location: location,
        });

      const final_event_number = await Event.collection.countDocuments(
        {},
        { hint: "_id_" }
      );
      expect(response).to.have.status(400);
      expect(response.body)
        .to.have.property("error")
        .equal(
          "Event validation failed: title: Event title can not be longer than 30 characters."
        );
      expect(final_event_number).equal(event_number);
    });
  });

  // Test PATCH route
  describe("PATCH /api/events/:id", () => {
    it("It should PATCH an event by ID", async () => {
      const event = await collection.insertOne(eventData);
      const response = await chai
        .request(app)
        .patch(`/api/events/${event.insertedId}`)
        .set("Content-Type", "application/json")
        .send({
          title: "Updated Title.",
        });
      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(event.insertedId.toString());
      expect(response.body.title).to.eq("Updated Title.");
    });

    it("It should not PATCH an event by ID with a validation error", async () => {
      const event = await collection.insertOne(eventData);
      const response = await chai
        .request(app)
        .patch(`/api/events/${event.insertedId}`)
        .set("Content-Type", "application/json")
        .send({
          title:
            "This title is above 30 characters long which is invalid, and should trigger a validation error.",
        });
      expect(response).to.have.status(400);
      expect(response.body)
        .to.have.property("error")
        .equal(
          "Validation failed: title: Event title can not be longer than 30 characters."
        );
    });

    it("It should not PATCH an event with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .patch(`/api/events/invalid_id_type`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Event not found.");
    });

    it("It should not PATCH an event that does not exist anymore", async () => {
      const event = await collection.insertOne(eventData);
      collection.deleteOne({ _id: event.insertedId });
      const response = await chai
        .request(app)
        .patch(`/api/events/${event.insertedId}`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Event not found.");
    });
  });

  // Test DELETE route
  describe("DELETE /api/events/:id", () => {
    it("It should DELETE an event by ID", async () => {
      const event = await collection.insertOne(eventData);
      const event_number = await Event.collection.countDocuments(
        {},
        { hint: "_id_" }
      );
      const response = await chai
        .request(app)
        .delete(`/api/events/${event.insertedId}`);

      const final_event_number = await Event.collection.countDocuments(
        {},
        { hint: "_id_" }
      );
      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(event.insertedId.toString());
      expect(final_event_number).to.eq(event_number - 1);
    });

    it("It should not DELETE an event with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .delete(`/api/events/invalid_id_type`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Event not found.");
    });

    it("It should not DELETE an event that does not exist anymore", async () => {
      const event = await collection.insertOne(eventData);
      await collection.deleteOne({ _id: event.insertedId });
      const response = await chai
        .request(app)
        .delete(`/api/events/${event.insertedId}`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Event not found.");
    });
  });
});
