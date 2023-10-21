import { Button } from '@mui/material';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.container}>
      <div>Project Convention Maker</div>
      <Button size="large" variant="contained">
        저장
      </Button>
    </header>
  );
};

export default Header;
