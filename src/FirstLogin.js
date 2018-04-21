import React from 'react';

export default function({onSignInClick}) {
    return (
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
    );
}