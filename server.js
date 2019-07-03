const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const port = 4000;
const file = "mardi-20/11-requests.json";

// support json encoded bodies
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// accept all the request
app.all("*", function(req, res, next) {
  let data = {
    date: new Date(),
    url: req.protocol + "://" + req.get("host") + req.originalUrl,
    body: req.body
  };
  let json = JSON.stringify(data);

  let requests = fs.readFileSync(file);
  requests += "\n" + json;

  fs.writeFileSync(file, requests, "utf8");

  res.send("Hubside got your request. Thanks.");
});

app.listen(port, function() {
  console.log(`listenner on ${port}`);
});
