const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

let gameGrade = '';
let gameUnit = '';
let gameTitle = '';
let gameData = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  fs.readFile("./public/assets/game-data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const myData = JSON.parse(data);
    res.render("pages/choices", {myData: myData});
  })
})
 
app.post("/", function(req, res) {
  gameGrade = req.body.title;
  gameUnit = req.body.unit;
  gameTitle = req.body.quiz;
  gameData = req.body.question;
  res.redirect("/game");
})

app.get("/game", function(req, res) {
  res.render("pages/game", { gameTitle: gameTitle, gameData: gameData, gameGrade: gameGrade, gameUnit: gameUnit });
})

app.post("/game", function(req, res) {
  console.log("implements game post route.")
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port 3000')
})
