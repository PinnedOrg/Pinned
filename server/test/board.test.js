const { mongoose, MongoClient, app, chai, expect, Board, connectToDatabase, disconnectFromDatabase, board_data } = require("./testUtils");

describe("Board Controller API", () => {
  let db;
  let board_collection;

  before(async function () {
    this.timeout(30000);
    db = await connectToDatabase();
    board_collection = db.collection("boards");
  });

  beforeEach(async function () {
    this.timeout(30000);
    await Board.deleteMany({});
  });

  after(async function () {
    this.timeout(30000);
    await disconnectFromDatabase(db.client);
  });

  // Test GET route
  describe("GET /api/boards", () => {
    it("It should GET 0 boards when none exist", async () => {
      const response = await chai.request(app).get("/api/boards");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(0);
    });

    it("It should GET all boards when some exist", async () => {
      for (let i = 0; i < 3; i++) {
        const board_data_with_unique_id = await {...board_data, _id: new mongoose.Types.ObjectId(),};

        await board_collection.insertOne(board_data_with_unique_id);
      }

      const response = await chai.request(app).get("/api/boards");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(3);
    });
  });

  // Test GET preview route
  describe("GET /api/boards/previews", () => {
    it("It should GET 0 board previews when none exist", async () => {
      const response = await chai.request(app).get("/api/boards/previews");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(0);
    });

    it("It should GET all board previews when some exist", async () => {
      for (let i = 0; i < 3; i++) {
        const board_data_with_unique_id = await {...board_data, _id: new mongoose.Types.ObjectId()};

        await board_collection.insertOne(board_data_with_unique_id);
      }

      const response = await chai.request(app).get("/api/boards/previews");
      expect(response).to.have.status(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).to.eq(3);

      // validate the preview properties for each board
      response.body.forEach((obj) => {
        expect(obj).to.have.property('_id');
        expect(obj).to.have.property('name').equal(board_data.name);
        expect(obj).to.have.property('publicStatus').equal(board_data.publicStatus);
        expect(obj).to.have.property('owner').equal(board_data.owner);
        expect(obj).to.have.property('createdAt').equal(new Date(board_data.createdAt).toISOString());
        expect(obj).to.have.property('updatedAt').equal(new Date(board_data.updatedAt).toISOString());
      });
    });
  });

  // Test GET (by ID) route
  describe("GET /api/boards/:id", () => {
    it("It should GET a board by ID", async () => {
      const board = await board_collection.insertOne(board_data);
      const response = await chai
        .request(app)
        .get(`/api/boards/${board.insertedId}`);
      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(board.insertedId.toString());
    });

    it("It should not GET a board with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .get(`/api/boards/invalid_id_type`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Board not found.");
    });

    it("It should not GET an board that does not exist anymore", async () => {
      const board = await board_collection.insertOne(board_data);
      await board_collection.deleteOne({ _id: board.insertedId });
      const response = await chai
        .request(app)
        .get(`/api/boards/${board.insertedId}`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Board not found.");
    });
  });

  // Test POST route
  describe("POST /api/boards", () => {
    it("It should POST an board", async () => {
      const board_number = await Board.collection.countDocuments({}, { hint: "_id_" });

      const response = await chai
        .request(app)
        .post("/api/boards")
        .set("Content-Type", "application/json")
        .send(board_data);

      const final_board_number = await Board.collection.countDocuments({}, { hint: "_id_" });
      expect(response).to.have.status(201);
      expect(final_board_number).equal(board_number + 1);
      expect(response.body).to.have.property("name").equal(board_data.name);
      expect(response.body).to.have.property("about").equal(board_data.about);
      expect(response.body).to.have.property("publicStatus").equal(board_data.publicStatus);
      expect(response.body).to.have.property("owner").equal(board_data.owner);
      expect(response.body).to.have.property("admins").deep.equal(board_data.admins);
      expect(response.body).to.have.property("subscribers").deep.equal(board_data.subscribers);
      expect(response.body).to.have.property("location").equal(board_data.location);
      expect(response.body).to.have.property("events").deep.equal(board_data.events);
    });

    it("It should not POST a board with a validation error", async () => {
      const new_board_data = {...board_data, name: "This name is above 30 characters long which is invalid, and should trigger a validation error."};
      const board_number = await Board.collection.countDocuments({}, { hint: "_id_" });

      const response = await chai
        .request(app)
        .post("/api/boards")
        .set("Content-Type", "application/json")
        .send(new_board_data);

      const final_board_number = await Board.collection.countDocuments({}, { hint: "_id_" });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property("error").equal("Board validation failed: name: Board name can not be longer than 30 characters.");
      expect(final_board_number).equal(board_number);
    });
  });

  // Test PATCH route
  describe("PATCH /api/boards/:id", () => {
    it("It should PATCH a board by ID", async () => {
      const board = await board_collection.insertOne(board_data);

      const response = await chai
        .request(app)
        .patch(`/api/boards/${board.insertedId}`)
        .set("Content-Type", "application/json")
        .send({name: "Updated Title."});

      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(board.insertedId.toString());
      expect(response.body.name).to.eq("Updated Title.");
    });

    it("It should not PATCH a board by ID with a validation error", async () => {
      const board = await board_collection.insertOne(board_data);

      const response = await chai
        .request(app)
        .patch(`/api/boards/${board.insertedId}`)
        .set("Content-Type", "application/json")
        .send({
          name:
            "This title is above 30 characters long which is invalid, and should trigger a validation error.",
        });
        
      expect(response).to.have.status(400);
      expect(response.body)
        .to.have.property("error")
        .equal(
          "Validation failed: name: Board name can not be longer than 30 characters."
        );
    });

    it("It should not PATCH a board with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .patch(`/api/boards/invalid_id_type`);

      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Board not found.");
    });

    it("It should not PATCH a board that does not exist anymore", async () => {
      const board = await board_collection.insertOne(board_data);
      await board_collection.deleteOne({ _id: board.insertedId });

      const response = await chai
        .request(app)
        .patch(`/api/boards/${board.insertedId}`);

      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Board not found.");
    });
  });

  // Test DELETE route
  describe("DELETE /api/boards/:id", () => {
    it("It should DELETE a board by ID", async () => {
      const board = await board_collection.insertOne(board_data);
      const board_number = await Board.collection.countDocuments({}, { hint: "_id_" });
      const response = await chai
        .request(app)
        .delete(`/api/boards/${board.insertedId}`);

      const final_board_number = await Board.collection.countDocuments({}, { hint: "_id_" });
      expect(response).to.have.status(200);
      expect(response.body._id).to.eq(board.insertedId.toString());
      expect(final_board_number).to.eq(board_number - 1);
    });

    it("It should not DELETE a board with an invalid ID Type", async () => {
      const response = await chai
        .request(app)
        .delete(`/api/boards/invalid_id_type`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Board not found.");
    });

    it("It should not DELETE a board that does not exist anymore", async () => {
      const board = await board_collection.insertOne(board_data);
      await board_collection.deleteOne({ _id: board.insertedId });
      const response = await chai
        .request(app)
        .delete(`/api/boards/${board.insertedId}`);
      expect(response).to.have.status(404);
      expect(response.body).to.have.property("error").equal("Board not found.");
    });
  });
});
