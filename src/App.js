import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'

class App extends Component {
  constructor(props) {
    super(props)
    // this.initClient = this.initClient.bind(this)
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.makeApiCall = this.makeApiCall.bind(this);
  }

  componentDidMount() {
    window.gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    console.log('initClient')
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
    window.gapi.client.init({
        apiKey: 'AIzaSyAYXOVFtKSsuHB0xSBFklbNpn5Fna5Vycs',

        // discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],

        clientId: '457131676170-6sqjomp8211vm88ts33g1ailrri30886.apps.googleusercontent.com',
        scope: 'profile email https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/drive'
    }).then(() => {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(
        (isSignedIn) => this.updateSigninStatus(isSignedIn)
      );
      // Handle the initial sign-in state.
      this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
      this.makeApiCall();
    }
  }

  handleSignInClick(event) {
    // Ideally the button should only show up after window.gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    window.gapi.auth2.getAuthInstance().signIn();
  }

  handleSignOutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  makeApiCall() {


    // Make an API call to the People API, and print the user's given name.
    var request = window.gapi.client.request({
        'path': '/drive/v2/files?q=trashed=false ' +
                'and ( '+
                  'mimeType contains "application/rtf" or ' +
                  'mimeType contains "application/pdf" or ' +
                  'mimeType contains "application/vnd.openxmlformats-officedocument.wordprocessingml.document" or ' +
                  'mimeType contains "application/msword" ' +
                ')',
        'method': 'GET',
        'params': {'maxResults': '50'}
        });

    request.execute((resp) => {  
      console.log('resp',resp);
    }); 

  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <button style={{
          'display': 'inline-block',
          'background': 'rgb(209, 72, 54)',
          'color': 'rgb(255, 255, 255)',
          'width': '190px',
          'paddingTop': '10px',
          'paddingBottom': '10px',
          'borderRadius': '2px',
          'border': '1px solid transparent',
          'fontSize': '16px',
          'fontWeight': 'bold',
          'fontFamily': 'Roboto',
        }} onClick={this.handleSignInClick}>
          Login
        </button>
      </div>
    );
  }
}

export default App;
