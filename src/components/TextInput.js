import React from 'react';
import { StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

class TextInput extends React.Component {
	render() {
		const {
			multiline
		} = this.props;

		// auto-stylesheet stuff doesn't work on DOM nodes so it looks like we have to inline for now

			if (!multiline)
				return (<input type="text" style={StyleSheet.flatten([styles.input, styles.text])} className="input" placeholder={this.props.placeholder} />
				);

			if (multiline)
				return( <textarea style={StyleSheet.flatten([styles.input, styles['input--multiline'], styles.text])} className="input" placeholder={this.props.placeholder}></textarea>
				);
	}
}

export default TextInput;