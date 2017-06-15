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


const Catalog = () => (
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
							<DumbButton label="Do it" />
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
							<DumbButton label="1" />
						</Chunk>
					</FlexItem>
					<FlexItem growFactor={2}>
						<Chunk>
							<DumbButton label="2" />
						</Chunk>
					</FlexItem>
					<FlexItem>
						<Chunk>
							<DumbButton label="3" />
						</Chunk>
					</FlexItem>
				</Flex>
			</Section>

			<Section>
				<Flex>
					<FlexItem shrink>
						<Chunk>
							<Avatar source={{uri: 'https://randomuser.me/api/portraits/women/2.jpg'}} />
						</Chunk>
					</FlexItem>
					<FlexItem>
						<Chunk>
							<Text style={[styles.text, styles.textStrong]}>Sally Smeetup</Text>
							<Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
						</Chunk>
					</FlexItem>
				</Flex>
			</Section>
			<Section>
				<Chunk>
					<TextInput placeholder="Hey I'm a text input" />
				</Chunk>
				<Chunk>
					<TextInput multiline placeholder="Hey I'm a multiline text input (aka textarea)" />
				</Chunk>
			</Section>
		</Bounds>
	</Stripe>
);

export default Catalog;