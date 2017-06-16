import React from 'react';
import { View, Image } from 'react-primitives';
import styles from '../styles/styles';

class Stripe extends React.Component {
	render() {

		const {
			image,
			style,
		} = this.props

		if(image){
			return(
				<Image
					source={{uri: image}}
					style={[styles.stripe, {resizeMode: 'cover'}, style]}
					>
					{this.props.children}
				</Image>
			);
		}
		else{
			return(
				<View style={styles.stripe}>
					{this.props.children}
				</View>
			);
		}

	}
}

export default Stripe;