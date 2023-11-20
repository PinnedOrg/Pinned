const { MongoClient } = require("mongodb");

//base stuff on id

async function main() {
  const uri =
    "mongodb+srv://dmruds123:Radius335841482@pinneddb.ulvjrsw.mongodb.net/?retryWrites=true&w=majority"; //connecter uri

  const client = new MongoClient(uri); //create client object

  try {
    await client.connect(); //connect client

    console.log("Connected to Mongo");

    /* example event creation call: pass client and event object
        await createEvent(client, { //mongo autocreates id
            Title:"Test", //done
            Description: "Test", //done
            Preview_Image: "Test",
            Date: "Test", //done
            Time: "Test", //done
            Tags: "Test", //done
            Location: "Test", //done
            Upload: "Test",
            Contact_Info: "Test" //done
        } );
        */
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

//function to list all mongo databases (for test) ***delete for deployment***
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

//creates an event: pass in an event object
async function createEvent(client, newEvent) {
  const result = await client
    .db("Pinned")
    .collection("event")
    .insertOne(newEvent);
}

//creates multiple events
async function createEvents(client, newEvents) {
  //newEvents should be an array of event objects
  const result = await client
    .db("Pinned")
    .collection("event")
    .insertMany(newEvents);
}

//read an event: returns event object
async function findEvent(client, nameOfEvent) {
  const result = await client
    .db("Pinned")
    .collection("event")
    .findOne({ Title: nameOfEvent });
  return result;
  //do stuff with result
}

//updates existing event object- params: client, event, and updated event object
//any different member variables will be set
async function updateEvent(client, nameOfEvent, updatedEvent) {
  const result = await client
    .db("Pinned")
    .collection("event")
    .updateOne({ name: nameOfEvent }, { $set: updatedEvent });
}

//deletes event from database
async function deleteEvent(client, nameOfEvent) {
  const result = await client
    .db("Pinned")
    .collection("event")
    .deleteOne({ Title: nameOfEvent });
}

main().catch(console.error);
