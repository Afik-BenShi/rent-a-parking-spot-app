const express = require("express");

const db = require("./utils/db")
const products = require("./services/products")

db.init();

const app = express();
const port = 3000;

app.get('/products', async (req, res) => {
  const { query } = req;
  const result = await products.getProducts(query);
  res.send(result);
});

app.get('/products/:id', (req, res) => { });


app.post('/products/add', (req, res) => { });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});