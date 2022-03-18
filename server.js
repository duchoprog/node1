require("dotenv").config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require('path')
const mongoose = require('mongoose')


var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Back end for FullStack Tuts" });
});

//Serve static assets when in production
if (process.env.NODE_ENV==='production'){
  //Set static folder.
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get ("/", (req,res)=>{
    res.send("API running");
  })
}
///

// set port, listen for requests

require("./app/routes/tutorial.routes")(app);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = require("./app/models");
const { config } = require("process");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });