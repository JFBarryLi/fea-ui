import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { TrussPage } from 'pages';

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

const FeaApp = () => (
  <ThemeProvider theme={theme}>
    <TrussPage />
  </ThemeProvider>
);

export default FeaApp;
