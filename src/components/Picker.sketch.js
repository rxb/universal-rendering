import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

class Picker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLabel: ""
		}
	}
	componentDidMount() {
		// pick out label of selected picker.item child
		const selectedValue = (this.props.selectedValue !== undefined ) ? this.props.selectedValue : this.props.children[0].props.value;
		let selectedLabel = '';
		for(const c of this.props.children){
			if(c.props.value == selectedValue){
				selectedLabel = c.props.label;
			}
		}
		this.setState({selectedLabel: selectedLabel});
	}

	render() {
		const {
			children,
			multiline,
		} = this.props;

		const selectedLabel = 'Testing';

		return(
			<View style={[styles.input]}>
				<Text style={[styles.text]}>{this.state.selectedLabel}</Text>
			</View>
		);
	}
}

// Don't need no items in sketch
Picker.Item = () => {}

export default Picker;