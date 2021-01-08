var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));

// ######################################################################
// ROUTES
// ######################################################################

// MAIN ROUTES

app.get("/", function(req, res) {
  res.render("landing.ejs", {stylesheets: ["/stylesheets/landing.css"]});
})

app.get("/about", function(req, res) {
  res.render("about.ejs", {stylesheets: []});
})

app.get("/projects", function(req, res) {
  res.render("projects.ejs", {stylesheets: []});
})

app.get("/contact", function(req, res) {
  res.render("contact.ejs", {stylesheets: []});
})

// PROJECT ROUTES

app.get("/projects/color-guessing-game", function(req, res) {
  res.render("projects/colorGuessingGame.ejs");
})

app.get("/projects/connect-four", function(req, res) {
  res.render("projects/connectFour.ejs");
})

app.listen(3000, '0.0.0.0', function() {
  console.log("server has started");
})
