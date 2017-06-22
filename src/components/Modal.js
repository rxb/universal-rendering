import React from 'react';
import { Touchable, View } from 'react-primitives';
import styles from '../styles/styles';
import Card from './Card';
import Link from './Link';
import Icon from './Icon';
import Section from './Section';


/*

how to hide/show?
a prop?
a method?
(i'm guessing a prop but who knows)

how to hide/remove an element with animations
layoutanimation vs csstransitiongroup (is there a way to code-split this?)
animated is cross-platform
but how do you animate something that has been removed?

i think the basic idea for modal is
don't directly change the thing that renders it
request to dismiss it
and change that value after the animation runs

*/


class Modal extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		const {
			children,
			onRequestClose,
			visible,
			...other
		} = this.props;


		if(visible){
			return(
				<View>
					<Link
						onPress={onRequestClose}>
							<View style={[ styles['modal-backdrop'] ]} />
					</Link>

					<Card style={[styles.modal]}>
						<Section>
							<Link
								onPress={onRequestClose}>
								<Icon shape='x' color="gray" size="large" />
							</Link>
						</Section>
						{children}
					</Card>
				</View>
			);
		}
		else{
			return false;
		}
	}
}


export default Modal;