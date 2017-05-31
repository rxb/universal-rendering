import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

class Bounds extends React.Component {
	render() {
		return(
			<View style={styles.bounds}>
				{this.props.children}
			</View>
		);
	}
}

export default Bounds;