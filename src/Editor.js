import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import './editor.css'

class Editor extends Component {
  // static propTypes = {
  //   onChange: PropTypes.func
  // };

  constructor(props) {
    super(props);

    this.state = {
      value: RichTextEditor.createEmptyValue()
    };
  }

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
      <div className="field-block">
        <div className="field-block__title">Content:</div>
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
          placeholder="Type here..."
        />
      </div>
    );
  }


}

export default Editor;
