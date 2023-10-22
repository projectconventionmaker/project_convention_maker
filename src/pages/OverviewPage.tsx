import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import SaveButton from '../components/Button';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography, FormControl } from '@mui/material';

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
    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
      <Grid
        spacing={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid>
          <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
            프로젝트 개요
          </Typography>
        </Grid>

        <Grid>
          <SaveButton />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={3}>
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
        <Grid item xs={3}>
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
      </Grid>
      <Grid container>
        <Grid item xs={5}>
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
      </Grid>

      <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
        프로젝트 기간
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid spacing={2} container xs={6} marginBottom={2}>
          <Grid item xs={3}>
            <DatePicker
              label="프로젝트 시작"
              value={body.project_start}
              onChange={date => {
                setBody(prev => ({ ...prev, project_start: date }));
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label="프로젝트 종료"
              value={body.project_end}
              onChange={date => {
                setBody(prev => ({ ...prev, project_end: date }));
              }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

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

      <Typography variant="h5" component="p" marginTop={2} marginBottom={2}>
        프로젝트 상세
      </Typography>
      <TextField
        id="standard-basic"
        multiline
        fullWidth
        label="프로젝트 상세 설명을 입력하세요."
        variant="standard"
        onChange={e => {
          setBody(prev => ({ ...prev, detail: e.target.value }));
        }}
      />
    </FormControl>
  );
};

export default OverviewPage;
