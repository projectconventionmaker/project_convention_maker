import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Layout from './components/layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 24,
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
