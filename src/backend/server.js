const express = require("express");
const { port } = require("./config");

const db = require("./utils/db")
const products = require("./services/products")
const location = require('./services/location');
const users = require("./services/users")

db.init();

const app = express();
app.use(express.json());

//---------------------------------------------------------
// Middleware to log incoming requests
app.use((req, res, next) => {
  // Creating a wrapper around res.send to intercept the response
  const originalSend = res.send;
  res.send = function (data) {
    console.log("Response data:", data); // Print the response data
    originalSend.call(this, data); // Call the original res.send method
  };
  console.log(`${req.method} ${req.url}`);
  next();
});
//---------------------------------------------------------


app.get('/products', async (req, res) => {

  const { maxPrice, selectedCategory: subCategory, city, endDate, startDate } = req.query.filters || {};

  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;

  const filters = { maxPrice: parsedMaxPrice, subCategory, city, startDate, endDate }
  const result = await products.getProducts(filters);
  res.send(result);
});

app.get('/myProducts', async (req, res) => {
  const { userId } = req.query;
  const result = await products.getMyProducts(userId);
  res.send(result);
});

app.post('/myProducts/add', async (req, res) => {
  const { title, ownerId, description, subCategoryId, startDate, endDate, pricePerDay, city } = req.body

  const newProductData = {
    title,
    ownerId: ownerId.toString(),
    description,
    subCategotyId: subCategoryId.toString(),
    startDate,
    endDate,
    pricePerDay: pricePerDay.toString(),
    city
  }

  result = await products.addMyProduct(newProductData);
  res.send(result);
});

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