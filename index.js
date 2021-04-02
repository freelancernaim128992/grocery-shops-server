const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors());
app.use(bodyParser.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ar51s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db(`${process.env.DB_NAME}`).collection('products');
  const ordersCollection = client.db(`${process.env.DB_NAME}`).collection('orders');
  app.post('/products', (req, res) => {
    const product = req.body;
    productsCollection.insertOne(product)
    .then(result => {
        res.send('Data Loaded Successfully')
    })
  })
  app.get('/product', (req, res) => {
    productsCollection.find({})
    .toArray((err, document) => {
      res.send(document);
    })
  })
  app.get('/product/:id', (req, res) => {
    const singleProduct = ObjectId(req.params.id);
    productsCollection.find({_id: singleProduct})
    .toArray((err, document) => {
      if(document[0]){
        const newDocument = {...document[0]}
        newDocument.quantity = 1
        res.send(newDocument)
        console.log(newDocument)
      }
    })

  })

  app.post('/orders',(req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order)
    .then(result => {
      console.log(result)
      console.log('data loaded successfully');
    })
  })

  app.get('/orderList', (req,res) => {
    ordersCollection.find({})
    .toArray((err, document) => {
      res.send(document)
    })
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})