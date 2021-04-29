import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hoveredObjectUpdated } from 'slices/hoveredObject';

const Node = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const handleOnClick = (event) => {
    setActive(!active);
    console.log(props.name);
  };

  const handleOnHover = (event) => {
    setHover(true);
    const obj = {name: props.name, content: props.position[0] + ', ' + props.position[1] + ', ' + props.position[2]};
    dispatch(hoveredObjectUpdated(obj));
  };

  return (
    <mesh
      onClick={handleOnClick}
      onPointerOver={handleOnHover}
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
        color={hovered ? '#5a5a5a': '#000839'}
      />
    </mesh>
  );
}

export default Node;
