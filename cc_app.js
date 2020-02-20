const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/cc_index')
const {upload, uploadPage} = require('./routes/upload')
const port = 5000;

// Middleware Configuration
app.set('port', process.env.PORT || port); // Sets Express to use this port
app.set('views', __dirname + '/views'); // Sets Express to look in this folder to render our views
app.use(express.static(path.join(__dirname, 'public'))); // Configures Express to use this public folder
app.use(fileUpload()); // Configure file upload

// Routes for the application
app.get('/', getHomePage);
app.get('/upload', uploadPage);
app.post('/upload', upload);

// Set app to listen on specified port 
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});