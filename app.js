
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// ---------------------------------------------------------------------------
// --- Local Variables
// ---------------------------------------------------------------------------
const app = express();
const apiRoutes = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3500);

// ---------------------------------------------------------------------------
// --- Routes
// ---------------------------------------------------------------------------
require('./server/routes/homeRoute')(apiRoutes);

app.use('/', apiRoutes);
process.on('uncaughtException', err => {
  console.log('There was an uncaught error', err);
  process.exit(1);
});
console.log('Server UP');