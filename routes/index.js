var express = require('express');
var router = express.Router();
var Agent = require("../models/agent_query")
var username,password

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.post('/login',(req,res) =>{
  var obj = {}
  username = req.body.username
  password = req.body.password

  Agent.findByName(username , (err,data) =>{
   if(data.length && data[0].user_name == username && password == data[0].password){
      console.log("success");
      obj["result"] = true
      res.json(obj)
   }else {
     obj["result"] = false
     res.json(obj)
   }
  })
})

router.get('/dashboard',function(req,res){
  Agent.findByName(username,function(err,data){
    if(!data[0].flag){
      Agent.updateFlag(username,function(err,update){
        Agent.fetchCarries(data[0].state,function(err,carriers){
          carriers.forEach(function(element){
                Agent.insertCredential(username,element.state,element.carrier,function(err,doc){
                })
          })
        })
      })
      }
      Agent.fetchCredential(username,function(err,credential){
        res.json(credential);
      })
    })
})


module.exports = router;
