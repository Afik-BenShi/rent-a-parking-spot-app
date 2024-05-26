const express = require("express");
const { port } = require("./config");

const db = require("./utils/db")
const storage = require("./utils/storage")
const products = require("./services/products")
const location = require('./services/location');
const users = require("./services/users")
const orders = require("./services/orders");
const { mapsKey } = require('./.env/mapsKey.json');

const { firestore, auth } = require("firebase-admin");
const Timestamp = firestore.Timestamp;
const multer = require('multer'); // Multer for handling file uploads


db.init();
storage.init()

const app = express();
app.use(express.json({ limit: '50mb' }));

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
// Middleware to verify user's authentication token
const noAuthServices = ["location"];
app.use(async (req, res, next) => {
  const splitPath = req.path.split('/');
  if (noAuthServices.some(service => splitPath.includes(service))) {
    next();
    return;
  }
  const authToken = req.headers.authorization ?? req.headers.Authorization;
  if (!authToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = await auth().verifyIdToken(authToken);
    req.body.token = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});
//---------------------------------------------------------
// Multer setup for file uploads
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });


app.get('/products', async (req, res) => {

  const { filters: filterQuery, sort, userId } = req.query || {}
  const { maxPrice, selectedCategory: mainCategory, city, endDate, startDate } = filterQuery || {};

  console.log('startDate :', startDate);
  console.log('endDate :', endDate);

  const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;
  const parsedStartDate = startDate ? Timestamp.fromDate(new Date(startDate)) : null;
  const parsedEndDate = endDate ? Timestamp.fromDate(new Date(endDate)) : null;
  console.log('parsedStartDate :', parsedStartDate);
  console.log('parsedEndDate :', parsedEndDate);

  const filters = { maxPrice: parsedMaxPrice, mainCategory, city, startDate: parsedStartDate, endDate: parsedEndDate }
  console.log('filters from server :', filters);

  const result = await products.getProducts(filters, sort, userId);
  res.send(result);
});



app.get('/myProducts', async (req, res) => {
  const { userId } = req.query;
  const result = await products.getMyProducts(userId);
  res.send(result);
});

app.post('/myProducts/add', async (req, res) => {
  const { title, ownerId, description, mainCategoryId, fromDate, untilDate, pricePerDay, address, imageUrl, imageName } = req.body
  console.log("From server");
  console.log(imageUrl);

  const newProductData = {
    title,
    ownerId: ownerId.toString(),
    description,
    mainCategoryId,
    startDate: Timestamp.fromDate(new Date(fromDate)),
    endDate: Timestamp.fromDate(new Date(untilDate)),
    pricePerDay,
    address,
    urlToimage: imageUrl.toString(),
  }

  console.log("newProductData after timestamp", newProductData);

  result = await products.addMyProduct(newProductData);
  res.send(result);
});

// ----------------previous implementation: -------------

// app.post('/myProducts/img', async (req, res) => {

//   const { image, title, token } = req.body;
//   const imageName = `${token.user_Id}-${title}-${Date.now()}`
//   console.log(imageName)
//   let uri;
//   try {
//     uri = await storage.uploadImage({
//       name: imageName, imageFile: image
//     });
//   }
//   catch (err) {
//     console.log("error in myProducts/img", JSON.stringify(err));
//     res.status(500).send({ error: err });
//   }
//   res.json({ data: { imageName, uri } });
// });


app.post('/myProducts/img', upload.single('image'), async (req, res) => {
  const { title } = req.body;
  const image = req.file;
  const token = req.headers.authorization;
  const imageName = `${token.user_Id}-${title}-${Date.now()}`;
  console.log("image name from server fetch : ", imageName);
  let uri;
  try {
    uri = await storage.uploadImage({
      name: imageName,
      imageFile: image.buffer
    });
  }
  catch (err) {
    console.log("error in myProducts/img", JSON.stringify(err));
    res.status(500).send({ error: err });
  }
  res.json({ data: { imageName, uri } });
});

