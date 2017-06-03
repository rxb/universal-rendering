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
		const source = (Platform.OS == 'sketch') ? `https://rawgit.com/google/material-design-icons/master/navigation/1x_web/ic_${shape}_black_48dp.png` : `https://rawgit.com/google/material-design-icons/master/navigation/svg/production/ic_${shape}_48px.svg`;

		// to be able to tint this, even on web we need to use svgs not as a standard image
		// would be nice to implement tintcolor from RN
		return(
			<Image
				source={{uri: source}}
				style={{
					width: 40,
					height: 40,
					resizeMode: 'contain'
				}}
				/>
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