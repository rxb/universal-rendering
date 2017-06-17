import React from 'react';
import { StyleSheet } from 'react-primitives';
import { TextInput as TextInputWeb } from 'react-native-web';
import styles from '../styles/styles';


class TextInput extends React.Component{
	render() {
		const {
			multiline,
			placeholder,
			type
		} = this.props;

		return (
			<TextInputWeb
				accessibilityLabel={placeholder}
				maxNumberOfLines={5}
				multiline={multiline}
				placeholder={placeholder}
				className='input'
				style={[
					styles.input,
					multiline && styles['input--multiline'],
					styles.text
				]}
				/>
		);
	}
}


export default TextInput;