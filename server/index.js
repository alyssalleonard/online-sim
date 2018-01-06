const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const baseURL = '/api/places'
const port = process.env.PORT || 3002;
const placesController = require('./controllers/placesController');
app.use(bodyParser.json());

app.use(express.static( __dirname + '/../public/build'));

app.get(baseURL, placesController.read)

app.post(baseURL, placesController.create)

app.listen(port, () => console.log(`The magic is happening on port ${port}`));