const express = require("express");

const db = require("./utils/db")
const products = require("./services/products")
const location = require('./services/location');
const users = require("./services/users")

db.init();

const app = express();
app.use(express.json());
const port = 3000;

app.get('/products', async (req, res) => {

  const { maxPrice, subCategory } = req.query;

  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;

  const filters = { maxPrice: parsedMaxPrice, subCategory }
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


app.get('/location/geocode', async (req, res) => {
  const query = req.query;
  const { status, response } = await location.getGeocode(query);
  res.status(status).send(response);
});

app.get('/location/geocode/structured', async (req, res) => {
  const query = req.query;
  const { status, response } = await location.getGeocodeStructured(query);
  res.status(status).send(response);
});

app.post('/users/upsert', async (req, res) => {
  const response = await users.upsertPersonalDetails(req.body)
  res.send(response);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});