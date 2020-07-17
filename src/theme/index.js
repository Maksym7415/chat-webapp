import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

let theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#feffff',
        color: '#758095',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      label: {
        color: '#fff'
      }
    },
    MuiTypography: {
      root: {
        color: '#64c8bc'
      }
    }
  },
  palette: {
    primary: {
      main: '#64c8bc',
    },
    secondary: {
      main: '#feffff',
    },
  },
});
theme = responsiveFontSizes(theme);

function Theme(props) {
  return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
  );
}

export default Theme;
