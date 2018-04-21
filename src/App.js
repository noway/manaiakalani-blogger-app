import React, { Component } from 'react';

import {Blogs, Posts} from './api/blogger'
import Navigation from './Navigation'
import FirstLogin from './FirstLogin'
import * as moment from 'moment';


// Hard coding those is fine. As long as we don't put api secret here!!!
const APP_ID = '457131676170';
const API_KEY = 'AIzaSyAYXOVFtKSsuHB0xSBFklbNpn5Fna5Vycs';
const CLIENT_ID = '457131676170-6sqjomp8211vm88ts33g1ailrri30886.apps.googleusercontent.com';
const SCOPE = 'profile email https://www.googleapis.com/auth/blogger https://www.googleapis.com/auth/drive';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false
    };
  }

  componentDidMount() {
    window.gapi.load('client:auth2:blogger:picker', this.initClient);
  }

  initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
    }).then(() => {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(
        (isSignedIn) => this.updateSigninStatus(isSignedIn)
      );
      // Handle the initial sign-in state.
      this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      this.setState({
        isSignedIn: true
      });
      this.makeApiCall();
    }
  };

  signIn = (event) => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  signOut = (event) => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  loadPostsInitial = async (statuses = ['live', 'scheduled', 'draft']) => {
    try {
      const myBlog = await Blogs.getMyFirstBlog();
      const myPosts = await Posts.list(myBlog.id, statuses);
      this.setState({
        selectedBlog: myBlog,
        postsCount: myBlog.posts.totalItems,

        nextPageToken: myPosts.nextPageToken,
        posts: myPosts.items,
      });
      return { myBlog, myPosts };
    } catch (e) {
      alert(`There has been an error while loading posts of your blog! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
      return {};
    }
  };

  loadPostsNext = async (statuses = ['live', 'scheduled', 'draft']) => {
    if (this.state.selectedBlog && this.state.nextPageToken) {
      try {
        const nextPosts = await Posts.list(this.state.selectedBlog.id, statuses, this.state.nextPageToken);
        this.setState({
          nextPageToken: nextPosts.nextPageToken,
          posts: [...this.state.posts, ...nextPosts.items],
        });
      } catch (e) {
        alert(`There has been an error while loading more blogs posts! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
      }
    } else {
      // For the case if initial load failed
      return this.loadPostsInitial(statuses);
    }
  };

  makeApiCall = async () => {
    // // Make an API call to the People API, and print the user's given name.
    // var request = window.gapi.client.request({
    //     'path': '/drive/v2/files?q=trashed=false ' +
    //             'and ( '+
    //               'mimeType contains "application/rtf" or ' +
    //               'mimeType contains "application/pdf" or ' +
    //               'mimeType contains "application/vnd.openxmlformats-officedocument.wordprocessingml.document" or ' +
    //               'mimeType contains "application/msword" ' +
    //             ')',
    //     'method': 'GET',
    //     'params': {'maxResults': '50'}
    //     });

    // request.execute((resp) => {  
    //   console.log('resp',resp);
    // });

    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const GoogleUser = GoogleAuth.currentUser.get();
    const authResponse = GoogleUser.getAuthResponse(true);
    const { id_token } = authResponse;
    console.log('GoogleAuth', GoogleAuth);
    console.log('GoogleUser', GoogleUser);
    console.log('authResponse', authResponse);
    console.log('id_token', id_token);


    var view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
    view.setMimeTypes("image/png,image/jpeg,image/jpg");
    var picker = new window.google.picker.PickerBuilder()
        .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
        .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(APP_ID)
        .setOAuthToken(id_token)
        .addView(view)
        .addView(new window.google.picker.DocsUploadView())
        .setDeveloperKey(API_KEY)
        .setCallback((data) => console.log(data))
        .build();
     // picker.setVisible(true);

    const { myBlog, myPosts } = await this.loadPostsInitial();
    console.log('myBlog.id', myBlog.id);

    // -------- IVAN COPY-PASTE THIS -------- 
    let myFirstPost;
    try {
      myFirstPost = await Posts.get(myBlog.id, myPosts.items[0].id);
      console.log('my post #1', myFirstPost);
    } catch (e) {
      alert(`There has been an error while loading a post on your blog! \n\nTry to refresh the page or log out and log back in. \n\nError message: ${e.message}`);
    }
    // --------------------------------------


    // -------- IVAN COPY-PASTE THIS -------- 
    try {
      const currentMoment1 = moment()
      const updatedPost = await Posts.updateAndPossiblyRevertToDraft(
        myBlog.id, 
        { ...myFirstPost, title: `Random title ${Math.random()}`, updated: currentMoment1.toISOString()}, 
        Math.round(Math.random())
      );

      console.log('my post #1 updated', updatedPost);      
    } catch (e) {
      alert(`There has been an error while submitting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
    }
    // --------------------------------------


    // -------- IVAN COPY-PASTE THIS -------- 
    try {
      const currentMoment2 = moment(); // Change that the scheduled date moment
      const newPost = await Posts.insert(myBlog.id, {
        title: 'Test Post from Ilia\'s API',
        content: 'Created in Blogger App!',
        published: currentMoment2.toISOString(),
        labels: ['cool label 1', 'cool label 2'],
      });
      console.log('newPost', newPost);
    } catch (e) {
      alert(`There has been an error while submitting your blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
    }
    // --------------------------------------


    // -------- IVAN COPY-PASTE THIS -------- 
    try {
      const deletedPost = await Posts.delete(myBlog.id, myFirstPost.id);
      console.log('deletedPost', deletedPost);
    } catch (e) {
      alert(`There has been an error while deleting blog post! \n\nTry again or log out and log back in. \n\nError message: ${e.message}`);
    }
    // --------------------------------------
  };

  render() {
    return this.state.isSignedIn ? (
      <Navigation onLogoutClick={this.signOut} posts={this.state.posts} postsCount={this.state.postsCount} loadPostsNext={() => this.loadPostsNext()} />
    ) : (
      <FirstLogin onSignInClick={this.signIn} />
    )
  }
}

export default App;
