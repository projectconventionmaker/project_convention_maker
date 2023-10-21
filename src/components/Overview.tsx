import TextField from '@mui/material/TextField';
import styles from './Overview.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import SaveButton from './Button';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Teammate {
  id: string;
  name: string;
  position: string;
  github: string;
}

interface OverviewData {
  project_name: string;
  team_name: string;
  project_start: Dayjs | null;
  project_end: Dayjs | null;
  summary: string;
  detail: string;
  teammate: Teammate[];
}

const Overview = () => {
  const [body, setBody] = useState<OverviewData>({
    project_name: '',
    team_name: '',
    project_start: null,
    project_end: null,
    summary: '',
    detail: '',
    teammate: [],
  });

  const handleSubmit = () => {
    const requestData = JSON.stringify(body);
    const apiUrl =
      'https://api.pcmk.dppr.me/api/v1/projects/e1555f7b-8113-4224-a082-1503c43de5ab';
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

  useEffect(() => {
    // const getOverview = async () => {
    //   const json = await (await fetch('#')).json();
    //   setBody(json);
    // };
    // getOverview();
  }, []);

  return (
    <form className={styles.container}>
      <SaveButton onClick={handleSubmit} />
      <div className={styles.boxWrapper}>
        <div className={styles.boxTitle}>프로젝트 개요</div>
        <div>
          <TextField
            required
            id="outlined-required"
            placeholder="프로젝트 이름"
            onChange={e => {
              setBody(prev => ({ ...prev, project_name: e.target.value }));
            }}
          />
          <TextField
            required
            id="outlined-required"
            placeholder="팀 명"
            onChange={e => {
              setBody(prev => ({ ...prev, team_name: e.target.value }));
            }}
          />
        </div>
        <TextField
          required
          id="outlined-required"
          placeholder="프로젝트 개요"
          onChange={e => {
            setBody(prev => ({ ...prev, summary: e.target.value }));
          }}
        />
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="프로젝트 시작"
            value={body.project_start}
            onChange={date => {
              setBody(prev => ({ ...prev, project_start: date }));
            }}
          />
          <DatePicker
            label="프로젝트 종료"
            value={body.project_end}
            onChange={date => {
              setBody(prev => ({ ...prev, project_end: date }));
            }}
          />
        </LocalizationProvider>
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
