// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get('/api/timestamp/:date?', function(request, response){
  let date_request = request.params.date || new Date().getTime();
  if(!isNaN(date_request)){ //simple check for number
    date_request = Number(date_request);
  }
  if(!isNaN(new Date(date_request).getTime())){ //check if date can be casted
    let date_obj = new Date(date_request);
    response.json({
      unix: date_obj.getTime(),
      utc: date_obj.toUTCString(), 
    });
  }else{ //the date param is not valid date format
    response.json({
      error: "Invalid Date"
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
