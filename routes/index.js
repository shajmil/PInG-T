var express = require("express");
require('dotenv').config()
var router = express.Router();
var axios = require("axios");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "PInG-T" });
});
router.post("/", (req, res) => {

  axios.all([
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@paytm"),
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@ybl"),
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@okicici"),
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@okaxis"),
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@okhdfcbank"),
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@ibl"),
    axios.get(process.env.VERIFICATION_API + req.body.upiId + "@axl"),


  ]).then(axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    const responseThree = responses[2]
    const responseFour = responses[3]
    const responseFive = responses[4]
    const responseSix = responses[5]
    const responseSeven = responses[6]
    response=[responseOne.data,responseTwo.data,responseThree.data,responseFour.data,responseFive.data,responseSix.data,responseSeven.data]

    for(i=0;i<response.length;i++){
      if(response[i].data.status=="TXN_SUCCESS"){
        res.send(response[i].data);
        break;
      }else if(response[i].data.status=="TXN_FAILED"){
        if(i==response.length-1){
        res.send(response[i].data);
        }}
    }
    
  })).catch(err => {
    res.status(400).send(err.response.data);
  })
 
  
      
});


module.exports = router;
