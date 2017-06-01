import React from 'react';
import { Image } from 'react-primitives';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

class Avatar extends React.Component {

	render() {

		const {
			size
		} = this.props;

		const style = styles[`avatar--${size}`];

		return(
			<Image
				source={this.props.source}
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
}

export default Avatar;