function Login(email, password) {
if (email) {
 ShowSuccessAtDOM("container", email);
} else {
 ShowFailureAtDOM("container");
}
};

function ShowSuccessAtDOM(id, name) {
 ReactDOM.unmountComponentAtNode(document.getElementById("result"));
 ReactDOM.render(
   <LoginSuccess name={name} />,
   document.getElementById("result")
 );
};

function ShowFailureAtDOM(id) {
 ReactDOM.unmountComponentAtNode(document.getElementById("result"));
 ReactDOM.render(
   <LoginFail />,
   document.getElementById("result")
 );
};

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
   console.log('state is', this.state)
   xhttp.onreadystatechange = function(res) {
    if (this.readyState == 4 && this.status == 200) {
        //console.log('before update', JSON.parse(res.target.response), JSON.parse(res.target.response).username)
        if(JSON.parse(res.target.response).username)
          updateState({action:'success'})
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
                   <h1>Success</h1>
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

var LoginSuccess = React.createClass({
 render() {
   return (
     <h2>Login Success! Welcome Back, {this.props.name}</h2>
   )
 }
});

var LoginFail = React.createClass({
 render() {
   return (
     <h2>Login FAIL...</h2>
   )
 }
});

ReactDOM.render(
 <LoginForm />,
 document.getElementById("entrance-point")
);
