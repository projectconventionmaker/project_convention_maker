import { useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, Box, Link } from '@mui/material';
// import styles from './Nav.module.scss';

const NAVLIST = [
  { to: '/overview', name: '프로젝트 개요' },
  { to: '/stack', name: '기술 스택' },
  { to: '/groundrule', name: '그라운드 롤' },
  { to: '/commit', name: '커밋 컨벤선' },
  { to: '/code', name: '코드 컨벤선' },
  { to: '/result', name: '결과 보기' },
];

const Nav = () => {
  const location = useLocation();
  return (
    <Box component="nav">
      <Box>프로젝트명</Box>
      <List>
        {NAVLIST.map(item => (
          <ListItem
            key={item.to}
            divider
            sx={{
              backgroundColor:
                location.pathname === item.to ? '#666' : 'transparent',
            }}
          >
            <Link href={item.to} underline="none" color="black">
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Nav;
