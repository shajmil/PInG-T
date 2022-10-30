var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "PInG-T" });
});
router.post("/", (req, res) => {
  axios
    .get(
      "https://paydigi.airtel.in/web/pg-service/v1/validate/vpa/" +
        req.body.upiId +
        "@paytm"
    )
    .then((response) => {

      if (response.data.data.status == "TXN_FAILED") {
        axios
          .get(
            "https://paydigi.airtel.in/web/pg-service/v1/validate/vpa/" +
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
