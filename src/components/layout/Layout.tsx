import { ReactNode, useState } from 'react';

import {
  AppBar,
  Box,
  ButtonBase,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sideBarState, setSideBarState] = useState(false);

  const toggleDrawer =
    (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setSideBarState(state);
    };

  return (
    <main>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme =>
              sideBarState ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <ButtonBase
              sx={{
                display: isMobile ? 'block' : 'none',
              }}
              onClick={() => {
                setSideBarState(true);
              }}
            >
              <MenuIcon />
            </ButtonBase>
            <Typography variant="h6" noWrap component="h1">
              Clipped drawer
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          anchor={isMobile ? 'left' : undefined}
          open={sideBarState}
          onClose={toggleDrawer(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: isMobile ? (sideBarState ? 'block' : 'none') : 'block',
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>사이드바</Box>
        </Drawer>

        <Box width="100%" bgcolor={'white'} sx={{ padding: '52px 44px' }}>
          {children}
        </Box>
      </Box>
    </main>
  );
};

export default Layout;
