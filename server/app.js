var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pgPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

var users = require('./routes/users');

var app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

pgPool.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch((err) => console.error('PostgreSQL connection error:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', users);

app.get('/', (req, res) => {
  res.send('🚀 API is running!');
});

module.exports = app;