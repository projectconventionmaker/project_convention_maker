import { useState } from 'react';
import { Button, AppBar, Box, Typography } from '@mui/material';
import Logout from '../../Logout';

const Header = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  return (
    <>
      <AppBar
        component="header"
        sx={{
          height: '64px',
          padding: '0 20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography variant="h1">프로젝트 컨벤션 메이커</Typography>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            프로젝트 변경
          </Button>
        </Box>
      </AppBar>
      <Logout isOpen={isLogoutModalOpen} setIsOpen={setIsLogoutModalOpen} />
    </>
  );
};

export default Header;
