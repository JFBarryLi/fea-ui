import React from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import Light from './Light';
import Node from './Node';
import CameraControls from './CameraControls';

const CoreContainer = styled.div`
  display: block;
  width: 100%;
  height: calc(100% - 50px);
  margin: auto;
`;

const ThreeCore = (props) => (
  <CoreContainer>
    <Canvas>
      <Light />
      <CameraControls />
      {props.children}
    </Canvas>
  </CoreContainer>
);

export default ThreeCore;
