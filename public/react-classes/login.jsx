var Header = React.createClass({
 render() {
   return (
     <h1>Web App - Login</h1>
   )
 }
});

var LoginForm = React.createClass({
 getInitialState() {
  return {action: 'login',err : ''}
},
 ValidateLogin() {

   var email = this.refs.LoginEmail.state.value;
   var password = this.refs.LoginPassword.state.value;
   var params ={username: email,password:password};

   var xhttp = new XMLHttpRequest();
   var updateState = this.setState.bind(this);

   xhttp.onreadystatechange = function(res) {
    if (this.readyState == 4 && this.status == 200) {
        //console.log('before update', JSON.parse(res.target.response), JSON.parse(res.target.response).username)
        if(JSON.parse(res.target.response).result){
           var oReq =  new XMLHttpRequest();
           oReq.onreadystatechange = function(response) {
               if (this.readyState == 4 && this.status == 200) {
                  var result = JSON.parse(response.target.response)
                  var add = result.filter(element => element.flag == 0)
                  var edit = result.filter(element => element.flag == 1)
                  var addList = add.map(function(element){
                     return(
                         <li>
                          <AddComponet carrier={element.state} ref="AddComponet"/>
                         </li>

                        )
                    })
                    updateState({action:'success'})


                  //const listItems = numbers.map((number) =>
                      //<ListItem key={number.toString()}
                        //value={number} />
                  //);

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
    } else {
      console.log('this.readyState',this.readyState)
    }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(params));

 },
 render() {
    console.log('inside render')
  switch(this.state.action){
  case 'login':
             return (
               <div className="loginDiv">
                 <Header />
                 <LoginEmail ref="LoginEmail"/>
                 <LoginPassword ref="LoginPassword"/>
                 <br></br>
                 <LoginSubmit ValidateLogin={this.ValidateLogin}/>
                 <p>{this.state.err}</p>
               </div>
             )
  case 'success':
               return (
                 <div className="loginDiv">
                 <ul>
                 {addList}
                 </ul>
                 </div>
               )
}
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
  console.log("reached here")
},
render(){
  return(
     <div>
     <h6>{this.props.carrier}</h6>
     <input type="text" onChange={this.onChangeUsername}/>
      <input type="password" onChange={this.onChangePassword}/>
      <button onClick={this.onClick}>Add</button>
     </div>
  )
}
})
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
       <h6>Email:</h6>
       <input type="text" onChange={this.onChange}/>
     </div>
   )
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
       <h6>Password:</h6>
       <input type="password" onChange={this.onChange}/>
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
