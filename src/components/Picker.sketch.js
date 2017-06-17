import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

class Picker extends React.Component {
	render() {
		const {
			multiline
		} = this.props;

		return(
			<View style={[styles.input, ((multiline) ? styles['input--multiline'] : {}) ]}>
				{ this.props.placeholder &&
					<Text style={[styles.text]}>{this.props.placeholder}</Text>
				}
			</View>
		);
	}
}

// Don't need no items in sketch
Picker.Item = () => {}

export default Picker;