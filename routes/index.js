var express = require("express");
require('dotenv').config()
var router = express.Router();
var axios = require("axios");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "PInG-T" });
});
router.post("/", (req, res) => {
  axios
    .get(
      process.env.VERIFICATION_API +
        req.body.upiId +
        "@paytm"
    )
    .then((response) => {

      if (response.data.data.status == "TXN_FAILED") {
        axios
          .get(
            process.env.VERIFICATION_API +
              req.body.upiId +
              "@ybl"
          )
          .then((response) => {
            console.log(response.data);
            res.send(response.data);
          })
          .catch((err) => {
            res.status(400).send(err.response.data);
          });
      } else {

        res.send(response.data);
      }
    })
    .catch((err) => {
      res.status(400).send(err.response.data);
    });
 
  
      
});


module.exports = router;
