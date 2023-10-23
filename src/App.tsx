import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Layout from './components/layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif', 'Roboto'].join(','),
    h1: {
      fontSize: 24,
      fontWeight: 400,
      color: 'rgb(106, 118, 223)',
    },
    h2: {
      fontSize: 26,
      fontWeight: 500,
    },
    h4: {
      fontSize: 18,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 16,
      color: '#666666',
    },
  },
  palette: {
    primary: {
      main: 'rgb(127, 135, 224)',
    },
    error: { main: '#E08080', contrastText: 'white' },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: 18,
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
