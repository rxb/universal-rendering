import { StyleSheet } from 'react-primitives';
import swatches from './swatches';
import flexStyles from './flex';


const base = 16;
const space = base * .75;
const spaceSection = base * 1.5;

const styles = StyleSheet.create({


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


	// LISTS
	// react-sketchapp lists other than default depend on yoga https://github.com/airbnb/react-sketchapp/issues/52

	// default
	list:{

	},
	'list-item': {
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		paddingTop: space
	},

	// grid

	'list--grid':{
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	'list-item--grid': {
		flexBasis: '50%'
	},

	// inline
	'list--inline':{
		flexDirection: 'row',
		flexWrap: 'nowrap',
		overflow: 'scroll',
		WebkitOverflowScrolling: 'touch',
	},
	'list-item--inline': {
		flexBasis: 200
	},

	// hscroll
	'list--hscroll':{
		flexDirection: 'row',
		flexWrap: 'nowrap',
		overflowY: 'scroll',
		WebkitOverflowScrolling: 'touch',
	},
	'list-item--hscroll': {
		flexBasis: 200
	},


	// INPUT
	input: {
		backgroundColor: '#eeeeee',
		padding: space * 1.5,
		borderRadius: 5,
		borderWidth: 0,
		color: swatches.textPrimary,
		boxSizing: 'border-box',
		appearance: 'none'
	},
	'input--multiline': {
		minHeight: base * 6
	},


	// BUTTON
	button: {
		backgroundColor: '#1D7CF2',
		padding: space*1.5,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center'
	},

	// CARD
	card: {
		borderRadius: 5,
		shadowRadius: 12,
		shadowColor: 'rgba(0,0,0,.25)',
		backgroundColor: 'white',
	},

	// TABS
	tabs: {
		flexDirection: 'row',
	},
	tabItem: {
		flex: 0,
		marginRight: space,
	},
	'tabItem--selected': {
		borderBottomColor: 'blue',
		borderBottomWidth: 2,
	},

	// MODAL
	'modal-backdrop': {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,.75)'
	},
	modal: {
		position: 'fixed',
		top: space*2,
		left: space*2,
		right: space*2,
		bottom: space*2
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
	'avatar--large':{
		width: 120,
		height: 120,
		borderRadius: 60
	},

	// TEXT
	text: {
		fontSize: base,
		fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
		fontWeight: '400',
		color: swatches.textPrimary,
		lineHeight: base * 1.4,
		WebkitFontSmoothing: 'antialiased', // retina/non-retina rendering
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
		fontWeight: '800'
	},
	textSectionHead: {
		fontSize: base * 1.125,
		fontWeight: '800'
	},
	textPageHead: {
		fontSize: base * 2,
		fontWeight: '800'
	}
});

export default {...styles, ...flexStyles};