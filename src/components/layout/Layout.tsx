import { ReactNode } from 'react';
import Nav from './navbar/Nav';
import Header from './header/Header';
import { Box } from '@mui/material';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Nav />
      <Header />
      <Box p={4} bgcolor={'white'} borderRadius={4} margin={4}>
        {children}
      </Box>
    </main>
  );
};

export default Layout;
