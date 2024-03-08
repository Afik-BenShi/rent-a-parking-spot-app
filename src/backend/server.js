const express = require("express");

const db = require("./utils/db")
const products = require("./services/products")

db.init();

const app = express();
const port = 3001;

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

app.post('/myProducts/add', (req, res) => { });

app.get('/products/:id', (req, res) => { });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});