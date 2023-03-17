const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

let punctuation = '';
let gameGrade = '';
let gameUnit = '';
let gameTitle = '';
let optionData = '';
let gameData = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


//--------------------HOME ROUTE-------------------------------

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


//------------------------------GAME ROUTE---------------------

app.get("/game", function(req, res) {
  res.render("pages/game", {
    gameTitle: gameTitle,
    gameData: gameData,
    gameGrade: gameGrade,
    gameUnit: gameUnit,
    optionData: optionData });
})


//----------------------------EDIT ROUTE------------------------

app.get("/edit", function(req, res) {
  res.render("pages/edit", {
    gameTitle: gameTitle,
    gameData: gameData,
    gameGrade: gameGrade,
    gameUnit: gameUnit,
    optionData: optionData });
})

app.post("/edit", function(req, res) {
  fs.readFile("./public/assets/game-data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const myData = JSON.parse(data);
    myData[req.body.grade][req.body.unit][req.body.title] = req.body.question
    const jsonString = JSON.stringify(myData, null, 2);
    fs.writeFile("./public/assets/game-data.json", jsonString, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Data written to disk.');
      res.redirect("/")
    })
  })  
})


//-------------------------------APP PORT-----------------------------

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port 3000')
})
