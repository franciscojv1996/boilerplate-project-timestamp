// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/api/timestamp/", function (req, res) {
  var resDate = new Date();
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});


app.get("/api/timestamp/:reqString?", function (req, res) {
  var reqString = req.params.reqString;
  var resDate;
  
  if (!/^\d{4}-/.test(reqString)) reqString = parseInt(reqString);
  resDate = new Date(reqString);

  if (resDate.getTime() !== resDate.getTime()) {
    res.json({ error: "Invalid Date" });
  }
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  console.log("hola tiempo");
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
