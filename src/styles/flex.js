import { StyleSheet } from 'react-primitives';

// move to a constants file somewhere
const base = 16;
const space = base * .75;
const spaceSection = base * 1.5;
const flexGrowFactors = [1, 2, 3, 4, 5, 6, 7];
const flexJustifyMap = {
	"flexEnd": "flexEnd",
	"center": "center",
	"spaceBetween": "spaceBetween",
	"spaceAround": "spaceAround"
};
const flexAlignMap = {
	"top": "flexStart",
	"bottom": "flexEnd",
	"center": "center"
};
const breakpointsMap = {
	"medium": 600,
	"large": 800
}
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
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
	alignItems: 'stretch',
	flexDirection: 'row',
},

'flex-item' : {
	width: 'auto',
	flex: 1,
	flexBasis: 0
},

// testing setting first-child manually
// works across platforms better
// consider a composable component that adds this to iteratable items
'flex-item--firstChild': {
	paddingLeft: 0
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
	minHeight: '-webkit-min-content'
},


'flex--column': {
	flexDirection: 'column',
	height: '100%'
},

'flex--column__flex-item': {
	paddingLeft: 0,
	minHeight: '-webkit-min-content'
},



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

...(()=>{
	const growObj = {};
	for(let factor of flexGrowFactors){
		growObj[`flex-item--${factor}`] = { flex: factor };
	}
	return growObj;
})(),


'flex-item--shrink': {
	flex: 0,
	minWidth: '-webkit-min-content'
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
},

'flex--wrap': {
	flexWrap: 'wrap'
},

'flex--columnReverse': {
	flexDirection: 'column-reverse'
},

'flex--rowReverse': {
	flexDirection: 'row-reverse'
},

/*
'flex--rowReverse__flex-item--firstChild': {
	paddingLeft: space
},

'flex--rowReverse__flex-item--lastChild': {
	paddingLeft: space
},
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

...(()=>{
	const justifyObj = {};
	for( let jName in flexJustifyMap){
		justifyObj[`flex--${jName}`] = { flexContent: flexJustifyMap[jName] };
	}
	return justifyObj;
})(),



/*
Alignment variants are also available using `align-items` (see also: <a class="link" target="_blank" href="https://css-tricks.com/almanac/properties/a/align-items/">css tricks flexbox demo</a>)

Class                   | Variants
----------------------- | -------------------------------
`flex--alignTop`        | aligns content to `flex-start`
`flex--alignBottom`     | aligns content to `flex-end`
`flex--alignCenter`     | aligns content to `center`
*/

...(()=>{
	const alignObj = {};
	for( let aName in flexAlignMap){
		alignObj[`flex--align${capitalize(aName)}`] = { flexContent: flexAlignMap[aName] };
	}
	return alignObj;
})(),


});

export default styles;