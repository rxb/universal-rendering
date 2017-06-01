import React from 'react';
import { View } from 'react-primitives';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

export const VALID_ALIGNMENTS = {
	top: 'Top',
	bottom: 'Bottom',
	center: 'Center',
};

export const VALID_BREAKPOINTS = {
	all: 'atAll',
	medium: 'atMedium',
	large: 'atLarge',
};

export const VALID_SPACE = {
	center: 'center',
	spaceAround: 'spaceAround',
	spaceBetween: 'spaceBetween',
	flexEnd: 'flexEnd'
};

export const DIRECTION_ROW = 'row';
export const DIRECTION_COLUMN = 'column';

export const FLEX_CLASS = 'flex';
export const FLEX_ROW_CLASS = `${FLEX_CLASS}--${DIRECTION_ROW}`;
export const FLEX_COLUMN_CLASS = `${FLEX_CLASS}--${DIRECTION_COLUMN}`;
export const FLEX_WRAP_CLASS = `${FLEX_CLASS}--wrap`;
export const FLEX_NOGUTTER_CLASS = `${FLEX_CLASS}--noGutters`;
export const FLEX_ALIGN_CLASS = `${FLEX_CLASS}--align`;


class Flex extends React.Component {
	render() {
		const {
			direction,
			switchDirection,
			wrap,
			noGutters,
			justify,
			align,
			rowReverse,
			columnReverse,
			children,
			style,
			...other
		} = this.props;

		const columnReverseBreakpoint = VALID_BREAKPOINTS[columnReverse] || VALID_BREAKPOINTS['all'];
		const rowReverseBreakpoint = VALID_BREAKPOINTS[rowReverse] || VALID_BREAKPOINTS['all'];

		const isColumn = direction === DIRECTION_COLUMN;


		// decide which types of styles are active
		// only make an array of keys for now
		// this will be used to reference correct styles for the <Flex> and also <FlexItem>s
		const styleKeys = [
			FLEX_CLASS,

			// horizontal default
			!isColumn ? FLEX_ROW_CLASS : undefined,
			!isColumn && switchDirection ? `${VALID_BREAKPOINTS[switchDirection]}_${FLEX_COLUMN_CLASS}` : undefined,

			// vertical default
			isColumn ? FLEX_COLUMN_CLASS : undefined,
			isColumn && switchDirection ? `${VALID_BREAKPOINTS[switchDirection]}_${FLEX_ROW_CLASS}` : undefined,

			// reverse breakpoint modifiers
			rowReverse ? `${rowReverseBreakpoint}_flex--rowReverse` : undefined,
			columnReverse ? `${columnReverseBreakpoint}_flex--columnReverse` : undefined,

			// other
			wrap ? FLEX_WRAP_CLASS : undefined,
			noGutters ? FLEX_NOGUTTER_CLASS : undefined,
			justify ? `${FLEX_CLASS}--${VALID_SPACE[justify]}` : undefined,
			align ? `${FLEX_ALIGN_CLASS}${VALID_ALIGNMENTS[align]}` : undefined,
		]

		const combinedStyles = styleKeys.map((key, i)=>{
			return styles[key];
		});

		const combinedDescendantStyles = styleKeys.map((key, i)=>{
			// making up a thing here
			// three dashes "__" is for direct descendants of the first part
			return styles[`${key}__flex-item`];
		});


		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				descendantStyles: combinedDescendantStyles
			})
		);

		return (
			<View
				style={combinedStyles}
				{...other}
			>
				{childrenWithProps}
			</View>
		);
	}
}

Flex.propTypes = {
	align: PropTypes.oneOf(Object.keys(VALID_ALIGNMENTS)),
	justify: PropTypes.oneOf(Object.keys(VALID_SPACE)),
	wrap: PropTypes.bool,
	noGutters: PropTypes.bool,

	direction: PropTypes.oneOf([
		DIRECTION_ROW,
		DIRECTION_COLUMN,
	]),
	switchDirection: PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS)),
	rowReverse: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),
	columnReverse: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(Object.keys(VALID_BREAKPOINTS))
	]),
};

Flex.defaultProps = {
	direction: DIRECTION_ROW,
};

export default Flex;
