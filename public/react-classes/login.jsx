var Header = React.createClass({
 render() {
   return (
     <h1>Agent - Login</h1>
   )
 }
});
 var state
var LoginForm = React.createClass({

 getInitialState() {
  return {action: 'login',err : '',addList:''}

},
 ValidateLogin() {
   var email = this.refs.LoginEmail.state.value;
   var password = this.refs.LoginPassword.state.value;
   var params ={username: email,password:password};
   var xhttp = new XMLHttpRequest();
   var updateState = this.setState.bind(this);
   console.log('state is', this.state)
   xhttp.onreadystatechange = function(res) {
    if (this.readyState == 4 && this.status == 200) {
        //console.log('before update', JSON.parse(res.target.response), JSON.parse(res.target.response).username)
        if(JSON.parse(res.target.response).username){

        var oReq =  new XMLHttpRequest();
        oReq.onreadystatechange = function(response) {
          if (this.readyState == 4 && this.status == 200) {
             var result = JSON.parse(response.target.response)
             updateState({action:'success',addList:result})
             }
       }

        oReq.open("GET", "/dashboard", true);
        oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        oReq.send(null);
       }

        else{
          updateState({err:'Failure!!!'})
          }
        //this.setState();
        console.log('after update')
    }
    else {
      console.log('this.readyState',this.readyState)
    }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(params));

 },
 setResult(result){
   this.setState({addList:result})
 },
 onClick(){
   this.setState({action:"login"})
 },
 render() {
    console.log('inside render')
  switch(this.state.action){
  case 'login':
             return (
               <div>
               <div id="centered">
               <Header />
               </div>
               <div id="outPopUp">
                <LoginEmail ref="LoginEmail"/>
                 <br></br>
                 <LoginPassword ref="LoginPassword"/>
                 <br></br>
                 <LoginSubmit ValidateLogin={this.ValidateLogin}/>
                 <p>{this.state.err}</p>
               </div>
               </div>
             )
  case 'success':
               var list = this.state.addList.filter(element => element.flag == 0)
               var edit = this.state.addList.filter(element => element.flag == 1)
              var obj = []

               var obj1 = []
               var setResult = this.setResult


               list.forEach(function(element){
                  obj.push(<tr><td><p class="indent"></p><b>{element.carrier} :</b></td><td><AddComponet  result={setResult}  carrier = {element.carrier} ref="AddComponet"/></td></tr>)

               })
               edit.forEach(function(element){
                  obj1.push(<tr><td><p class="indent"></p><b>{element.carrier}</b></td><tab1></tab1><td><p class="indent"></p><label>username:</label><b>{element.username}</b></td><tab1></tab1><td><p class="indent"></p><label>password:</label><b>{element.password}</b></td><tab1></tab1><td><p class="indent"></p><EditComponet result={setResult}  carrier = {element.carrier} ref="EditComponet"/></td></tr>)

               })


               return (
               <div>
                <div id="leftd">
                  <h1>Carriers</h1>
                </div>
                <div id="rightd">
                 <button onClick={this.onClick}>Logout</button>
                </div>
                <table>
                 <thead>
                   <tr>
                      <td><b><u>Carrier</u></b> </td>
                      <td><center><b><u>Credential</u></b></center></td>
                   </tr>
                </thead>

                 <tbody>
                   {obj}
                   </tbody>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </table>

        <table>
          <thead>
          </thead>

          <tbody>
            {obj1}
            </tbody>
      </table>

               </div>
               )
}
}
});

var LoginEmail = React.createClass({
 getInitialState() {
 console.log('inside initialstate')
   return {value: null}
 },
 onChange(e) {
   this.setState({value: e.target.value});
 },
 render() {
   return (
     <div className="LoginEmailDiv">
       <label>Email:</label><input type="text" onChange={this.onChange}/>
       </div>
   )
 }
});

