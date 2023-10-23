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

interface SavedData {
  detail: string | null | undefined;
  introduction: string | null;
  project_start: Dayjs | null;
  project_end: Dayjs | null;
  project_name: string;
  project_uuid: string;
  team_name: string | null;
  teammates: Teammate[] | null;
}

const OverviewPage = () => {
  const [id, setId] = useState<string>('');
  const [savedData, setSavedData] = useState<SavedData>();

  const handleSubmit = () => {
    const requestData = JSON.stringify(savedData);
    const apiUrl = `https://api.pcmk.dppr.me/api/v1/projects/${id}`;
    fetch(apiUrl, {
      method: 'PUT',
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

    const updateTeammate = savedData?.teammates
      ? [...savedData.teammates, newTeammate]
      : [newTeammate];
    setSavedData({ ...savedData, teammates: updateTeammate } as SavedData);
  };

  const deleteTeammate = (uniqueKey: string) => {
    const array = savedData?.teammates?.slice();
    const deletedResult = array?.filter(mate => mate.id !== uniqueKey);
    setSavedData({ ...savedData, teammates: deletedResult } as SavedData);
  };

  useEffect(() => {
    const getIdAndData = async () => {
      const uuid = localStorage.getItem('id');
      const response = await fetch(
        `https://api.pcmk.dppr.me/api/v1/projects/${uuid}`,
      );
      const wholeData = await response.json();
      if (!uuid) return;
      setId(uuid);
      setSavedData(wholeData.project_detail);
    };
    getIdAndData();
  }, []);

  return (
    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
      <Grid display="flex" justifyContent="space-between" alignItems="center">
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
            defaultValue={savedData?.project_name}
            id="outlined-required"
            placeholder="프로젝트 이름"
            onChange={e => {
              setSavedData(
                prev =>
                  ({ ...prev, project_name: e.target.value } as SavedData),
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            required
            fullWidth
            defaultValue={savedData?.team_name}
            id="outlined-required"
            placeholder="팀 이름"
            onChange={e => {
              setSavedData(
                prev => ({ ...prev, team_name: e.target.value } as SavedData),
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <TextField
            required
            fullWidth
            defaultValue={savedData?.introduction}
            id="outlined-required"
            placeholder="프로젝트 한 줄 요약"
            onChange={e => {
              setSavedData(
                prev =>
                  ({ ...prev, introduction: e.target.value } as SavedData),
              );
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
        프로젝트 기간
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid spacing={2} container marginBottom={2}>
          <Grid item xs={3}>
            <DatePicker
              label="프로젝트 시작"
              value={savedData?.project_start}
              defaultValue={savedData?.project_start}
              onChange={date => {
                setSavedData(
                  prev => ({ ...prev, project_start: date } as SavedData),
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label="프로젝트 종료"
              defaultValue={savedData?.project_end}
              value={savedData?.project_end}
              onChange={date => {
                setSavedData(
                  prev => ({ ...prev, project_end: date } as SavedData),
                );
              }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      <Grid spacing={2} container alignItems="center">
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
      {savedData?.teammates?.map(mate => {
        return (
          <Grid
            key={mate.id}
            container        
            alignItems="center"
            marginBottom={2}
          >
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                placeholder="이름"
                defaultValue={mate.name}
                onChange={e => {
                  const updatedTeammate = savedData?.teammates?.map(t => {
                    if (t.id === mate.id) {
                      return { ...t, name: e.target.value };
                    }
                    return t;
                  });
                  setSavedData(
                    prev =>
                      ({ ...prev, teammates: updatedTeammate } as SavedData),
                  );
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                placeholder="포지션"
                defaultValue={mate.position}
                onChange={e => {
                  const updatedTeammate = savedData?.teammates?.map(t => {
                    if (t.id === mate.id) {
                      return { ...t, position: e.target.value };
                    }
                    return t;
                  });
                  setSavedData(
                    prev =>
                      ({ ...prev, teammates: updatedTeammate } as SavedData),
                  );
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                defaultValue={mate.github}
                placeholder="깃허브"
                fullWidth
                onChange={e => {
                  const updatedTeammate = savedData?.teammates?.map(t => {
                    if (t.id === mate.id) {
                      return { ...t, github: e.target.value };
                    }
                    return t;
                  });
                  setSavedData(
                    prev =>
                      ({ ...prev, teammates: updatedTeammate } as SavedData),
                  );
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
        defaultValue={savedData?.detail}
        label="프로젝트 상세 설명을 입력하세요."
        variant="standard"
        onChange={e => {
          setSavedData(
            prev => ({ ...prev, detail: e.target.value } as SavedData),
          );
        }}
      />
    </FormControl>
  );
};

export default OverviewPage;
