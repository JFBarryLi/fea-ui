import React from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import Light from './Light';
import CameraControls from './CameraControls';

const CoreContainer = styled.div`
  display: block;
  width: 100%;
  height: calc(100% - 50px);
  margin: auto;
`;

const ThreeCore = (props) => (
  // https://github.com/pmndrs/react-three-fiber/issues/43
  <ReactReduxContext.Consumer>
    {({ store }) => (
      <CoreContainer>
        <Canvas>
          <Provider store={store}>
            <Light />
            <CameraControls />
            {props.children}
          </Provider>
        </Canvas>
      </CoreContainer>
    )}
  </ReactReduxContext.Consumer>
);

export default ThreeCore;