var AddComponet = React.createClass({
getInitialState() {
  return {username: null,password:null}
},
onChangeUsername(e) {
  this.setState({username: e.target.value});
},
onChangePassword(e) {
  this.setState({password: e.target.value});
},
onClick() {
var updateState = this.props.result
var user = this.state.username;
console.log('username is--------', user);
var password = this.state.password;
console.log('pasword is--------', password);
var carrier = this.props.carrier
console.log(carrier)
var result ={username: user,password:password,carrier:carrier};
console.log('result is---',result);
var httpInsert = new XMLHttpRequest();
httpInsert.onreadystatechange = function(res) {
 if (this.readyState == 4 && this.status == 200) {
           var reqD =  new XMLHttpRequest();
           reqD.onreadystatechange = function(response) {
             if (this.readyState == 4 && this.status == 200) {
                  var result = JSON.parse(response.target.response)
                  updateState(result)
                }
          }

           reqD.open("GET", "/dashboard", true);
           reqD.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
           reqD.send(null);



 }
 }
httpInsert.open("POST", "/add", true);
httpInsert.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
httpInsert.send(JSON.stringify(result));

},
render(){
  return(
     <div>
     <p class="indent"></p>
     <label/>username:<input type="text" onChange={this.onChangeUsername}/>

      <label/>  password:<input type="password" onChange={this.onChangePassword}/>

      <button onClick={this.onClick}>Add</button>

     </div>
  )
}
});

var EditComponet = React.createClass({
getInitialState() {
   return {username: null,password:null,action: "normal"}
},
onChangeUsername(e) {
  this.setState({username: e.target.value});
},
onChangePassword(e) {
  this.setState({password: e.target.value});
},
onClick() {
  var update = this.setState.bind(this)
  update({action : "edit"})
},
add() {
            var updateAction = this.setState.bind(this)
            var updateState = this.props.result
            var user = this.state.username;
            console.log('username is--------', user);
            var password = this.state.password;
            console.log('pasword is--------', password);
            var carrier = this.props.carrier
            console.log(carrier)
            var result ={username: user,password:password,carrier:carrier};
            console.log('result is---',result);
            var httpInsert = new XMLHttpRequest();
            httpInsert.onreadystatechange = function(res) {
             if (this.readyState == 4 && this.status == 200) {
                       var reqD =  new XMLHttpRequest();
                       reqD.onreadystatechange = function(response) {
                         if (this.readyState == 4 && this.status == 200) {
                              var result = JSON.parse(response.target.response)
                              updateState(result)
                              updateAction({action : "normal"})
                            }
                      }

                       reqD.open("GET", "/dashboard", true);
                       reqD.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                       reqD.send(null);



             }
             }
            httpInsert.open("POST", "/add", true);
            httpInsert.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            httpInsert.send(JSON.stringify(result));




  },
render(){
  switch(this.state.action){
    case "normal":return(

                   <div>
                   <button onClick={this.onClick}>Edit</button>
                   </div>
                   )
    case "edit":return(<div>
                        <p class="indent"></p>
                        <p class="indent"></p>
                        <label/>username:<input type="text" onChange={this.onChangeUsername}/><tab1></tab1>

                         <label/>password:<input type="password" onChange={this.onChangePassword}/>

                         <button onClick={this.add}>Add</button>

                        </div>
                     )
}
}
});


var LoginPassword = React.createClass({
 getInitialState() {
   return {value: null}
 },
 onChange(e) {
   this.setState({value: e.target.value});
 },
 render() {
   return (
     <div className="LoginEmailDiv">
       <label>Password:</label><input type="password" onChange={this.onChange}/>

     </div>
   )
 }
});

var LoginSubmit = React.createClass({
 onClick() {
   this.props.ValidateLogin();
 },
 render() {
   return (
     <button onClick={this.onClick}>Login</button>
   )
 }
});


ReactDOM.render(
 <LoginForm />,
 document.getElementById("entrance-point")
);
