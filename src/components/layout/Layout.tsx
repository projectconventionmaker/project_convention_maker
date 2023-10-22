import { ReactNode, useState } from 'react';
import Nav from './navbar/Nav';
import {
  AppBar,
  Box,
  ButtonBase,
  Drawer,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Logout from '../Logout';

const drawerWidth = 240;

const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sideBarState, setSideBarState] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: 'white',
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
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h1">프로젝트 컨벤션 메이커</Typography>
              <Button
                size="large"
                variant="contained"
                sx={{
                  background:
                    'linear-gradient(101.83deg, rgb(127, 135, 224) -13.2%, rgb(38, 73, 202) -13.19%, rgb(106, 118, 223) 46.63%, rgb(50, 176, 247) 107.09%)',
                }}
                onClick={() => setIsLogoutModalOpen(true)}
              >
                프로젝트 변경
              </Button>
            </Box>
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
          <Box sx={{ overflow: 'auto' }}>
            <Nav />
          </Box>
        </Drawer>
        <Box width="100%" sx={{ marginTop: '64px' }}>
          <Box
            bgcolor={'white'}
            sx={{
              margin: '20px',
              padding: '40px',
              minHeight: '100vh',
            }}
            borderRadius={2}
          >
            <Box sx={{ maxWidth: '1000px' }}> {children}</Box>
          </Box>
        </Box>
      </Box>
      <Logout isOpen={isLogoutModalOpen} setIsOpen={setIsLogoutModalOpen} />
    </>
  );
};

export default Layout;
