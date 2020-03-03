const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/cc_index')
const {upload, uploadPage, collectionPage, deleteImage} = require('./routes/image')
const {aboutPage, contactPage, privacyPage, tosPage} = require('./routes/info');
const port = 5000;

const db = mysql.createConnection ({
    host: '192.168.137.130',
    user: 'linelij',
    password: 'Password01',
    database: 'carbon_copy'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// Middleware Configuration
app.set('port', process.env.PORT || port); // Sets Express to use this port
app.set('views', [__dirname + '/views', __dirname + '/views/info']); // Sets Express to look in this folder to render our views
app.set('view engine', 'ejs'); // Configures the template engine 
app.use(express.static(path.join(__dirname, 'public'))); // Configures Express to use this public folder
app.use(fileUpload()); // Configure file upload

// Routes for the application
app.get('/', getHomePage);
app.get('/upload', uploadPage);
app.get('/collection', collectionPage);
app.get('/about', aboutPage);
app.get('/contact', contactPage);
app.get('/privacy', privacyPage);
app.get('/terms-of-service', tosPage);
app.get('/delete/:img_name', deleteImage);
app.post('/upload', upload);

// Set app to listen on specified port 
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});