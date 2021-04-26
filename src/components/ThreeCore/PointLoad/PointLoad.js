import React from 'react';
import { useState } from 'react';

const PointLoad = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const handleOnClick = (event) => {
    setActive(!active);
  }

  const dir = props.dir;
  dir.normalize();
  const origin = props.origin;
  const hex = hovered ? '#00A8CC':'#000839';

  const minLength = 30;
  const maxLength = 70;
  const length = props.relativeMag * (maxLength - minLength) + minLength;

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
