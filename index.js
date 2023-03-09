const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", function(req, res) {
  fs.readFile("./public/assets/game-data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const myData = JSON.parse(data);
    console.log(myData);

    res.render("pages/choices", {myData: myData});
  })
})

app.post("/", function(req, res) {
  console.log("implements the home post route.");
})

app.get("/form", function(req, res) {
  res.render("pages/form");
})

app.post("/form", function(req, res) {
  console.log("implements the form post route.")
})

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port 3000')
});
