const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ar51s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("test").collection("devices");
  
  console.log('database connect successfully')
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})