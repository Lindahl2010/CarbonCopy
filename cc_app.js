const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index')
const port = 5000;

// Middleware Configuration
app.set('port', process.env.PORT || port); // Sets Express to use this port
app.set('views', __dirname + '/views'); // Sets Express to look in this folder to render our views
app.use(express.static(path.join(__dirname, 'public'))); // Configures Express to use this public folder
app.use(fileUpload()); // Configure file upload

// Routes for the application
