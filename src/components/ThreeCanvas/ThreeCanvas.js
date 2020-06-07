import React from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber'

const CanvasContainer = styled.div`
  display: block;
  width: 80%;
  height: 500px;
  margin: auto;
`;

const ThreeCanvas = () => (
  <CanvasContainer>
    <Canvas>
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereBufferGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color="hotpink" />
      </mesh>
    </Canvas>
  </CanvasContainer>
);

export default ThreeCanvas;
