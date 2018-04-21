import React, { Component } from 'react';
import NavCss from './NavCss.css';
import Block from './Block';

const blocks1 = [
  {
    title: 'Demo 1',
    status: 'Published',
    content: 'abcd'
  }, {
    title: 'Demo 2',
    status: 'Scheduled',
    content: 'qwerty'
  }
];

class Navigation extends Component {
  constructor(props) {
    super();

    this.state = {
      blocks: blocks1
    };
  }

  render() {
    const {onSignInClick} = this.props;
    const {blocks} = this.state;
    return (
      <div>
       <div className="sidenav">
          <a href="./">About</a>
          <a href="./">Services</a>
          <a href="./">Clients</a>
          <a href="./">Contact</a>
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
          {blocks.map(block => (<Block key={block.content} {...block} />))}
        </div>
      </div>
    );
  }
}

export default Navigation;
