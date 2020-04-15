// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config({path: __dirname + '/.env'})

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Actual project code<

// seed req param whe we get the empty date
// app.get("/api/timestamp", function(req, res) {
//   let newDate = new Date();
//   res.redirect( "/api/timestamp/" + newDate.getFullYear() + "-" + (newDate.getUTCMonth() + 1) + "-" + newDate.getUTCDate() );
// });
// Changed to this beacuse not passing the test
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});


// Timestamp and Date endpoint to return formated date
app.get("/api/timestamp/:date_string", function(req, res, next){

  let date;
  
  if ( /\D/.test(req.params.date_string) ) {
    date = new Date( req.params.date_string);
  } else {
    date = new Date( parseInt(req.params.date_string));
  }

  let utcDate = date.toUTCString();  
  let unixDate = date.getTime(); 
  
  if (utcDate === "Invalid Date"){
    res.json({"error" : "Invalid Date" });
  } else {
    res.json({ "unix": unixDate, "utc": utcDate });
  }
});


