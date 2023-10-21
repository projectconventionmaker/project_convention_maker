import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import styles from './Overview.module.scss';
import { useState } from 'react';
import { Button } from '@mui/material';

const PROJECT_INITIAL_DATA = {
  project_name: '프로젝트 이름',
  team_name: '팀 이름',
  project_duration: '프로젝트 기간',
  summary: '프로젝트 한 줄 소개',
  detail: '프로젝트 소개',
  teammate: [{ name: '이름', position: '포지션', github: '깃허브' }],
};

const Overview = () => {
  const [body, setBody] = useState(PROJECT_INITIAL_DATA);

  return (
    <form className={styles.container}>
      <div className={styles.boxWrapper}>
        <div className={styles.boxTitle}>프로젝트 개요</div>
        <div>
          <TextField
            required
            id="outlined-required"
            placeholder={PROJECT_INITIAL_DATA.project_name}
            onChange={e => {
              setBody(prev => ({ ...prev, project_name: e.target.value }));
            }}
          />
          <TextField
            required
            id="outlined-required"
            placeholder={PROJECT_INITIAL_DATA.team_name}
            onChange={e => {
              setBody(prev => ({ ...prev, team_name: e.target.value }));
            }}
          />
        </div>
        <TextField
          required
          id="outlined-required"
          placeholder={PROJECT_INITIAL_DATA.project_duration}
          onChange={e => {
            setBody(prev => ({ ...prev, project_duration: e.target.value }));
          }}
        />
      </div>
      <div>
        <div className={styles.boxTitle}>프로젝트 팀원</div>
        <Button size="large" variant="contained">
          추가
        </Button>
        <Button size="large" variant="contained">
          삭제
        </Button>
        {PROJECT_INITIAL_DATA.teammate.map(mate => {
          return (
            <>
              {' '}
              <div>
                <TextField required id="outlined-required" placeholder="이름" />
                <TextField
                  required
                  id="outlined-required"
                  placeholder="포지션"
                />
                <TextField
                  required
                  id="outlined-required"
                  placeholder="깃허브"
                />
              </div>
              ;
            </>
          );
        })}
      </div>
      ;
      <div>
        <div className={styles.boxTitle}>프로젝트 상세</div>
        <TextField
          id="standard-basic"
          label="프로젝트 상세 설명을 입력하세요."
          variant="standard"
        />
      </div>
    </form>
  );
};

export default Overview;
