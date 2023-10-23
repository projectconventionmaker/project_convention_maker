import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import SaveButton from '../components/Button';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography, FormControl, Box, Divider } from '@mui/material';
import useIsLogin from '../hooks/useIsLogin';

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

const OverviewPage = () => {
  useIsLogin();

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
    const getOverview = async () => {
      const projectDetail = localStorage.getItem(data);
      if (projectDetail) {
        const parsedData = JSON.parse(projectDetail);
        setBody(parsedData);
      }
    };
    getOverview();
  }, []);

  return (
    <FormControl component="form" onSubmit={handleSubmit}>
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
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
                alt="Party Popper"
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
            프로젝트 개요
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
            placeholder="팀 이름"
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
            placeholder="프로젝트 한 줄 요약"
            onChange={e => {
              setBody(prev => ({ ...prev, summary: e.target.value }));
            }}
          />
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
      </Grid>
      <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
        프로젝트 기간
      </Typography>

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

      <Grid spacing={2} container alignItems="center" xs={6}>
        <Grid item>
          <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
            프로젝트 팀원
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button size="large" variant="contained" onClick={addTeammate}>
            추가
          </Button>
        </Grid>
      </Grid>
      {body.teammate.map(mate => {
        return (
          <Grid
            key={mate.id}
            container
            xs={7}
            alignItems="center"
            marginBottom={2}
          >
            <Grid item xs={3}>
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
            </Grid>
            <Grid item xs={3}>
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
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                placeholder="깃허브"
                fullWidth
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
            </Grid>
            <Grid item xs={2} style={{ marginLeft: 10 }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  deleteTeammate(mate.id);
                }}
              >
                삭제
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </FormControl>
  );
};

export default OverviewPage;
