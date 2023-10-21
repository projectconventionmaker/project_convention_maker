import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import styles from './Overview.module.scss';
import { useState } from 'react';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';

const PROJECT_INITIAL_DATA = {
  project_name: '프로젝트 이름',
  team_name: '팀 이름',
  project_duration: '프로젝트 기간',
  summary: '프로젝트 한 줄 소개',
  detail: '프로젝트 소개',
  teammate: [
    { id: nanoid(), name: '이름', position: '포지션', github: '깃허브' },
  ],
};

const Overview = () => {
  const [body, setBody] = useState(PROJECT_INITIAL_DATA);

  const handleSubmit = () => {
    const requestData = JSON.stringify(body);
    const apiUrl = '#';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestData,
    }).then(response => response.json());
  };

  const addTeammate = () => {
    const newTeammate = {
      id: nanoid(),
      name: '이름',
      position: '포지션',
      github: '깃허브',
    };
    const updateTeammate = [...body.teammate, newTeammate];
    setBody({ ...body, teammate: updateTeammate });
  };

  const deleteTeammate = (uniqueKey: string) => {
    const array = body.teammate.slice();
    const deletedReslut = array.filter(mate => mate.id !== uniqueKey);
    setBody({ ...body, teammate: deletedReslut });
  };

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
        <Button size="large" variant="contained" onClick={addTeammate}>
          추가
        </Button>
      </div>
      {body.teammate.map(mate => {
        return (
          <div key={mate.id}>
            <TextField
              required
              id="outlined-required"
              placeholder="이름"
              onChange={e => {
                const updatedTeammate = body.teammate.map(t => {
                  if (t.id === mate.id) {
                    return { ...t, name: e.target.value };
                  }
                  return t;
                });
                setBody(prev => ({ ...prev, teammate: updatedTeammate }));
              }}
            />
            <TextField
              required
              id="outlined-required"
              placeholder="포지션"
              onChange={e => {
                const updatedTeammate = body.teammate.map(t => {
                  if (t.id === mate.id) {
                    return { ...t, position: e.target.value };
                  }
                  return t;
                });
                setBody(prev => ({ ...prev, teammate: updatedTeammate }));
              }}
            />
            <TextField
              required
              id="outlined-required"
              placeholder="깃허브"
              onChange={e => {
                const updatedTeammate = body.teammate.map(t => {
                  if (t.id === mate.id) {
                    return { ...t, github: e.target.value };
                  }
                  return t;
                });
                setBody(prev => ({ ...prev, teammate: updatedTeammate }));
              }}
            />
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                deleteTeammate(mate.id);
              }}
            >
              삭제
            </Button>
          </div>
        );
      })}
      <div>
        <div className={styles.boxTitle}>프로젝트 상세</div>
        <TextField
          id="standard-basic"
          label="프로젝트 상세 설명을 입력하세요."
          variant="standard"
          onChange={e => {
            setBody(prev => ({ ...prev, detail: e.target.value }));
          }}
        />
      </div>
    </form>
  );
};

export default Overview;
