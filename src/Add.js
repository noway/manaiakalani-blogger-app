import React from 'react';
import PostTitleInput from './PostTitleInput';
import PostField from './PostField';

export default function() {
    return (
        <form>
            <header className="post-header">
                <img src="/logo-horizontal.png" className="post-header-logo" alt="" />
            </header>
            <h2 className="post-page-title">Create a new post</h2>
            <div className="post-field-wrapper post-padding">
                <div className="post-main">
                    <PostField title="Title:">
                        <PostTitleInput name="title" />
                    </PostField>

                    <PostField title="Content:">
                        <textarea className="post-content"></textarea>
                    </PostField>
                </div>
                <div className="post-secondary">
                    <PostField title="Add Label:">
                        <select>
                            <option>Label 1</option>
                            <option>Label 2</option>
                        </select>
                    </PostField>

                    <PostField title="Current Labels:">
                        <div>List of labels go here</div>
                    </PostField>
                </div>
            </div>
            <footer className="post-footer post-padding">
                <button type="button" className="button-main button-spaced">Schedule</button>
                <button type="submit" className="button-secondary button-spaced">Publish</button>
            </footer>
        </form>
    );
}