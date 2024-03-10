const express = require("express");

const db = require("./utils/db")
const products = require("./services/products")
const location = require('./services/location');
const users = require("./services/users")
const orders = require("./services/orders");

db.init();

const app = express();
app.use(express.json());
const port = 3000;

//---------------------------------------------------------
// Middleware to log incoming requests
app.use((req, res, next) => {
  // Creating a wrapper around res.send to intercept the response
  const originalSend = res.send;
  res.send = function(data) {
      console.log("Response data:", data); // Print the response data
      originalSend.call(this, data); // Call the original res.send method
  };
  console.log(`${req.method} ${req.url}`);
  next();
});
//---------------------------------------------------------


app.get('/products', async (req, res) => {

  const { maxPrice, subCategory } = req.query;

  // Convert maxPrice to a number if provided
  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;

  const result = await products.getProducts(parsedMaxPrice, subCategory);
  res.send(result);
});

app.get('/myProducts', async (req, res) => {
  const { userId } = req.query;
  const result = await products.getMyProducts(userId);
  res.send(result);
});

app.post('/myProducts/add', async (req, res) => { 
  
  const newProductData = {
    title : req.body.title, 
    ownerId : req.body.ownerId.toString(),
    description : req.body.description,
    subCategotyId: req.body.subCategoryId.toString(),
    startDay: req.body.startDate,
    endDay: req.body.endDate,
    pricePerDay: req.body.pricePerDay.toString(),
    city: req.body.city,
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

app.get('/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  const { status, response } = await orders.getMyOrders(userId, req.body);
  res.status(status).send(response);
});

app.post('/orders/add', async (req, res) => {
  const { status, response } = await orders.addNewOrder(req.body);
  res.status(status).send(response);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});