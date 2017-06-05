import React from 'react';
import Cell from './Cell';
import uniqueId from 'lodash.uniqueid';

const Row = ({ row }) => (
  <div>
    {
      row.map(cell => <Cell key={uniqueId()} cell={cell} />)
    }
  </div>
);

export default Row;
