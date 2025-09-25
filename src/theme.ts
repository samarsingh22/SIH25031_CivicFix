import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0061ff',
      light: '#4285ff',
      dark: '#0052cc',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#1e1919',
      light: '#4a4a4a',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f7f5f2',
      paper: '#ffffff'
    },
    text: {
      primary: '#1e1919',
      secondary: '#637282'
    },
    success: {
      main: '#00d084',
      light: '#4ddb9a',
      dark: '#00a366'
    },
    warning: {
      main: '#ff6600',
      light: '#ff8533',
      dark: '#cc5200'
    },
    error: {
      main: '#ff5630',
      light: '#ff7859',
      dark: '#cc4526'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },
    divider: '#e7e5e4'
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: 'clamp(40px, 5vw, 64px)',
      fontWeight: 800,
      lineHeight: 1.1
    },
    h2: {
      fontSize: '48px',
      fontWeight: 800,
      lineHeight: 1.2
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5
    },
    subtitle1: {
      fontSize: '20px',
      lineHeight: 1.5
    },
    button: {
      fontWeight: 600,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.1)',
    '0 4px 8px rgba(0, 0, 0, 0.1)',
    '0 8px 16px rgba(0, 0, 0, 0.1)',
    '0 8px 24px rgba(0, 0, 0, 0.08)',
    '0 8px 24px rgba(0, 0, 0, 0.15)',
    '0 12px 32px rgba(0, 0, 0, 0.1)',
    '0 16px 40px rgba(0, 0, 0, 0.12)',
    '0 24px 48px rgba(0, 0, 0, 0.1)',
    '0 32px 64px rgba(0, 0, 0, 0.12)',
    '0 40px 80px rgba(0, 0, 0, 0.15)',
    '0 48px 96px rgba(0, 0, 0, 0.18)',
    '0 56px 112px rgba(0, 0, 0, 0.2)',
    '0 64px 128px rgba(0, 0, 0, 0.22)',
    '0 72px 144px rgba(0, 0, 0, 0.24)',
    '0 80px 160px rgba(0, 0, 0, 0.26)',
    '0 88px 176px rgba(0, 0, 0, 0.28)',
    '0 96px 192px rgba(0, 0, 0, 0.3)',
    '0 104px 208px rgba(0, 0, 0, 0.32)',
    '0 112px 224px rgba(0, 0, 0, 0.34)',
    '0 120px 240px rgba(0, 0, 0, 0.36)',
    '0 128px 256px rgba(0, 0, 0, 0.38)',
    '0 136px 272px rgba(0, 0, 0, 0.4)',
    '0 144px 288px rgba(0, 0, 0, 0.42)',
    '0 152px 304px rgba(0, 0, 0, 0.44)'
  ]
});

export default theme;