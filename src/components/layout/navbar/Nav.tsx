import { useLocation } from 'react-router-dom';
import { List, ListItem, Box, Link, Card } from '@mui/material';
// import styles from './Nav.module.scss';

import Group from '@mui/icons-material/Group';
import Code from '@mui/icons-material/Code';
import SettingsSuggest from '@mui/icons-material/SettingsSuggest';
import MarkUnreadChatAlt from '@mui/icons-material/MarkUnreadChatAlt';
import Assignment from '@mui/icons-material/Assignment';
import Flag from '@mui/icons-material/Flag';

const NAVLIST = [
  { to: '/overview', name: '프로젝트 개요', icon: <Assignment /> },
  { to: '/stack', name: '기술 스택', icon: <SettingsSuggest /> },
  { to: '/groundrule', name: '그라운드 룰', icon: <Group /> },
  { to: '/commit', name: '커밋 컨벤션', icon: <MarkUnreadChatAlt /> },
  { to: '/code', name: '코드 컨벤션', icon: <Code /> },
  { to: '/result', name: '결과 보기', icon: <Flag /> },
];

const Nav = () => {
  const projectName = localStorage.getItem('project_name');

  const location = useLocation();
  return (
    <Box component="nav">
      <Box p={1}>
        <Card variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
          {projectName || '프로젝트명'}
        </Card>
      </Box>
      <List>
        {NAVLIST.map(item => (
          <ListItem
            key={item.to}
            divider
            sx={{
              padding: 0,
              backgroundColor:
                location.pathname === item.to ? 'primary.main' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(127, 135, 224, 0.238)',
              },
            }}
          >
            <Link
              href={item.to}
              underline="none"
              color="black"
              sx={{
                padding: 2,
                flexGrow: 1,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
            >
              {item.icon}
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Nav;
