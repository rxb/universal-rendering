import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';


class Chip extends React.Component {
	render() {
		const {
			shape,
		} = this.props;


		return(
			<View style={styles.chip}>
				<Text style={[styles.text, styles.textSmall, styles.chipText]}>{this.props.label}</Text>
			</View>
		);
	}
}

export default Chip;