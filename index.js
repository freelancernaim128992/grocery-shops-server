const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
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
  const productsCollection = client.db("test").collection("devices");
  
  app.post('/products', (req, res) => {
    const product = req.body;
    productsCollection.insertOne(product)
    .then(result => {
        console.log(result)
    })
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})