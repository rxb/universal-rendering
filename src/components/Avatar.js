import React from 'react';
import { View, Image } from 'react-primitives';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

class Avatar extends React.Component {
	render() {
		const {
			size,
			source
		} = this.props;

		const style = styles[`avatar--${size}`];

		return(
			<Image
				source={source}
				style={style}
				/>
		);
	}
}

Avatar.defaultProps = {
	size: 'medium',
};

Avatar.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	source: PropTypes.object
}

export default Avatar;