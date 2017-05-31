import React from 'react';
import { render, Artboard } from 'react-sketchapp';
import Catalog from './Catalog';

const Document = () => (
  <Artboard
    name="stuff"
    style={{
      width: 400,
    }}
  >
  	<Catalog />
  </Artboard>
);

export default (context) => {
  render(<Artboard><Document /></Artboard>, context.document.currentPage());
}