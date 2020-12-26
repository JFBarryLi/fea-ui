import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { SnackbarProvider } from 'notistack';
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
  typography: {
    h6: {
      fontSize: '0.9375rem',
      fontWeight: 500,
    }
  },
  overrides: {
    MuiButton: {
      root: {
        margin: "0.5em",
      }
    }
  },
});

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
}

const FeaApp = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        ref={notistackRef}
        action={(key) => (
            <IconButton
              aria-label='dismiss'
              onClick={onClickDismiss(key)}
            >
              <CloseIcon />
            </IconButton>
        )}
      >
        <TrussPage />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

export default FeaApp;
