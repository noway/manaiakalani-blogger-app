import React, {Component, PropTypes} from 'react';
import PostField from './PostField';
import RichTextEditor from 'react-rte';
import './editor.css'

class Editor extends Component {
  // static propTypes = {
  //   onChange: PropTypes.func
  // };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.content 
        ? RichTextEditor.createValueFromString(this.props.content, 'html')
        : RichTextEditor.createEmptyValue()
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('receiving', nextProps)
  //   this.setState({
  //     value: nextProps.content 
  //       ? RichTextEditor.createValueFromString(nextProps.content, 'html')
  //       : RichTextEditor.createEmptyValue()
  //   });
  // }

  getValueHtml = () => {
    return this.state.value.toString('html');
  }

  // getValueText = () => {
  //   return this.state.value.toString('markdown');
  // }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real Editor it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (
      <PostField title="Content:" htmlFor="postContent">
          <RichTextEditor
            id="postContent" 
            className="post-content post-content-editor"
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Type here..."
          />
      </PostField>

    );
  }


}

export default Editor;
