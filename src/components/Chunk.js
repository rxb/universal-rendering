import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

class Chunk extends React.Component {
	render() {
		const {
			style,
			...other
			} = this.props;
		return(
			<View style={[styles.chunk, style]}>
				{this.props.children}
			</View>
		);
	}
}

export default Chunk;