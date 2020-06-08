import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Params from 'components/Params';

const InteractGroup = styled.div`
  text-align: center;
`;

const Interact = () => (
  <InteractGroup>
    <Button variant='contained' color='primary'>Try</Button>
    <Params />
  </InteractGroup>
);

export default Interact;
