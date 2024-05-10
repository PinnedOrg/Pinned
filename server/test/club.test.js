const { mongoose, MongoClient, app, chai, expect, Club, connectToDatabase, disconnectFromDatabase, club_data } = require("./testUtils");

describe("Club Controller API", () => {
  let db;
  let club_collection;

  before(async function () {
    this.timeout(30000);
    db = await connectToDatabase();
    club_collection = db.collection("clubs");
  });

  beforeEach(async function () {
    this.timeout(30000);
    await Club.deleteMany({});
  });

  after(async function () {
    this.timeout(30000);
    await disconnectFromDatabase(db.client);
  });

  // Test GET route
  describe("GET /api/clubs", () => {
    it("It should GET 0 clubs when none exist", async () => {
      const response = await chai.request(app).get("/api/clubs");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(0);
    });

    it("It should GET all clubs when some exist", async () => {
      for (let i = 0; i < 3; i++) {
        const club_data_with_unique_id = await {...club_data, _id: new mongoose.Types.ObjectId(),};

        await club_collection.insertOne(club_data_with_unique_id);
      }

      const response = await chai.request(app).get("/api/clubs");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(3);
    });
  });

  // Test GET preview route
  describe("GET /api/clubs/previews", () => {
    it("It should GET 0 club previews when none exist", async () => {
      const response = await chai.request(app).get("/api/clubs/previews");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(0);
    });

    it("It should GET all club previews when some exist", async () => {
      for (let i = 0; i < 3; i++) {
        const club_data_with_unique_id = await {...club_data, _id: new mongoose.Types.ObjectId()};

        await club_collection.insertOne(club_data_with_unique_id);
      }

      const response = await chai.request(app).get("/api/clubs/previews");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(3);

      // validate the preview properties for each club
      response.body.forEach((obj) => {
        expect(obj).to.have.property('_id');
        expect(obj).to.have.property('name').equal(club_data.name);
        expect(obj).to.have.property('publicStatus').equal(club_data.publicStatus);
        expect(obj).to.have.property('owner').equal(club_data.owner);
        expect(obj).to.have.property('createdAt').equal(new Date(club_data.createdAt).toISOString());
        expect(obj).to.have.property('updatedAt').equal(new Date(club_data.updatedAt).toISOString());
      });
    });
  });

  // Test GET (by ID) route
  describe("GET /api/clubs/:id", () => {
    it("It should GET a club by ID", async () => {
      const club = await club_collection.insertOne(club_data);
      const response = await chai
        .request(app)
        .get(`/api/clubs/${club.insertedId}`);
      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(club.insertedId.toString());
    });

    it("It should not GET a club with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .get(`/api/clubs/invalid_id_type`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Club not found.");
    });

    it("It should not GET an club that does not exist anymore", async () => {
      const club = await club_collection.insertOne(club_data);
      await club_collection.deleteOne({ _id: club.insertedId });
      const response = await chai
        .request(app)
        .get(`/api/clubs/${club.insertedId}`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Club not found.");
    });
  });

  // Test POST route
  describe("POST /api/clubs", () => {
    it("It should POST an club", async () => {
      const club_number = await Club.collection.countDocuments({}, { hint: "_id_" });

      const response = await chai
        .request(app)
        .post("/api/clubs")
        .set("Content-Type", "application/json")
        .send(club_data);

      const final_club_number = await Club.collection.countDocuments({}, { hint: "_id_" });
      expect(response).to.have.status(201);
      expect(final_club_number).equal(club_number + 1);
      expect(response.body).to.have.property("name").equal(club_data.name);
      expect(response.body).to.have.property("about").equal(club_data.about);
      expect(response.body).to.have.property("publicStatus").equal(club_data.publicStatus);
      expect(response.body).to.have.property("owner").equal(club_data.owner);
      expect(response.body).to.have.property("admins").deep.equal(club_data.admins);
      expect(response.body).to.have.property("subscribers").deep.equal(club_data.subscribers);
      expect(response.body).to.have.property("location").equal(club_data.location);
      expect(response.body).to.have.property("events").deep.equal(club_data.events);
    });

    it("It should not POST a club with a validation error", async () => {
      const new_club_data = {...club_data, name: "This name is above 30 characters long which is invalid, and should trigger a validation error."};
      const club_number = await Club.collection.countDocuments({}, { hint: "_id_" });

      const response = await chai
        .request(app)
        .post("/api/clubs")
        .set("Content-Type", "application/json")
        .send(new_club_data);

      const final_club_number = await Club.collection.countDocuments({}, { hint: "_id_" });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property("error").equal("Club validation failed: name: Club name can not be longer than 30 characters.");
      expect(final_club_number).equal(club_number);
    });
  });

  // Test PATCH route
  describe("PATCH /api/clubs/:id", () => {
    it("It should PATCH a club by ID", async () => {
      const club = await club_collection.insertOne(club_data);

      const response = await chai
        .request(app)
        .patch(`/api/clubs/${club.insertedId}`)
        .set("Content-Type", "application/json")
        .send({name: "Updated Title."});

      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(club.insertedId.toString());
      expect(response.body.name).to.eq("Updated Title.");
    });

    it("It should not PATCH a club by ID with a validation error", async () => {
      const club = await club_collection.insertOne(club_data);

      const response = await chai
        .request(app)
        .patch(`/api/clubs/${club.insertedId}`)
        .set("Content-Type", "application/json")
        .send({
          name:
            "This title is above 30 characters long which is invalid, and should trigger a validation error.",
        });
        
      expect(response).to.have.status(400);
      expect(response.body)
        .to.have.property("error")
        .equal(
          "Validation failed: name: Club name can not be longer than 30 characters."
        );
    });

    it("It should not PATCH a club with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .patch(`/api/clubs/invalid_id_type`);

      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Club not found.");
    });

    it("It should not PATCH a club that does not exist anymore", async () => {
      const club = await club_collection.insertOne(club_data);
      await club_collection.deleteOne({ _id: club.insertedId });

      const response = await chai
        .request(app)
        .patch(`/api/clubs/${club.insertedId}`);

      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Club not found.");
    });
  });

  // Test DELETE route
  describe("DELETE /api/clubs/:id", () => {
    it("It should DELETE a club by ID", async () => {
      const club = await club_collection.insertOne(club_data);
      const club_number = await Club.collection.countDocuments({}, { hint: "_id_" });
      const response = await chai
        .request(app)
        .delete(`/api/clubs/${club.insertedId}`);

      const final_club_number = await Club.collection.countDocuments({}, { hint: "_id_" });
      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(club.insertedId.toString());
      expect(final_club_number).to.eq(club_number - 1);
    });

    it("It should not DELETE a club with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .delete(`/api/clubs/invalid_id_type`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Club not found.");
    });

    it("It should not DELETE a club that does not exist anymore", async () => {
      const club = await club_collection.insertOne(club_data);
      await club_collection.deleteOne({ _id: club.insertedId });
      const response = await chai
        .request(app)
        .delete(`/api/clubs/${club.insertedId}`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Club not found.");
    });
  });
});
