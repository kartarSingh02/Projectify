const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const app = express();
const port = 3000;
const cors = require("cors");

 //code for cors
 var corsOptions = {
  origin:["http://localhost:4200"],
  Credentials : true,
 };
 app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test1", { useNewUrlParser: true }); // inplace of test1 use your db name



 

// Use body-parser middleware
app.use(bodyParser.json());

 

// Use the defined routes
app.use("/", routes);

 

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});