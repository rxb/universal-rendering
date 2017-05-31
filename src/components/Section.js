import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

class Section extends React.Component {
	render() {
		return(
			<View style={styles.section}>
				{this.props.children}
			</View>
		);
	}
}

export default Section;