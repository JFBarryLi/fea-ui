import React from 'react';
import PointLoad from '../PointLoad';
import { useSelector } from 'react-redux';
import { selectNodes } from 'slices/nodes';
import { selectLoads } from 'slices/loads';

const PointLoadGroup = (props) => {
  const nodalCoords = useSelector(selectNodes);
  const loads = useSelector(selectLoads);
  const pointLoads = [];

  for (const l in loads) {
    const node = nodalCoords.find(obj => obj.id === loads[l].node);
    const origin = {
      'x': node.x,
      'y': node.y,
      'z': node.z
    };
    const dir = {
      'u1': loads[l].u1,
      'u2': loads[l].u2,
      'u3': loads[l].u3
    };
    console.log(nodalCoords);
    pointLoads.push(
      <PointLoad
        origin={origin}
        dir={dir}
        name={loads[l].node}
        key={loads[l].node}
      />
    );
  }

  return (
    <>
      {pointLoads}
    </>
  );
}

export default PointLoadGroup;
