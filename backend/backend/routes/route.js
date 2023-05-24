const express = require("express");
const router = express.Router();
const Model = require("../models/model");


 module.exports = function(app){
  app.use(function(req,res,next){
    res.header(
      "Access-Control-Allow-Origin-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
 }

// GET request to retrieve data from the database
router.get("/data", (req, res) => {
  Model.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

 

// POST request to add data to the database
// router.post("/data", (req, res) => {
//   const model = new Model();
//   const { fname } = req.body;
//   const {lname}=req.body;
//   // if (!data1) {
//   //   return res.json({
//   //     success: false,
//   //     error: "Invalid input",
//   //   });
//   //}
//   model.fname = fname;
//   model.lname = lname;
//   model.save((err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

router.post("/data", (req, res) => {
  const model = new Model({
    fname:req.body.fname,
    lname:req.body.lname,
    empnum:req.body.empnum
  });
  // const { fname } = req.body;
  // const {lname}=req.body;
  // // if (!data1) {
  // //   return res.json({
  // //     success: false,
  // //     error: "Invalid input",
  // //   });
  // //}
  // model.fname = fname;
  // model.lname = lname;
  model.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

 

module.exports = router;