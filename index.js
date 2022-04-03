const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
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
            // console.log(reviewResult);  
        })
      // review data post ----------------------------->
      
      


      // blog data post------------------------------->
        app.post('/blogs', async(req, res) => {
          const blogs = req.body;
          console.log(blogs);
            const blogResult = await blogCollection.insertOne(blogs)
            // console.log(blogResult);
            
        })
      // blog data post--------------------------------->

      // blog data get---------------------------------->
      app.get('/blogs', async (req, res) => {
        const cursor = blogCollection.find({});
        const getBlog = await cursor.toArray();
        res.send(getBlog);
      })
        // blog data get-------------------------------->
      
      // profile update post---------------------------->

      // blog data post------------------------------->
      app.post('/profile', async(req, res) => {
        const profile = req.body;
        console.log(profile);
          const blogResult = await profileCollection.insertOne(profile)
          // console.log(blogResult);
          
      })
    // blog data post--------------------------------->


      // profile update post---------------------------->
        
        
      
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