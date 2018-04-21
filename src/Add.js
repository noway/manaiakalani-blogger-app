import PostField from './PostField';
import React, { Component } from 'react';

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

    render() {
        const {schedulePost} = this.props;
        return (
            <form>
                <header className="post-header">
                    <img src="/logo-horizontal.png" className="post-header-logo" alt="" />
                    <div className="post-header-buttons">
                        Save | Delete | Preview
                    </div>
                </header>
                <h2 className="post-page-title">Create a new post</h2>
                <div className="post-field-wrapper post-padding">
                    <div className="post-main">
                        <PostField title="Title:" htmlFor="postTitle">
                            <input id="postTitle" type="text" className="post-title-input" />
                        </PostField>

                        <PostField title="Content:" htmlFor="postContent">
                            <textarea id="postContent" className="post-content"></textarea>
                        </PostField>
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
                <footer className="post-footer post-padding">
                    <button type="button" className="button-main button-spaced" onClick={this.handleScheduleOnClick}>Schedule</button>
                    <button type="submit" className="button-secondary button-spaced">Publish</button>
                </footer>
            </form>
        );
    }
}

export default Add;
