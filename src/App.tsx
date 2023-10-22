import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Layout from './components/layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 400,
      color: 'rgb(106, 118, 223)',
    },
    h2: {
      fontSize: 24,
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
