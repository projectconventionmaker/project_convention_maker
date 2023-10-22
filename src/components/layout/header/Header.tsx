import { Button } from '@mui/material';
import styles from './Header.module.scss';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <div>Project Convention Maker</div>
        <Link to="">
          <Button
            size="large"
            variant="contained"
            sx={{
              fontSize: '1.6rem',
            }}
          >
            프로젝트 변경
          </Button>
        </Link>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
