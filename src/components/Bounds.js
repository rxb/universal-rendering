import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

const Bounds = (props) => {
	const {
		style,
		children
	} = props;
	return(
		<View style={[styles.bounds, style]}>
			{children}
		</View>
	);
}


export default Bounds;