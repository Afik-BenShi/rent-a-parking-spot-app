const express = require("express");

const db = require("./utils/db")
const products = require("./services/products")
const cors = require('cors');

db.init();

const app = express();
const port = 3000;

app.use(express.json());
// Allow requests from the frontend domain
app.use(cors({
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});