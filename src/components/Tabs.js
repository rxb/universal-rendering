import React from 'react';
import { Touchable, View, Text } from 'react-primitives';
import styles from '../styles/styles';
import Link from './Link';


class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 1
		}
	}

	render() {
		const {
			children,
			selectedItem = 0,
			tabs,
			...other
		} = this.props;
		return(
			<View
				style={[styles.tabs]}
				{...other}
				>
				{ tabs.map((tab, i)=>{
					const selectedStyle = (selectedItem == i) ? styles['tabItem--selected'] : {};
					return(
						<Link onPress={()=>{
							this.setState({selected: i});
						}}>
							<View style={[styles.tabItem, selectedStyle]}>
								<Text style={[styles.text]}>{tab}</Text>
							</View>
						</Link>

					);
				})}


			</View>


		);
	}
}


export default Tabs;