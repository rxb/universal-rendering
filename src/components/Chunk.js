import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

class Chunk extends React.Component {
	render() {
		return(
			<View style={styles.chunk}>
				{this.props.children}
			</View>
		);
	}
}

export default Chunk;