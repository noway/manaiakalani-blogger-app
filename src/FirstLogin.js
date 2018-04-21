import React from 'react';

export default function({onSignInClick}) {
    return (
        <div class="first-login">
            <img src={`${process.env.PUBLIC_URL}/logo-transparent.png`} alt="Manaiakalani" />
            <button
                className="first-login-button"
                type="button"
                onClick={onSignInClick}
            >
                Login with Google
            </button>
        </div>
    );
}