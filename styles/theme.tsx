import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4ac6ff',
      dark: '#1890ff',
      light: '#48dae5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#623cf8',
      light: '#8a72f9',
    },
    info: {
      main: '#d3d3d3',
      dark: '#b7b7b7',
      contrastText: '#888888',
      light: '#e4e4e4',
    },
    warning: {
      main: '#fa8c16',
      light: '#fba344',
      dark: '#af620f',
      contrastText: '#ffffff',
    },
    success: {
      main: '#11d900',
      light: '#40e033',
      dark: '#0b9700',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#606060',
      disabled: '#939393',
    },
  },
  typography: {
    h1: {
      fontWeight: 'bold',
      wordBreak: 'keep-all',
    },
    h2: {
      fontWeight: 'bold',
      wordBreak: 'keep-all',
    },
    h3: {
      fontWeight: 'bold',
      wordBreak: 'keep-all',
    },
    h4: {
      fontWeight: 'bold',
      wordBreak: 'keep-all',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 'bold',
      wordBreak: 'keep-all',
    },
    h6: {
      fontSize: '20px',
      fontWeight: 'bold',
      wordBreak: 'keep-all',
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 'bold',
      wordBreak: 'keep-all',
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: '400',
      wordBreak: 'keep-all',
    },
    body1: {
      fontSize: 14,
      fontWeight: '400',
      wordBreak: 'keep-all',
    },
    body2: {
      fontSize: 16,
      wordBreak: 'keep-all',
    },
    button: {
      wordBreak: 'keep-all',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      wordBreak: 'keep-all',
    },
    overline: {
      fontSize: 10,
      fontWeight: '100',
      letterSpacing: '1',
      wordBreak: 'keep-all',
    },
  },
});
