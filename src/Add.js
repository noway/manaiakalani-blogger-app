import PostField from './PostField';
import React, { Component } from 'react';
import Editor from './Editor'

class Add extends Component {


    constructor(props) {
        super(props);

        this.state = {
            timePickerShown: false
        };
    }
    handleScheduleOnClick = () => {
        this.setState({
            timePickerShown: true
        })
        this.props.schedulePost(/* time moment */);
    }

    handlePublishClick = () => {
        console.log(this._editor.getValue());
    }

    render() {
        const {schedulePost, postId} = this.props;
        const pageTitle = postId ? 'Edit post' : 'Create a new post';
        return (
            <form>
                <header className="post-header">
                    <img src="/logo-horizontal.png" className="post-header-logo" alt="" />
                    <div className="post-header-buttons">
                        <button t ype="button" className="post-header-button">
                            <i className="fas fa-save"></i>
                            <span className="post-header-button-label">Save</span>
                        </button>
                        <button type="button" className="post-header-button">
                            <i className="fas fa-trash-alt"></i>
                            <span className="post-header-button-label">Delete</span>
                        </button>
                        <button type="button" className="post-header-button">
                            <i className="fas fa-eye"></i>
                            <span className="post-header-button-label">Preview</span>
                        </button>
                    </div>
                </header>
                <h2 className="post-page-title">{pageTitle}</h2>
                <div className="post-fields-wrapper">
                    <div className="post-main">
                        <PostField title="Title:" htmlFor="postTitle">
                            <input id="postTitle" type="text" className="post-title-input" />
                        </PostField>
                        <Editor ref={c => this._editor = c } />
                    </div>
                    <div className="post-secondary">
                        <PostField title="Add Label:">
                            <select className="label-select">
                                <option>Label 1</option>
                                <option>Label 2</option>
                            </select>
                        </PostField>

                        <PostField title="Current Labels:">
                            <div>List of labels go here</div>
                        </PostField>
                    </div>
                </div>
                <footer className="post-footer">
                    <button type="button" className="button-main button-spaced" onClick={this.handleScheduleOnClick}>Schedule</button>
                    <button type="button" className="button-secondary button-spaced" onClick={this.handlePublishClick}>Publish</button>
                </footer>
            </form>
        );
    }
}

export default Add;
