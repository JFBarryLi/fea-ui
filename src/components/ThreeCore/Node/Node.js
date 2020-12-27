import React from 'react';
import { useState } from 'react';

const Node = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const handleOnClick = (event) => {
    setActive(!active);
    console.log(props.name);
  }

  return (
    <mesh
      onClick={handleOnClick}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      position={props.position}
      name={props.name}
      index={props.index}
    >
      <sphereBufferGeometry
        attach='geometry'
        args={[20, 20, 20]}
      />
      <meshLambertMaterial
        attach='material'
        color={hovered ? '#005082': '#000839'}
      />
    </mesh>
  );
}

export default Node;
