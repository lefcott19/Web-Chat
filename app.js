
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// ---------------------------------------------------------------------------
// --- Local Variables
// ---------------------------------------------------------------------------
const port = process.env.PORT || 3500;
const app = express();
const apiRoutes = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// ---------------------------------------------------------------------------
// --- Routes
// ---------------------------------------------------------------------------
require('./server/routes/homeRoute')(apiRoutes, io, __dirname);

app.use('/', apiRoutes);

http.listen(port, function() {
	console.log('listening on ' + port);
});
process.on('uncaughtException', err => {
  console.log('There was an uncaught error', err);
  process.exit(1);
});