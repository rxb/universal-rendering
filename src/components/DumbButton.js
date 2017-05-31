import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

class DumbButton extends React.Component {
	render() {
		return(
			<View style={styles.button}>
				<Text style={[styles.text, styles.buttonText]}>{this.props.label}</Text>
			</View>
		);
	}
}

export default DumbButton;