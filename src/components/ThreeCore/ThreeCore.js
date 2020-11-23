import React from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import Light from './Light';

const CoreContainer = styled.div`
  display: block;
  width: 100%;
  height: calc(100% - 50px);
  margin: auto;
`;

const Sphere = () => (
  <mesh>
    <sphereBufferGeometry attach='geometry' />
    <meshStandardMaterial attach='material' color='hotpink' />
  </mesh>
);

const ThreeCore = () => (
  <CoreContainer>
    <Canvas>
      <Light />
      <Sphere />
    </Canvas>
  </CoreContainer>
);

export default ThreeCore;
