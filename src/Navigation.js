import React, { Component } from 'react';
import NavCss from './NavCss.css';
import Block from './Block';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Add from './Add';
import Profile from './Profile';

class Navigation extends Component {
  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <div className="sidenav">
            <Link to="/">Home</Link>
            <Link to="/Add">Add</Link>
            <Link to="/Profile">Profile</Link>
          </div>
          <div className="main">
            <Route exact path="/" component={() => (
              <Home posts={posts} />
            )} />
            <Route exact path="/Add" component={Add} />
            <Route path="/Profile" component={Profile} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Navigation;
