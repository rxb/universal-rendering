import { StyleSheet } from 'react-primitives';
import swatches from './swatches';

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
		maxWidth: 800
	},
	section: {
		paddingTop: spaceSection,
		marginHorizontal: spaceSection,
		paddingBottom: spaceSection - space
	},
	chunk: {
		paddingBottom: space
	},


	// BUTTON
	button: {
		backgroundColor: 'purple',
		padding: space,
		borderRadius: 4,
		display: 'flex',
		'@media (min-width: 600px)': {
			backgroundColor: 'red'
		},
		':hover': {
			backgroundColor: 'green',
		}
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center'
	},


	// TEXT
	text: {
		fontSize: base,
		fontFamily: 'Helvetica',
		fontWeight: 400,
		color: swatches.textPrimary,

		// retina/non-retina rendering
		WebkitFontSmoothing: 'antialiased',
		'@media only screen and (-webkit-min-device-pixel-ratio: 1.25), only screen and ( min-device-pixel-ratio: 1.25), only screen and ( min-resolution: 200dpi), only screen and ( min-resolution: 1.25dppx)':  {
				WebkitFontSmoothing: 'subpixel-antialiased'
		}
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
		fontWeight: 600,
	},
	textBig: {
		fontSize: base * 1.375,
		fontWeight: 900
	},
	textSectionHead: {
		fontSize: base * 1.125,
		fontWeight: 900
	},
	textPageHead: {
		fontSize: base * 2,
		fontWeight: 900
	}
});

export default styles;