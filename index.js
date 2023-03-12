const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

let gameGrade = '';
let gameUnit = '';
let gameTitle = '';
let optionData = '';
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
  optionData = req.body.option;
  if (optionData === 'play') {
    res.redirect("/game");
  } else {
    res.redirect("/edit")
  }
})

app.get("/game", function(req, res) {
  res.render("pages/game", {
    gameTitle: gameTitle,
    gameData: gameData,
    gameGrade: gameGrade,
    gameUnit: gameUnit,
    optionData: optionData });
})

app.post("/game", function(req, res) {
  console.log("implements game post route.")
})

app.get("/edit", function(req, res) {
  res.render("pages/edit", {
    gameTitle: gameTitle,
    gameData: gameData,
    gameGrade: gameGrade,
    gameUnit: gameUnit,
    optionData: optionData });
})

app.post("/edit", function(req, res) {
  console.log("implements edit post route.")
})


app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port 3000')
})
