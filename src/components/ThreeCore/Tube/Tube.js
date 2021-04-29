import React, { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Curve, Vector3 } from 'three';
import { hoveredObjectUpdated } from 'slices/hoveredObject';

const Tube = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();

  const nodeI = props.nodeI;
  const nodeJ = props.nodeJ;

  const handleOnClick = (event) => {
    setActive(!active);
    console.log(props.name);
  }

  const handleOnHover = (event) => {
    setHover(true);
    const obj = {name: props.name, content: 'i: ' + nodeI.id + ' j: ' + nodeJ.id};
    dispatch(hoveredObjectUpdated(obj));
  }

  const path = useMemo(() => {
    function StraightLine(scale) {
      Curve.call(this);

      this.scale = scale === undefined ? 1 : scale;
    }

    StraightLine.prototype = Object.create(Curve.prototype);
    StraightLine.prototype.constructor = StraightLine;

    StraightLine.prototype.getPoint = function (t) {
      const dx = nodeJ.x - nodeI.x;
      const dy = nodeJ.y - nodeI.y;
      const dz = nodeJ.z - nodeI.z;

      const tx = t*dx + nodeI.x;
      const ty = t*dy + nodeI.y;
      const tz = t*dz + nodeI.z;

      return new Vector3(tx, ty, tz).multiplyScalar(this.scale)
    }

    return new StraightLine()
  }, [nodeI, nodeJ])

  return (
    <mesh
      onClick={handleOnClick}
      onPointerOver={handleOnHover}
      onPointerOut={(event) => setHover(false)}
      name={props.name}
      index={props.index}
    >
      <tubeBufferGeometry
        attach='geometry'
        args={[path, 40, 5, 14, false]}
      />
      <meshBasicMaterial
        attach='material'
        color={hovered ? '#5a5a5a' : props.color}
      />
    </mesh>
  );
}

export default Tube;
