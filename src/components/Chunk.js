import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

const Chunk = (props) => {
	const {
		children,
		style,
		...other
	} = props;

	return(
		<View style={[styles.chunk, style]}>
			{children}
		</View>
	);
}


export default Chunk;