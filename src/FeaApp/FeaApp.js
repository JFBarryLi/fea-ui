import React from 'react';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { NavBar, ThreeCanvas, Interact } from 'components';

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
        margin: "1em",
      }
    }
  }
});

const FeaApp = () => (
  <div>
    <ThemeProvider theme={theme}>
      <NavBar />
      <ThreeCanvas />
      <Interact />
    </ThemeProvider>
  </div>
);

export default FeaApp;
