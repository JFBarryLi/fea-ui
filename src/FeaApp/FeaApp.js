import React from 'react';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { NavBar, ThreeCore, Interact } from 'components';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#005082',
    },
    secondary: {
      main: '#ffa41b',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "0.5em",
      }
    }
  },
});

const FeaContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

const FeaApp = () => (
  <FeaContainer>
    <ThemeProvider theme={theme}>
      <NavBar />
      <ThreeCore />
    </ThemeProvider>
  </FeaContainer>
);

export default FeaApp;
