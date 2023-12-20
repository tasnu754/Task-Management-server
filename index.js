const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o9ylutr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

      const database = client.db("TaskManagement");
      const tasks = database.collection("Tasks");

async function run() {
  try {
   
      app.get("/tasks", async (req, res) => {
      const result = await tasks.find().toArray();
      res.send(result)
      })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Task management is running");
})

app.listen(port, () => {
    console.log(`Task management is running on port ${port}`);
})