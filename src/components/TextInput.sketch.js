import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

class TextInput extends React.Component {
	render() {
		return(
			<View style={styles.input}>
				{ this.props.placeholder &&
					<Text style={[styles.text, styles.textHint]}>{this.props.placeholder}</Text>
				}
			</View>
		);
	}
}

export default TextInput;