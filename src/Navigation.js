import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Add from './Add';
import Profile from './Profile';
import './nav.css';

class Navigation extends Component {
  render() {
    const { posts, onLogoutClick } = this.props;
    return (
      <Router>
        <div>
          <nav className="nav">
            <Link to="/" className="nav-icon" title="Home">
              <i class="fas fa-home"></i>
            </Link>
            <Link to="/Add" className="nav-icon" title="Add">
              <i class="fas fa-plus-circle"></i>
            </Link>
            <button className="nav-icon button-logout" onClick={onLogoutClick}>
              <i class="fas fa-user"></i>
              <span className="nav-logout-text">Logout</span>
            </button>
          </nav>
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
