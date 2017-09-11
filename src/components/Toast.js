import React from 'react';
import { Touchable, View, Text } from 'react-primitives';
import styles from '../styles/styles';


class Toast extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			label,
			...other
		} = this.props;


		return(
			<View style={[styles.toast]}>
				<Text>Toast is the most</Text>
			</View>
		);
	}
}


export default Toast;