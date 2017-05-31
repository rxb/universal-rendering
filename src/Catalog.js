import React from 'react';
import { View, Text, StyleSheet } from 'react-primitives';
import styles from './styles/styles';

import DumbButton from './components/DumbButton';
import Stripe from './components/Stripe';
import Bounds from './components/Bounds';
import Section from './components/Section';
import Chunk from './components/Chunk';
import Flex from './components/Flex';


const Catalog = () => (
	<Stripe>
		<Bounds>
			<Section>
				<Chunk>
					<Text style={[styles.text, styles.textPageHead]}>Here we go!</Text>
				</Chunk>
				<Chunk>
					<DumbButton label='This is a button!!!!' />
				</Chunk>
				<Chunk>
					<Text style={styles.text}>Please work</Text>
					<Text style={[styles.text, styles.textSecondary]}>Please work</Text>
				</Chunk>
				<Chunk>
					<Flex>
						<View><Text>ok</Text></View>
						<View><Text>ok</Text></View>
					</Flex>
				</Chunk>
			</Section>
		</Bounds>
	</Stripe>
);

export default Catalog;