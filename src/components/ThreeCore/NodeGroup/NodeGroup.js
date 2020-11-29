import React from 'react';
import Node from '../Node';
import { useSelector } from 'react-redux';
import { selectNodes } from 'slices/trussSlice';

const NodeGroup = (props) => {
  const nodalCoords = useSelector(selectNodes);
  console.log(useSelector(selectNodes));
  const nodes = [];

  for (const n in nodalCoords) {
    const position = [
      nodalCoords[n].x,
      nodalCoords[n].y,
      nodalCoords[n].z
    ];
    nodes.push(<Node position={position} />);
  }

  return (
    <>
      {nodes}
    </>
  );
}

export default NodeGroup;
