import React from 'react';
import { Touchable, View, Text } from 'react-primitives';
import styles from '../styles/styles';
import Link from './Link';

const TabItem = (props: PropsType) => {
  const {
  	value,
  	label,
  	selected,
  	onChange = () => {}
  } = props;
  const selectedStyle = (selected) ? {item: styles['tabItem--selected'], text: styles['tabText--selected']} : {};

  return (
	<Link
		onPress={ () => onChange(value) }
		>
		<View style={[styles.tabItem, selectedStyle.item]}>
			<Text style={[styles.text, styles.textSecondary, selectedStyle.text]}>{label}</Text>
		</View>
	</Link>
  )
}



class Tabs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			children,
			onChange,
			...other
		} = this.props;

		// default to first tab
		const selectedValue = this.props.selectedValue || children[0].props.value;

		// pass selectedness to child
		const childrenWithProps = React.Children.map(children, function (child) {
	        return React.cloneElement(child, {
	            selected: (selectedValue == child.props.value),
	            onChange
	        });
	    });

		return(
			<View
				style={[styles.tabs]}
				{...other}
				>
				{childrenWithProps}
			</View>

		);
	}
}

Tabs.Item = TabItem

export default Tabs;