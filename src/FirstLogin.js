import React from 'react';

export default function({onSignInClick, isInitialLoading}) {
    // first-login-button button-main needs to be reviewed
    return (
        <div className="first-login">
            <img src={`${process.env.PUBLIC_URL}/logo-vertical.png`} alt="Manaiakalani" />
            <button
				className={isInitialLoading ? "google-login-button google-login-button-diableled" : "google-login-button google-login-button-reddy"}
                type="button"
                onClick={onSignInClick}
            >
                'Loading....' 
            
            </button>
        
            
        </div>
        
    );
}

