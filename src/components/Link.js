import React from 'react';
import { Touchable, View } from 'react-primitives';
import styles from '../styles/styles';

class Link extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: 1
		}
	}

	render() {
		const {
			children,
			...other
		} = this.props;
		return(
			<Touchable
				{...other}
				onPressIn={()=>{
					this.setState({
						opacity: .5
					})
				}}
				onPressOut={()=>{
					this.setState({
						opacity: 1
					})
				}}
				>
					<View
						style={{
							opacity: this.state.opacity
						}}
						>
						{children}
					</View>
			</Touchable>
		);
	}
}


export default Link;