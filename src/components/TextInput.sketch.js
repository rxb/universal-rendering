import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

class TextInput extends React.Component {
	render() {
		const {
			multiline
		} = this.props;

		return(
			<View style={[styles.input, ((multiline) ? styles['input--multiline'] : {}) ]}>
				{ this.props.placeholder &&
					<Text style={[styles.text, styles.textHint]}>{this.props.placeholder}</Text>
				}
			</View>
		);
	}
}

export default TextInput;