
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;




app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pdjrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('online_Shop');
    const productsCollection = database.collection('products');
    const BookingCollection = database.collection('booking')

    app.get('/products', async (req, res) => {
      const cursor = productsCollection.find({});
      const products = await cursor.toArray();
      res.send(products);
    })

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const user = await productsCollection.findOne(query);

      res.send(user);

      // -----------------------------------
      app.post('/myBooking', async (req, res) => {
        const newUser = req.body;
        const result = await BookingCollection.insertOne(newUser);
        console.log('hitttinggggggg', req.body);
        res.send(result);

      })

      // booking get
      app.get('/myBooking', async (req, res) => {
        const cursor = BookingCollection.find({});
        const service = await cursor.toArray();

        res.send(service);
      })
    })
  }
  finally {

  }
}

run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello are you node')
});

app.listen(port, () => {
  console.log('listening to port', port);
});