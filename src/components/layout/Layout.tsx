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
            {isMobile && (
              <ButtonBase
                onClick={() => {
                  setSideBarState(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="url(#gradient)"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="-13.2%"
                        style={{
                          stopColor: 'rgb(127, 135, 224)',
                          stopOpacity: 1,
                        }}
                      />
                      <stop
                        offset="-13.19%"
                        style={{
                          stopColor: 'rgb(38, 73, 202)',
                          stopOpacity: 1,
                        }}
                      />
                      <stop
                        offset="46.63%"
                        style={{
                          stopColor: 'rgb(106, 118, 223)',
                          stopOpacity: 1,
                        }}
                      />
                      <stop
                        offset="107.09%"
                        style={{
                          stopColor: 'rgb(50, 176, 247)',
                          stopOpacity: 1,
                        }}
                      />
                    </linearGradient>
                  </defs>
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </ButtonBase>
            )}
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
            }}
            borderRadius={2}
          >
            <Box
              sx={{
                maxWidth: '1000px',
                minHeight: 'calc(100vh - 24px - 40px - 80px - 40px)',
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
      <Logout isOpen={isLogoutModalOpen} setIsOpen={setIsLogoutModalOpen} />
    </>
  );
};

export default Layout;
