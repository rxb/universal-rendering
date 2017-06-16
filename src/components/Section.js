import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

class Section extends React.Component {
	render() {

		const {
			style,
		} = this.props

		return(
			<View style={[styles.section, style]}>
				{this.props.children}
			</View>
		);
	}
}

export default Section;