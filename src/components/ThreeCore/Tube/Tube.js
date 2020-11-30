import React, { useMemo } from 'react';
import { useState } from 'react';
import { Curve, Vector3 } from 'three';

const Tube = (props) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const nodeI = {'x':0, 'y':0, 'z':0};
  const nodeJ = {'x':100, 'y': 0, 'z': 0};

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
  }, [])

  return (
    <mesh
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      position={props.position}
      name={props.name}
      index={props.index}
    >
      <tubeBufferGeometry
        attach='geometry'
        args={[path, 40, 5, 14, false]}
      />
      <meshBasicMaterial
        attach='material'
        color={hovered ? '#005082' : '#FFA41B'}
      />
    </mesh>
  );
}

export default Tube;
