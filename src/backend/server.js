const express = require("express");
const { port } = require("./config");

const db = require("./utils/db")
const products = require("./services/products")
const location = require('./services/location');
const users = require("./services/users")
const orders = require("./services/orders");

const { firestore } = require("firebase-admin");
const Timestamp = firestore.Timestamp;

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
  console.log('startDate :', startDate);
  console.log('endDate :', endDate);

  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;
  const parsedStartDate = startDate ? Timestamp.fromDate(new Date(startDate)) : null;
  const parsedEndDate = endDate ? Timestamp.fromDate(new Date(endDate)) : null;
  console.log('parsedStartDate :', parsedStartDate);
  console.log('parsedEndDate :', parsedEndDate);
  
  const filters = { maxPrice: parsedMaxPrice, mainCategory, city, startDate:parsedStartDate, endDate:parsedEndDate }
  console.log('filters from server :', filters);

  const result = await products.getProducts(filters);
  res.send(result);
});



app.get('/myProducts', async (req, res) => {
  const { userId } = req.query;
  const result = await products.getMyProducts(userId);
  res.send(result);
});

app.post('/myProducts/add', async (req, res) => {
  const { title, ownerId, description, mainCategoryId, fromDate, untilDate, pricePerDay, city } = req.body

  const loweredCity = city.replace(/\b\w/g, function(char) { return char.toLowerCase(); });
  const words = city.split(' ');
  const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const parsedCity = capitalizedWords.join(' ');

  const newProductData = {
    title,
    ownerId: ownerId.toString(),
    description,
    mainCategoryId,
    startDate: Timestamp.fromDate(new Date(fromDate)),
    endDate: Timestamp.fromDate(new Date(untilDate)),
    pricePerDay,
    city: parsedCity
  }

  console.log("newProductData after timestamp", newProductData);

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
  const { status, response } = await orders.getOrders(userId, {...req.query, type:"renter"});
  res.status(status).send(response);
});

app.post('/orders/add', async (req, res) => {
  const { status, response } = await orders.addNewOrder(req.body);
  res.status(status).send(response);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});