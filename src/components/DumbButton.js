import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';
import Icon from './Icon';


class DumbButton extends React.Component {
	render() {
		const {
			shape,
		} = this.props;


		return(
			<View style={styles.button}>
				{ shape &&
					<Icon shape={shape} color="white" />
				}
				<Text style={[styles.text, styles.buttonText]}>{this.props.label}</Text>
			</View>
		);
	}
}

export default DumbButton;