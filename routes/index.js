var express = require('express');
var router = express.Router();
var Agent = require("../models/agent_query")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.post('/login',(req,res) =>{
  var obj = {}
  var username = req.body.username
  var password = req.body.password
  console.log("     haaa      ",username,password);
  Agent.findByName(username , (err,data) =>{
   if(data.length && data[0].user_name == username && password == data[0].password){
      console.log("success");
      obj["username"] = username
      obj["password"] = password
     res.json(obj)
   }else {
     console.log("failure");
     res.json(obj)
   }
  })
})


module.exports = router;
