'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const path = require('path');

const app = express();

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/index.css', function (req, res) {
    res.sendFile(process.cwd() + '/public/index.css');
  });

app.get('/index.js', function (req, res) {
    res.sendFile(process.cwd() + '/index.js');
  });

app.listen(process.env.PORT || 3000, function () {
  console.log('Connected to PORT ...');
});
