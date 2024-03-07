const express = require("express");

const db = require("./utils/db")
const products = require("./services/products")
const location = require('./services/location');

db.init();

const app = express();
const port = 3000;

app.get('/products', async (req, res) => {
  const { filters } = req.query;
  const result = await products.getProducts(filters);
  res.send(result);
});

app.get('/myProducts', async (req, res) => {
  const { userId } = req.query;
  const result = await products.getMyProducts(userId);
  res.send(result);
});

app.post('/myProducts/add', (req, res) => { });

app.get('/products/:id', (req, res) => { });


app.get('location/geocode', async (req, res) => {
  const query = req.query;
  const {status, response} = await location.getGeocode(query);
  res.status(status).send(response);
});

app.get('location/geocode/structured', async (req, res) => {
  const query = req.query;
  const {status, response} = await location.getGeocodeStructured(query);
  res.status(status).send(response);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});