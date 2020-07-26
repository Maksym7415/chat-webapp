import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

let theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#feffff',
        color: '#64c8bc',
      },
    },
    MuiListItemIcon: {
      root: {
        color: '#64c8bc',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      label: {
        color: '#fff',
      },
    },
    MuiIconButton: {
      label: {
        width: '30px',
        height: '30px',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '30px',
        height: '30px',
      },
    },
    MuiTypography: {
      root: {
        color: '#0000007a',
      },
    },
    MuiBadge: {
      colorSecondary: {
        backgroundColor: '#ef2f8bf5',
        color: '#ffffff',
      },
    },
  },
  palette: {
    primary: {
      main: '#64c8bc',
    },
    secondary: {
      main: '#feffff',
    },
  },
  shape: {
    borderRadius: 6,
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
