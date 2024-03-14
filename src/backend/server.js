const express = require("express");
const { port } = require("./config");

const db = require("./utils/db")
const products = require("./services/products")
const location = require('./services/location');
const users = require("./services/users")
const orders = require("./services/orders");

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

  const { maxPrice, selectedCategory: mainCategory, city, endDate, startDate } = req.query.filters || {};

  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;
  
  const filters = { maxPrice: parsedMaxPrice, mainCategory, city, startDate, endDate }
  console.log('filters from server :', filters);

  const result = await products.getProducts(filters);
  res.send(result);
});


// app.get('/products/byCategory', async (req, res) => {

//   const category = req.query.selectedCategory || 0;

//   if (category == 0) {   // all products
//     const result = await products.getProducts({});
//     res.send(result);
    
//   }
//   else{
//     const result = await products.getProductsByCategory(category);
//     res.send(result);
//   }
// });


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
    mainCategoryId: subCategoryId.toString(),
    startDate,
    endDate,
    pricePerDay,
    city
  }

  result = await products.addMyProduct(newProductData);
  res.send(result);
});

app.get('/users/suggestion', async (req, res) => {
  const query = req.query;
  const {status, response} = await users.getUserSuggestions(query);
  res.status(status).send(response);
})

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

app.get('/orders/owner/:userId', async (req, res) => {
  const { userId } = req.params;
  const { status, response } = await orders.getOrders(userId, {...req.query, type:"owner"});
  res.status(status).send(response);
});

app.get('/orders/renter/:userId', async (req, res) => {
  const { userId } = req.params;
  const { status, response } = await orders.getOrders(userId, req.query);
  res.status(status).send(response);
});

app.post('/orders/add', async (req, res) => {
  const { status, response } = await orders.addNewOrder(req.body);
  res.status(status).send(response);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});