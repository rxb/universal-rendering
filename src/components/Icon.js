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


		/*

		pick an icon set
		https://github.com/colebemis/feather
		feather-icons

		https://github.com/sindresorhus/grunt-svgmin
		https://github.com/FWeinb/grunt-svgstore

		svgstore (makes a big sprite) https://github.com/svgstore/svgstore

		grunt png colors or whatever
		https://github.com/filamentgroup/directory-colorfy
		https://github.com/domenic/svg2png

		webpack
		raw loader https://github.com/webpack-contrib/raw-loader
		*/


		if(Platform.OS =='sketch')
			return(
				<Image
					source={{uri: `https://rawgit.com/google/material-design-icons/master/navigation/1x_web/ic_${shape}_black_48dp.png`}}
					style={{
						width: 40,
						height: 40,
						resizeMode: 'contain'
					}}
					/>
			);

		if(Platform.OS =='web')
			return(
				<svg
					style={{
						width: 40,
						height: 40,
						resizeMode: 'contain',
						fill: 'blue'
					}}
					>
    				<use xlinkHref={`http://rawgit.com/google/material-design-icons/master/navigation/svg/production/ic_${shape}_48px.svg`}></use>
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