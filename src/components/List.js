import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-primitives';
import styles from '../styles/styles';

class List extends React.Component {
	render() {
		const {
			children,
			items = [],
			renderItem = ()=>{},
			style,
			variant,
			...other
			} = this.props;

		const variantStyleModifier = (variant) ? `--${variant}` : '';

		return(
			<View
				accessibilityRole='list'
				style={[styles[`list${variantStyleModifier}`], style]}
				>
				{ items.map((item, i)=>{
					return (
						<View
							key={i}
							accessibilityRole='listitem'
							style={[styles[`list-item${variantStyleModifier}`], style]}
							>
							{ renderItem(item, i) }
						</View>
					);
				})}
				{children}
			</View>
		);
	}
}

List.propTypes = {
	variant: PropTypes.oneOf(['grid', 'inline']),
}

export default List;