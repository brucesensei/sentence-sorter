const express = require("express");
const server = require("./public/js/server.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// file path to json object => ./public/assets/game_data.json"

server.jsonReader()

app.get("/", function(req, res) {
  res.render('pages/choices')
})

app.post("/", function(req, res) {
  console.log('implements home post route');
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port 3000')
});




