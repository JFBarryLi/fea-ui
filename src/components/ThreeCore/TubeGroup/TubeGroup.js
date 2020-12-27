import React from 'react';
import Tube from '../Tube';
import { useSelector } from 'react-redux';
import { selectNodes } from 'slices/nodes';
import { selectElements } from 'slices/elements';
import { selectStress, selectMinMaxStress } from 'slices/stress';

import { interpolateViridis } from 'd3-scale-chromatic';
import { scaleSequential } from 'd3-scale';

const TubeGroup = (props) => {
  const elements = useSelector(selectElements);
  const nodalCoords = useSelector(selectNodes);
  const stresses = useSelector(selectStress);

  const { min, max } = useSelector(selectMinMaxStress);
  const anyStress = stresses.length > 0;

  const colorScale = scaleSequential(interpolateViridis)
    .domain([min, max]);

  const tubes = [];

  for (const ele in elements) {
    const nodeI = nodalCoords.find(node => node.id === elements[ele].i);
    const nodeJ = nodalCoords.find(node => node.id === elements[ele].j);
    let key = ele;
    for (let i in nodeI) {
      key += nodeI[i].toString() + nodeJ[i].toString();
    }
    const stress = stresses.find(s => s.ele === elements[ele].id);
    let color = '#FFA41B';
    if (anyStress) {
      color = colorScale(stress.vm);
    }
    tubes.push(
      <Tube
        nodeI={nodeI}
        nodeJ={nodeJ}
        name={elements[ele].id}
        key={key}
        color={color}
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
