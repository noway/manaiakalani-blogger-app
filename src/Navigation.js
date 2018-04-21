import React, { Component } from 'react';
import NavCss from './NavCss.css';
import Block from './Block';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Add from './Add';

class Navigation extends Component {
  render() {
    const { onSignInClick } = this.props;
    return (
      <Router>
        <div>
          <div className="sidenav">
            <Link to="/">Home</Link>
            <Link to="/Add">Add</Link>
            <Link to="/Profile">Profile</Link>
          </div>


          <div className="main">
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
            }} onClick={onSignInClick}>
              Login
          </button>

            <Route exact path="/" component={Home} />
            <Route exact path="/Add" component={Add} />
            {/*<Route path="/" component={Profile} />*/}

          </div>
        </div>
      </Router>
    );
  }
}

export default Navigation;
