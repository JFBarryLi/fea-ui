import React from 'react';
import { useState } from 'react';
import { Vector3 } from 'three';

const PointLoad = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const handleOnClick = (event) => {
    setActive(!active);
  }

  const dir = new Vector3(props.dir.u1, props.dir.u2, props.dir.u3);
  dir.normalize();

  const origin = new Vector3(props.origin.x, props.origin.y, props.origin.z);
  const length = 50;
  const hex = '#000839';

  return (
    <mesh
      onClick={handleOnClick}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      name={props.name}
      index={props.index}
    >
      <arrowHelper
        args={[dir, origin, length, hex]}
      />
    </mesh>
  );
}

export default PointLoad;
