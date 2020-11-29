import React from 'react';
import { useState } from 'react'

const Node = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      position={props.position}
      name={props.name}
      index={props.index}
    >
      <sphereBufferGeometry attach='geometry' />
      <meshLambertMaterial
        attach='material'
        color={hovered ? '#005082' : '#ffffff'}
      />
    </mesh>
  );
}

export default Node;
