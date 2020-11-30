import React from 'react';
import Tube from '../Tube';
import { useSelector } from 'react-redux';
import { selectNodes } from 'slices/trussSlice';
import { selectElements } from 'slices/trussSlice';

const TubeGroup = (props) => {
  const elements = useSelector(selectElements);
  const nodalCoords = useSelector(selectNodes);
  const tubes = [];

  for (const ele in elements) {
    const nodeI = nodalCoords[elements[ele].i];
    const nodeJ = nodalCoords[elements[ele].j];
    tubes.push(
      <Tube
        nodeI={nodeI}
        nodeJ={nodeJ}
        name={ele}
        index={elements[ele].index}
        key={ele}
      />
    );
  }

  return (
    <>
      {tubes}
    </>
  );
}

export default TubeGroup;
