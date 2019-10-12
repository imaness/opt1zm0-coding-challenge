const express = require('express');
const compression = require('compression');
const logger = require('morgan');
const lusca = require('lusca');
const bodyParser = require('body-parser');

const port = 8080;

const app = express();

// Initialize Redis Connection


// Use  Compression
app.use(compression());

app.use(express.static('public'));

// Add logging in dev
app.use(logger('dev'));

app.use(bodyParser.json());

// Remove common vulnerabilities
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

// Primary app routes
app.use('/', require('./controllers/home'));
app.use('/api', require('./controllers/api'));

if (!module.parent) {
  app.listen(port);
}

module.exports = app;
