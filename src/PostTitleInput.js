import React from 'react';

export default function PostTitleInput({onFocus, onBlur}) {
    return (
        <input type="text" className="post-title-input" onFocus={onFocus} onBlur={onBlur} />
    );
}