const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


app.use(cors());
app.use(express.json());

// user: Ace-of-Science-own
// pass: ksm3x8TJl7yzyNBm

// connecting database ---------------------->
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rrls8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// connecting database--------------------------->


async function run() {
    try {
      await client.connect();
      const database = client.db("Ace-of-Science-own");
      const reviewCollection = database.collection("Review");
      const blogCollection = database.collection("Blogs");
      const profileCollection = database.collection('Profile');
      // create a document to insert

      // Review Data post --------------------------->
        app.post('/review', async(req, res) => {
          const review = req.body;

            const reviewResult = await reviewCollection.insertOne(review)
          res.send(reviewResult)
        })
      // review data post ----------------------------->


      // Review Data get --------------------------->
        app.get('/review', async(req, res) => {
          const cursor = reviewCollection.find({});
        const getReview = await cursor.toArray();
        res.send(getReview); 
        })
      // review data get ----------------------------->
       // review data delete------------------------------>

       app.delete('/review/:id', async (req, res) => {
        // console.log(req.params.id);
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await reviewCollection.deleteOne(query)
        // console.log(result);
        res.json(result)
        })



      // review data delete------------------------------>
      


      // blog data post------------------------------->
        app.post('/blogs', async(req, res) => {
          const blogs = req.body;
          console.log(blogs);
            const blogResult = await blogCollection.insertOne(blogs)
          console.log(blogResult);
          res.send(blogResult)
            
        })
      // blog data post--------------------------------->

      // single blog data get---------------------------------->
      app.get('/single-blog/:id', async (req, res) => {
        console.log(req.params.id);
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        console.log(query);
        const cursor = await blogCollection.findOne(query);
        console.log(cursor);
        res.send(cursor);
      })
        // single blog data get-------------------------------->
      
      
      // blog data get---------------------------------->
      app.get('/blogs', async (req, res) => {
        const cursor = blogCollection.find({});
        const getBlog = await cursor.toArray();
        res.send(getBlog);
      })
        // blog data get-------------------------------->
      
       // blog data delete------------------------------>

       app.delete('/blogs/:id', async (req, res) => {
        // console.log(req.params.id);
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await blogCollection.deleteOne(query)
        console.log(result);
        res.json(result)
        })



      // blog data delete------------------------------>
      
      // profile update post---------------------------->

    
      app.post('/profile', async(req, res) => {
        const profile = req.body;
        console.log(profile);
          const profileResult = await profileCollection.insertOne(profile)
          // console.log(profileResult);
          res.json(profileResult)
      })
      
      // profile update post---------------------------->

      // profile data get---------------------------------->
      app.get('/profile', async (req, res) => {
        const cursor = profileCollection.find({});
        const getProfile = await cursor.toArray();
        res.send(getProfile);
      })
        // profile data get-------------------------------->

     




        
        
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);




















app.get('/', (req, res) => {
    res.send('Hello world');
})


app.listen(port, () => {
    console.log('server is running on port', port);
})