var express = require('express');
var router = express.Router();
var Agent = require("../models/agent_query")
var username;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.post('/login',(req,res) =>{
  var obj = {}
  username = req.body.username
  var password = req.body.password
  console.log("     haaa      ",username,password);
  Agent.findByName(username , (err,data) =>{
   if(data.length && data[0].user_name == username && password == data[0].password){
      console.log("success");
      obj["username"] = username
      obj["password"] = password
      res.json(obj)
   }else {

     res.json(obj)
   }
  })
})

router.get('/dashboard',function(req,res){
  console.log("comming");


  Agent.findByName(username,function(err,data){
      console.log('entering in fuction');
    if(!data[0].flag){
      Agent.updateFlag(username,function(err,update){
        console.log("update",data[0].state);
        Agent.fetchCarrier(data[0].state,function(err,carriers){
              console.log("carrier",carriers);
                 
                 carriers.forEach(function(element){
                Agent.insertCredential(username,element.carrier,element.state,function(err,doc){

                  })
                })
                Agent.fetchCredential(username,function(err,credential){
                  console.log(credential);
                  res.json(credential);
                })
        })
      })
      }
      else{
      Agent.fetchCredential(username,function(err,credential){
        console.log(credential);
        res.json(credential);
      })
    }
    })
})
router.post('/add',(req,res) =>{
   console.log("comming add");
   var AgentUsername = req.body.username
  var password = req.body.password
  var carrier = req.body.carrier
  console.log("     haaahhehehehhheheheehheeh     ",AgentUsername,password, carrier);
  Agent.addCredential(AgentUsername,password,carrier,username, function(err, data){
      res.json({})
  })
})


module.exports = router;
