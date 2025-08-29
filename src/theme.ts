import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Major color
    },
    warning: {
      main: '#ff9800',
      light: '#ffe7b3',
      contrastText: '#b26a00',
    },
    success: {
      main: '#388e3c',
      light: '#d6f5d6',
      contrastText: '#388e3c',
    },
    grey: {
      100: '#ededed',
      800: '#666',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: 0.2,
          borderRadius: 12,
          fontFamily: 'inherit',
          height: 22,
        },
        colorWarning: {
          backgroundColor: '#ffe7b3',
          color: '#b26a00',
        },
        colorSuccess: {
          backgroundColor: '#d6f5d6',
          color: '#388e3c',
        },
        colorDefault: {
          backgroundColor: '#ededed',
          color: '#666',
        },
      },
    },
  },
});

export default theme;