app.put('/myProducts/updateProductInfo/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description } = req.body;

    console.log("productId", productId);
    console.log("title", title);
    console.log("description", description);

    const newProductData = { title, description };

    const result = await products.updateProductInfo(productId, newProductData);
    res.send(result);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product");
  }
});

app.delete('/myProducts/:productId', async (req, res) => {
  const { productId } = req.params;
  const { token } = req.body;
  const { status, response } = await products.deleteProduct(productId, token.user_id);
  res.status(status).send(response);
})

app.get('/users/suggestion', async (req, res) => {
  const query = req.query;
  const { status, response } = await users.getUserSuggestions(query);
  res.status(status).send(response);
})

app.get('/users/hasPrivateInfo', async (req, res) => {
  const { user_id } = req.body.token;
  console.log(user_id);
  const { status, response } = await users.getUserExists(user_id);
  res.status(status).send(response);
});

app.get('/users/personalDetails', async (req, res) => {
  const { userId } = req.query;
  const userDetails = await db.getById({ collection: "users", id: userId })
  res.json(userDetails.data)
});

app.get('/products/:id', (req, res) => { });

app.post('/users/upsert', async (req, res) => {
  try {
    const response = await users.upsertPersonalDetails(req.body)
    res.send(response);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/orders/owner/:userId', async (req, res) => {
  const { userId } = req.params;
  const { status, response } = await orders.getOrders(userId, { ...req.query, type: "owner" });
  res.status(status).send(response);
});

app.get('/orders/renter/:userId', async (req, res) => {
  const { userId } = req.params;
  const { status, response } = await orders.getOrders(userId, { ...req.query, type: "renter" });
  res.status(status).send(response);
});

app.post('/orders/add', async (req, res) => {
  const { status, response } = await orders.addNewOrder(req.body);
  res.status(status).send(response);
});

app.put('/orders/update/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { token, ...rsv } = req.body;
  const { status, response } = await orders.updateOrder(orderId, rsv, token.user_id);
  res.status(status).send(response);
});
app.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { token } = req.body;
  const { status, response } = await orders.deleteOrder(orderId, token.user_id);
  res.status(status).send(response);
});

app.get('/orders/productAvailability', async (req, res) => {
  const { id } = req.query;
  console.log("id - ", id);
  const result = await orders.getProductAvailability(id);
  res.send(result);
});

app.get('/orders/getProductEmptyTimeOrder', async (req, res) => {
  const { productId: id } = req.query;
  console.log("id - ", id);
  const result = await orders.getProductEmptyTimeOrder(id);
  res.send(result)
});


app.get('/place/autocomplete/json', async (req, res) => {
  const { input, language } = req.query;
  try {
    const googleApi = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    const suggestions = await fetch(googleApi + `?input=${input}&key=${mapsKey}&language=${language}`)
      .then(resp => resp.json());
    res.status(200).send(suggestions);
  } catch (e) {
    res.status(500).send({ e });
  }
})
app.get('/place/details/json', async (req, res) => {
  const { key, ...query } = req.query;
  const paramString = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&')
  try {
    const googleApi = "https://maps.googleapis.com/maps/api/place/details/json";
    const suggestions = await fetch(googleApi + `?key=${mapsKey}&` + paramString)
      .then(resp => resp.json());
    res.status(200).send(suggestions);
  } catch (e) {
    res.status(500).send({ e });
  }
})

app.get('/location/geocode', async (req, res) => {
  const { key, ...query } = req.query;
  const paramString = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&')
  try {
    const googleApi = "https://maps.google.com/maps/api/geocode/json";
    const suggestions = await fetch(googleApi + `?key=${mapsKey}&` + paramString)
      .then(resp => resp.json());
    res.status(200).send(suggestions);
  } catch (e) {
    res.status(500).send({ e });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});