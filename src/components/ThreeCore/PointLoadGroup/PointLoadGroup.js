import React from 'react';
import { Vector3 } from 'three';
import PointLoad from '../PointLoad';
import { useSelector } from 'react-redux';
import { selectNodes } from 'slices/nodes';
import { selectLoads } from 'slices/loads';

const PointLoadGroup = (props) => {
  const nodalCoords = useSelector(selectNodes);
  const loads = useSelector(selectLoads);
  const pointLoads = [];

  const maxLoad = Math.max(...loads.map(o => {
    const loadVector = new Vector3(o.u1, o.u2, o.u3);
    const loadMag = loadVector.length();
    return loadMag;
  }));
  const minLoad = Math.min(...loads.map(o => {
    const loadVector = new Vector3(o.u1, o.u2, o.u3);
    const loadMag = loadVector.length();
    return loadMag;
  }));

  for (const l in loads) {
    const node = nodalCoords.find(obj => obj.id === loads[l].node);
    const origin = new Vector3(node.x, node.y, node.z);
    const load = new Vector3(loads[l].u1, loads[l].u2, loads[l].u3);
    const relativeMag = (load.length() - minLoad) / (maxLoad - minLoad);

    pointLoads.push(
      <PointLoad
        origin={origin}
        dir={load}
        relativeMag={relativeMag}
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
