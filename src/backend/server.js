const express = require("express");

const db = require("./utils/db")
const products = require("./services/products")

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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});