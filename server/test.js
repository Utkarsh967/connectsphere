const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://utkarshdubey:utkarsh6398@cluster0.q3urafw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected successfully!");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();