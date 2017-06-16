import { StyleSheet } from 'react-primitives';
import swatches from './swatches';
import flexStyles from './flex';


const base = 16;
const space = base * .75;
const spaceSection = base * 1.5;

const styles = StyleSheet.create({

	/*
	##################################################################################
	CSS NOTES
	##################################################################################

	Media queries and pseudoelements should be nested inside a style.

		thing: {
			color: 'blue',
			'@media (min-width: 600px)': {
				color: 'red'
			}
		}

	Media queries and pseudoelements are currently ignored in react-sketchapp.

	Forget about ANY cascading, even setting fontFamily in <body>. Fully style each element. For example, styles.text has the base text styling.
	*/


	// LAYOUT
	stripe: {
		backgroundColor: 'white'
	},
	bounds: {
		maxWidth: 1000,
	},
	section: {
		paddingTop: spaceSection,
		marginHorizontal: spaceSection,
		paddingBottom: spaceSection - space
	},
	chunk: {
		paddingBottom: space
	},

	// INPUT
	input: {
		backgroundColor: '#eeeeee',
		padding: space,
		borderRadius: 5,
		borderWidth: 0,
		color: swatches.textPrimary
	},
	'input--multiline': {
		minHeight: base * 6
	},


	// BUTTON
	button: {
		backgroundColor: 'purple',
		padding: space,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center'
	},

	// AVATAR
	avatar: {
		resizeMode: 'cover',
	},
	'avatar--small':{
		width: 24,
		height: 24,
		borderRadius: 12
	},
	'avatar--medium':{
		width: 36,
		height: 36,
		borderRadius: 18
	},
	'avatar--big':{
		width: 120,
		height: 120,
		borderRadius: 60
	},

	// TEXT
	text: {
		fontSize: base,
		fontFamily: 'Helvetica',
		fontWeight: '400',
		color: swatches.textPrimary,

		// retina/non-retina rendering
		WebkitFontSmoothing: 'antialiased',
		/*
		'@media only screen and (-webkit-min-device-pixel-ratio: 1.25), only screen and ( min-device-pixel-ratio: 1.25), only screen and ( min-resolution: 200dpi), only screen and ( min-resolution: 1.25dppx)':  {
				WebkitFontSmoothing: 'subpixel-antialiased'
		}
		*/
	},
	textSecondary:{
		color: swatches.textSecondary
	},
	textHint:{
		color: swatches.textHint
	},
	textSmall: {
		fontSize: base * 0.875,
	},
	textStrong: {
		fontWeight: '600',
	},
	textBig: {
		fontSize: base * 1.375,
		fontWeight: '900'
	},
	textSectionHead: {
		fontSize: base * 1.125,
		fontWeight: '900'
	},
	textPageHead: {
		fontSize: base * 2,
		fontWeight: '900'
	}
});

export default {...styles, ...flexStyles};