import React from 'react';
import { StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

class TextInput extends React.Component {
	render() {

		// auto-stylesheet stuff doesn't work on DOM nodes so it looks like we have to inline for now
		return(
			<input type="text" style={StyleSheet.flatten([styles.input, styles.text])} className="input" placeholder={this.props.placeholder} />
		);
	}
}

export default TextInput;