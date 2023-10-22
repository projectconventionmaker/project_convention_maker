import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Divider,
} from '@mui/material';
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Crystal%20Ball.png"
                alt="Crystal Ball"
                width="60"
                height="60"
              />
              <Typography variant="h2">프로젝트 개요</Typography>
            </Box>
            <SaveButton />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            진행할 프로젝트에 대한 정보를 입력하세요.
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            placeholder="프로젝트 이름"
            onChange={e => {
              setBody(prev => ({ ...prev, project_name: e.target.value }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            placeholder="팀 명"
            onChange={e => {
              setBody(prev => ({ ...prev, team_name: e.target.value }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            placeholder="프로젝트 개요"
            onChange={e => {
              setBody(prev => ({ ...prev, summary: e.target.value }));
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <DatePicker
                label="프로젝트 시작"
                value={body.project_start}
                onChange={date => {
                  setBody(prev => ({ ...prev, project_start: date }));
                }}
                sx={{ flexGrow: 1 }}
              />
              <DatePicker
                label="프로젝트 종료"
                value={body.project_end}
                onChange={date => {
                  setBody(prev => ({ ...prev, project_end: date }));
                }}
                sx={{ flexGrow: 1 }}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="standard-basic"
            label="프로젝트 상세 설명을 입력하세요."
            onChange={e => {
              setBody(prev => ({ ...prev, detail: e.target.value }));
            }}
          />
        </Grid>

        <div>
          <div>프로젝트 팀원</div>
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
      </Grid>
    </form>
  );
};

export default Overview;
