import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const ButtonsGroup = styled.div`
  text-align: center;
`;

const Interact = () => (
  <ButtonsGroup>
    <Button variant='contained' color='primary'>Try</Button>
    <Button variant='outlined' color='secondary'>Params</Button>
  </ButtonsGroup>
);

export default Interact;
