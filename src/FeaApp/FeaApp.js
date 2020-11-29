import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
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
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <TrussPage />
    </ThemeProvider>
  </Provider>
);

export default FeaApp;
