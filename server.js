// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// The API endpoint is GET [project_url]/api/timestamp/:date_string?
app.get('/api/timestamp/', function(req, res) {
  if (!req.query.date_string || req.query.date_string === '') {
    // If the date string is empty it should be equivalent to trigger new Date(), 
    // i.e. the service uses the current timestamp.
    const now =  new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }
  
  const queryDate =  new Date(req.query.date_string);
  if (queryDate instanceof Date) {
    res.json({
      unix: queryDate.getTime(),
      utc: queryDate.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});