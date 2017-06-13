import React from 'react';
import { View, Image, Platform } from 'react-primitives';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

class Icon extends React.Component {
	render() {
		const {
			size,
			shape,
		} = this.props;

		// sketch can't do SVG yet, so we need a PNG for them
		// to be able to tint this, even on web we need to use svgs not as a standard image
		// would be nice to implement tintcolor from RN

		if(Platform.OS =='sketch')
			return(
				<View style={{borderWidth: 1, borderColor: 'gray', height: 24, width: 24}}>
				</View>
			);

		if(Platform.OS =='web')
			return(
				<svg className="icon" style={{height: 24, width: 24, stroke: 'gray', fill: 'none', strokeWidth: 1}}>
					<use xlinkHref={`#icon-${shape}`} />
				</svg>
			);
	}
}

Icon.defaultProps = {
	size: 'medium',
};

Icon.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	shape: PropTypes.object,
	color: PropTypes.string
}

export default Icon;