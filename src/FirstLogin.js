import React from 'react';

export default function({onSignInClick}) {
    return (
        <div className="first-login">
            <img src={`${process.env.PUBLIC_URL}/logo-transparent.png`} alt="Manaiakalani" />
            <button
                className="first-login-button button-main"
                type="button"
                onClick={onSignInClick}
            >
                Login with Google
            </button>
        </div>
    );
}