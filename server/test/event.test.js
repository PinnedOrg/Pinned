require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Event = require('../models/Event');

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

// Connect to the database
before(async function () {
  this.timeout(30000)
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

// Clear the database before each test
beforeEach(async function () {
  this.timeout(30000)
  await Event.deleteMany({}); // This deletes all documents in the collection
});

// Close the database connection after all tests
after(async function () {
  this.timeout(30000)
  await mongoose.disconnect();
});

describe("Event Controller API", () => {
  // Test GET route
  describe("GET /api/events", () => {
    it("It should GET all the events", async () => {
      const response = await chai.request(app).get("/api/events");
      response.should.have.status(200);
      response.body.should.be.a("array");
      response.body.length.should.be.eq(0);
    });
  });

  // Test GET (by ID) route

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

    it("It should POST an event", (done) => {
      chai
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
        })
        .end((error, response) => {
          response.should.have.status(201);
          expect(response.body).to.have.property("title").equal(title);
          expect(response.body).to.have.property("description").equal(description);
          expect(response.body).to.have.property("contact").equal(contact);
          expect(response.body).to.have.property("tags").deep.equal(tags);
          expect(response.body).to.have.property("date").equal((new Date(date)).toISOString());
          expect(response.body).to.have.property("time").equal(time);
          expect(response.body).to.have.property("location").equal(location);
          done();
        });
    });
  });

  // Test PATCH route

  // Test DELETE route
});
