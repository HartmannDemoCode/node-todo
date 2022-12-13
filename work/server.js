// set up ======================================================================
const express = require('express');
const app = express(); 						        // create our app w/ express

const mongoose = require('mongoose'); 				// mongoose for mongodb
const port = process.env.PORT || 8080; 				// set the port
const database = require('./config/database'); 		// load the database config
const morgan = require('morgan');                     // morgan logger middleware function for logging requests to the console
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

// configuration middleware===============================================================
mongoose.connect(database.localUrl); 	    // Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                 // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(cors()); // enable CORS
// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);