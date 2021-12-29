// server.js
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

// your API endpoints
app.get("/api/:date?", function (req, res) {
  let { date } = req.params;
  let convertedDate;
  if (!date) {
    convertedDate = new Date();
  } else {
    const dateNumber = Number(date);
    date = Number.isNaN(dateNumber) ? date : dateNumber;
    convertedDate = new Date(date);
  }

  if (Number.isNaN(convertedDate)) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: convertedDate.getTime(),
      utc: convertedDate.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
