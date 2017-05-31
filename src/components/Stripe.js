import React from 'react';
import { View } from 'react-primitives';
import styles from '../styles/styles';

class Stripe extends React.Component {
	render() {
		return(
			<View style={styles.stripe}>
				{this.props.children}
			</View>
		);
	}
}

export default Stripe;