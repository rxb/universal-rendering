import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-primitives';
import styles from './styles/styles';

import DumbButton from './components/DumbButton';
import Stripe from './components/Stripe';
import Bounds from './components/Bounds';
import Section from './components/Section';
import Chunk from './components/Chunk';
import Flex from './components/Flex';
import FlexItem from './components/FlexItem';
import Avatar from './components/Avatar';
import Icon from './components/Icon';
import TextInput from './components/TextInput';
import Picker from './components/Picker';
import List from './components/List';
import Card from './components/Card';
import Tabs from './components/Tabs';
import Link from './components/Link';
import Modal from './components/Modal';

const people = [
	{name: 'Sally Somebody'},
	{name: 'Norman Nobody'},
	{name: 'Evan Everybody'},
	{name: 'Walt Whatever'},
	{name: 'Fred Fakeperson'},
	{name: 'Andy Avatar'}
]



class Catalog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedPerson: 0,
			showModal: false
		}
	}

	render() {
		return(

			<View>
				<Stripe image="https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg" style={{minHeight: 250}}>
					<Bounds>
						<Section>
							<Chunk>
								{/* some stuff? */}
							</Chunk>
						</Section>
					</Bounds>
				</Stripe>
				<Stripe>
					<Bounds>
						<Section>
							<Chunk>
								<Flex switchDirection="medium">
									<FlexItem shrink>
										<Icon shape='download-cloud' color="red" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='sun' color="green" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='trending-up' color="blue" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='feather' color="black" />
									</FlexItem>
								</Flex>
							</Chunk>
						</Section>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textPageHead]}>Here we go!</Text>
							</Chunk>
							<Chunk>
								<Text style={styles.text}>Please work</Text>
								<Text style={[styles.text, styles.textSecondary]}>Please work</Text>
							</Chunk>
						</Section>
						<Section>
							<Flex switchDirection="medium">
								<FlexItem>
									<Chunk>
										<Link
											onPress={()=>{
												this.setState({showModal: !this.state.showModal});
											}}>
												<DumbButton label="Do it" />
										</Link>
									</Chunk>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<DumbButton label="Don't do it" />
									</Chunk>
								</FlexItem>
							</Flex>
							<Flex direction="column" switchDirection="atMedium">
								<FlexItem>
									<Chunk>
										<DumbButton label="Upload" shape='upload-cloud' />
									</Chunk>
								</FlexItem>
								<FlexItem growFactor={2}>
									<Chunk>
										<DumbButton label="Download" shape='download-cloud' />
									</Chunk>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<DumbButton label="Get crazy" shape='zap' />
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>

						<Section>
							<Card>
								<Section style={{alignItems: 'center'}}>
									<Chunk>
										<Avatar
											size='large'
											source={{uri: `https://randomuser.me/api/portraits/women/${this.state.selectedPerson}.jpg`}}
											/>
									</Chunk>
									<Chunk>
										<Text style={[styles.text]}>Oh look it's a card</Text>
									</Chunk>
								</Section>
							</Card>
						</Section>

						<Section>

							<Chunk>
								<Tabs tabs={['one', 'two', 'three']} />
							</Chunk>

							{/*
								- 			linear list
								inline	 	inline block list
								hscroll 	scrolling inline block list
								grid		grid list

							*/}

							<List
								variant=''
								items={people}
								renderItem={(item, i)=>{
									return(
										<Flex>
											<FlexItem shrink>
												<Chunk>
													<Avatar source={{uri: `https://randomuser.me/api/portraits/women/${i}.jpg`}} />
												</Chunk>
											</FlexItem>
											<FlexItem>
												<Chunk>
													<Link
														onPress={()=>{
															this.setState({selectedPerson: i})
														}}>
														<View>
														<Text style={[styles.text, styles.textStrong]}>{item.name}</Text>
														<Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
														</View>
													</Link>
												</Chunk>
											</FlexItem>
											<FlexItem shrink>
												<Link
													onPress={()=>{
														alert(`Hey, ${item.name}!`);
													}}>
														<Icon shape='more-vertical' color="gray" />
												</Link>
											</FlexItem>
										</Flex>
									);
								}}
								/>

						</Section>
						<Section>
							<Chunk>
								<Picker style={[styles.input, styles.text]}>
									{ (['option one', 'option two', 'option three', 'option four']).map((item, i)=>{
										return(
											<Picker.Item value={item} label={item} />
										);
									}) }
								</Picker>
							</Chunk>
							<Chunk>
								<TextInput
									placeholder="Hey I'm a text input"
									/>
							</Chunk>
							<Chunk>
								<TextInput
									multiline
									placeholder="Hey I'm a multiline text input (aka textarea)"
									/>
							</Chunk>
						</Section>


					</Bounds>
				</Stripe>

				<Modal
					visible={this.state.showModal}
					onRequestClose={ () => this.setState({showModal: false}) }
					>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textPageHead]}>Modal</Text>
							</Chunk>
							<Chunk>
								<Text style={[styles.text]}>Hey y'all I'm a modal</Text>
							</Chunk>
						</Section>
						<Section>
							<Chunk>
								<Link
									onPress={()=>{
										this.setState({showModal: false});
									}}>
										<DumbButton label="Let's do this" />
								</Link>
							</Chunk>
						</Section>
				</Modal>
			</View>

		);
	}
};

export default Catalog;