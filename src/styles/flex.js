import { StyleSheet } from 'react-primitives';

const base = 16;
const space = base * .75;
const spaceSection = base * 1.5;
const flexGrowFactors = [1, 2, 3, 4, 5, 6, 7];

const styles = StyleSheet.create({


/*doc
---
title: Flex
---
Lays out content using `display: flex`.

The `.flex` class is rendered with the `<Flex>` component.

Direct children of `.flex` are flex children, and use the
`<FlexItem>` component to render the class `.flex-item`
with an optional prop `shrink` to render the class
`.row-item--shrink` for a flex-shrink item.

By default, the `<Flex>` component renders the class
`flex--row` to setting `flex-direction: row`

The flex children in flex row do not have a `flex-basis` set; a
basis is not required for most common layout tasks.
*/

'flex' : {
	flexDirection: 'row'
},

'flex-item' : {
	flex: 1,
	paddingLeft: base,
	':first-child': {
		paddingLeft: 0
	}
},

/*doc
---
title: Flex Layout Variants
---
The following classes control the `flex-direction` allowing
content to be arranged in rows or columns.

Class                   | Description
----------------------- | -------------------------------
`.flex--row`            | arranges content in rows
`.flex--column`         | arranges content in columns

Layout can change from row to column (or vice versa) at a breakpoint
Using this signature: `.at[Breakpoint]_flex--[direction]`

Breakpoints        | Direction       | Description
------------------ | --------------- | ---------------------------
`medium`, `large`  | `row`           | arranges content in a row
`medium`, `large`  | `column`        | arranges content in column
*/


'flex--row' : {
	flexDirection: 'row',
},

'flex--row__flex-item': {
	paddingLeft: base,
	width: 'auto',
	':first-child': {
		paddingLeft: 0
	}
},


/*
@include _bpModifier(flex, column, true) { // `true` arg generates "atAll" conditional class
	@include flexParent('column', false);
	> .flex-item {
		width: 100%;
		padding-left: 0;
	}
}
*/

'flex--column': {
	flexDirection: 'column',
	height: '100%'
},

'flex--column__flex-item': {
	width: '100%',
	paddingLeft: 0
},

/*
@include _bpModifier(flex, row, true) {
	@include flexParent('row', false);
	height: auto;
	> .flex-item {
		@include responsiveVarContext--base() {
			padding-left: $base;
		}
		width: auto;
		&:first-child {
			padding-left: 0;
		}
	}
}
*/

/*doc
---
title: Flex Item Variants
---
The following classes are variants that can be by adding
props to the <FlexItem> component


Class                       | Description
--------------------------- | -------------------------------
`.flex-item--shrink`        | Gives a shrink factor, shrinking item to fit content
`.flex-item--[n]` | Sets grow factor
*/

...(flexGrowFactors.map( (factor, i) => {
	return {[`flex-item--${factor}`]: {
		flex: factor
	}};
})),

'flex-item--shrink': {
	flex: 0
},

/*doc
---
title: Flex Variants
---
The following classes are variants that can be by adding
props to the <Flex> component

Class                            | Description
-------------------------------- | -------------------------------
`.flex--noGutters`               | removes padding from all `.flex-item` children
`.flex--wrap`                    | allows row wrapping (useful for collapsing rows in smaller viewports)
`.flex--rowReverse`              | reverses row order
`.atMedium_flex--rowReverse`     | reverses row order for medium breakpoint and up
`.atLarge_flex--rowReverse`      | reverses row order for large breakpoint and up
`.flex--columnReverse`           | reverses column order
`.atMedium_flex--columnReverse`  | reverses column order for medium breakpoint and up
`.atLarge_flex--columnReverse`   | reverses column order for large breakpoint and up
*/

'flex--noGutters__flex-item': {
	padding: 0,
	':first-child, :last-child': {
		padding: 0
	}
},

'flex--wrap': {
	flexWrap: 'wrap'
},

/*
@include _bpModifier(flex, columnReverse, true) {
	@include flex-direction(column-reverse);
}

@include _bpModifier(flex, rowReverse, true) {
	@include flex-direction(row-reverse);
	> .flex-item {
		&:first-child {
			@include responsiveVarContext--base() {
				padding-left: $base;
			}
		}
		&:last-child {
			padding-left: 0;
		}
	}
}
*/

/*
Content justification variants are also available (see also: <a class="link" target="_blank" href="https://css-tricks.com/almanac/properties/j/justify-content/">css tricks flexbox demo</a>)
Using this signature: `.at[Breakpoint]_flex--[justification]`

Class                   | Variants
----------------------- | -------------------------------
`.flex--flexEnd`        | justifies content to `flex-end`
`.flex--center`         | justifies content to `center`
`.flex--spaceBetween`   | justifies content to `spaceBetween`
`.flex--spaceAround`    | justifies content to `spaceAround`
*/


/*
@each $jName, $jprop in $flexJustifyMap {
	.flex--#{$jName} {
		@include justify-content($jprop);
	}
}
*/


/*
Alignment variants are also available using `align-items` (see also: <a class="link" target="_blank" href="https://css-tricks.com/almanac/properties/a/align-items/">css tricks flexbox demo</a>)

Class                   | Variants
----------------------- | -------------------------------
`flex--alignTop`        | aligns content to `flex-start`
`flex--alignBottom`     | aligns content to `flex-end`
`flex--alignCenter`     | aligns content to `center`
*/

/*
@each $aName, $aprop in $flexAlignMap {
	.flex--align#{str-firstCharToUpper($aName))} {
		@include align-items($aprop);
	}
}
*/

});

export default styles;