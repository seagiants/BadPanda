import React from 'react';
import Cell from './Cell';
import uniqueId from 'lodash.uniqueid';

const height = 31;

const Row = ({ row }) => (
  <div style={{height:height}}>
    {
      row.map(cell => <Cell key={uniqueId()} cell={cell} />)
    }
  </div>
);

export default Row;
