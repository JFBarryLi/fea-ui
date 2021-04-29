import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hoveredObjectUpdated } from 'slices/hoveredObject';

const PointLoad = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const handleOnClick = (event) => {
    setActive(!active);
  }

  const handleOnHover = (event) => {
    setHover(true);
    const obj = {name: props.name, content: props.load.u1 + ', ' + props.load.u2 + ', ' + props.load.u3};
    dispatch(hoveredObjectUpdated(obj));
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
      onPointerOver={handleOnHover}
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
