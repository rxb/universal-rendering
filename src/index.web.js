import React from 'react';
import { render } from 'react-dom';
import { StyleSheet } from 'react-primitives';
import swatches from './styles/swatches';
import Catalog from './Catalog';

const Document = () => (
	<div>
		{/* weird web-specific styling stuff you can't set any other way */}
		<style dangerouslySetInnerHTML={{__html: `
			.input::-webkit-input-placeholder{
				color: ${swatches.textHint};
			}
			.input:focus{
				outline: blue solid 1px;
			}
		`}}></style>
		<Catalog />
	</div>
)

render(<Document />, document.getElementById('app'));