import React from 'react';

export default function({onSignInClick, isInitialLoading}) {
    
    return (
        <div className="first-login">
            <img src={`${process.env.PUBLIC_URL}/logo-vertical.png`} alt="Manaiakalani" />
            <button
                className="first-login-button button-main"
                type="button"
                onClick={onSignInClick}
            >
                {isInitialLoading ? 'Loading....' : 'Login with Google'}
            
            </button>
        
            
        </div>
        
    );
}

