import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
// or
// import { GoogleLogin } from 'react-google-login';
 
 
const responseGoogle = (response) => {
  console.log('response',response);
}
 
class Login extends Component {
  render() {
    return (
      <GoogleLogin
        clientId="457131676170-6sqjomp8211vm88ts33g1ailrri30886.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    );
  }
}

export default Login;

