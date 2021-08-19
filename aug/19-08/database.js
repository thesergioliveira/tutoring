// npm i mongodb express node -P && npm i nodemon -D

const { MongoClient } = require("mongodb");
// documentation for URI
async function main() {
  const uri =
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";
  const client = new MongoClient(uri);
  //   console.log(client);
  //  first step
  //   connect with the database
  await client
    .connect()
    //  second step
    // doing whatever we want after connecting
    .then(console.log("The connection with the database was successful!"))
    // .then(await listDatabases(client))
    .then(await printCollection(client, "Viviane"))
    // last step
    .catch((err) => console.log(err));
}
main();

// print on the console all the databases
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  //   console.log(databasesList);
  console.log("The databases that you have are:");

  //   Looping through the array of objects containing information about the databases
  const databases = databasesList.databases.forEach((db) => {
    console.log(`${db.name}`);
  });

  //  filtering the result to match the wanted DB
  //   const databases = databasesList.databases.find((db) => db.name === "newDB");
  //   console.log(databases);
  //   console.log(databases);
}

async function printCollection(client, fieldValue) {
  const result = await client
    .db("newDB")
    .collection("info")
    .findOne({ name: fieldValue });
  let text = "";
  result ? (text = result) : (text = "I am sorry there was no matching value");
  console.log(text);
}

// CRUD => Create, read, update and delete
// Create => insertOne(), insertMany()
// Update =>
