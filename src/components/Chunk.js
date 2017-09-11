import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

const Chunk = (props) => {
	const {
		children,
		inline,
		style,
		...other
	} = props;

	const inlineStyle = (inline) ? styles.inline : {};

	return(
		<View style={[styles.chunk, inlineStyle, style]}>
			{children}
		</View>
	);
}


export default Chunk;