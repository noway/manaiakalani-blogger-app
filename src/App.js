import React, { Component } from 'react';

import './App.css';
import {Blogs, Posts} from './api/blogger'
import Navigation from './Navigation'
import FirstLogin from './FirstLogin'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false
    };

    // this.initClient = this.initClient.bind(this)
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.makeApiCall = this.makeApiCall.bind(this);
  }

  componentDidMount() {

    window.gapi.load('client:auth2:blogger', this.initClient);
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
      this.setState({
        isSignedIn: true
      });
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

  async makeApiCall() {
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

    const myBlog = await Blogs.getMyFirstBlog();
    console.log('myBlog.id', myBlog.id);

    const myPosts = await Posts.list(myBlog.id, ['live', 'scheduled', 'draft']);
    this.setState({
      posts: myPosts.items
    });

    const myFirstPost = await Posts.get(myBlog.id, myPosts.items[0].id);
    console.log('my post #1', myFirstPost);

    const updatedPost = await Posts.updateAndPossiblyRevertToDraft(
      myBlog.id, 
      { ...myFirstPost, title: `Random title ${Math.random()}`}, 
      Math.round(Math.random())
    );

    console.log('my post #1 updated', updatedPost);

    // const newPost = await Posts.insert(myBlog.id, {
    //   title: 'Test Post from Ilia\'s API',
    //   content: 'Created in Blogger App!'
    //   published: 
    // })




    // var request = window.gapi.blogger.blogs.listByUser({
    // 'userId': 'self',
    // });

    // request.execute((respBlogger) => {  
    //   console.log('respBlogger',respBlogger);
    // }); 
  }

  render() {
    const component = this.state.isSignedIn ? <Navigation posts={this.state.posts} /> : <FirstLogin onSignInClick={this.handleSignInClick} />
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
        {component}
      </div>
    );
  }
}

export default App;
