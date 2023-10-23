import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import SaveButton from '../components/Button';
import { FormEvent } from 'react';
import { Grid, Typography, FormControl, Box, Divider } from '@mui/material';


interface Teammate {
  id: string;
  name: string;
  position: string;
  link: string;
}

interface SavedData {
  detail: string | undefined;
  introduction: string | undefined;
  // project_start: any;
  // project_end: any;
  project_name: string | undefined;
  team_name: string | undefined;
  teammates: Teammate[] | [];
}

const OverviewPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [savedData, setSavedData] = useState<SavedData>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestData = JSON.stringify({
      ...savedData,
      project_start: [2023, 10, 13],
      project_end: [2023, 12, 19],
    });

    const apiUrl = `https://api.pcmk.dppr.me/api/v1/projects/${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestData,
      });

      if (response.ok) {
        navigate('/stack');
      }
    } catch {}
  };

  // const dateInputFormating = (dateArray: any) => {
  //   if (!dateArray) return new Date();
  //   const dateObject = new Date(dateArray.join('-'));
  //   return dateObject;
  // };

  // const dateInputFormating = (dateArray: any) => {
  //   if (!dateArray) return new Date();
  //   const dateObject = new Date(dateArray.join('-'));
  //   return dateObject;
  // };

  const addTeammate = () => {
    const newTeammate = {
      id: nanoid(),
      name: '',
      position: '',
      link: '',
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

  // const handleStartDateChange = newDate => {
  //   if (newDate !== null) {
  //     setSavedData({
  //       ...savedData,
  //       project_start: [
  //         newDate.getFullYear(),
  //         newDate.getMonth(),
  //         newDate.getDate(),
  //       ],
  //     });
  //   } else {
  //     const today = new Date();
  //     setSavedData({
  //       ...savedData,
  //       project_start: [
  //         today.getFullYear(),
  //         today.getMonth(),
  //         today.getDate(),
  //       ],
  //     });
  //   }
  // };
  

  useEffect(() => {
    const getIdAndData = async () => {
      const uuid = localStorage.getItem('project_name');
      if (!uuid) return;
      setId(uuid);
      const data = await fetch(
        `https://api.pcmk.dppr.me/api/v1/projects/${uuid}`,
      );
      const wholeData = await data.json();
      const { project_uuid, ...projectDetailWithoutUuid } =
        wholeData.project_detail;
      setSavedData(projectDetailWithoutUuid);
    };
    getIdAndData();
  }, []);

  return (
    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
      <Grid
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        container
        spacing={2}
      >
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
                alt="Love Letter"
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
            어떤 프로젝트를 기획하고 계신가요? 전반적인 개요를 작성하여
            프로젝트의 큰 그림을 그려봅시다.
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
      </Grid>

      <Grid display="flex" flexDirection="column">
        <Grid>
          <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
            프로젝트 개요
          </Typography>
        </Grid>

        <Grid spacing={2} container marginBottom={2}>
          <Grid item sm={4}>
            <TextField
              required
              fullWidth
              value={savedData?.project_name || ''}
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
          <Grid item sm={4}>
            <TextField
              required
              fullWidth
              value={savedData?.team_name || ''}
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

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            value={savedData?.introduction ? savedData?.introduction : ''}
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

      {/* <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
        프로젝트 기간
      </Typography> */}

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid spacing={2} container marginBottom={2} display="flex">
          <Grid item xs={3}>
            <DatePicker
              label="프로젝트 시작"
              sx={{ flexGrow: 1 }}
              onChange={handleStartDateChange}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker label="프로젝트 종료" sx={{ flexGrow: 1 }} />
          </Grid>
        </Grid>
      </LocalizationProvider> */}

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
          <Grid key={mate.id} container alignItems="center" marginBottom={2}>
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
                defaultValue={mate.link}
                placeholder="깃허브"
                fullWidth
                onChange={e => {
                  const updatedTeammate = savedData?.teammates?.map(t => {
                    if (t.id === mate.id) {
                      return { ...t, link: e.target.value };
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
      <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
        프로젝트 상세 소개
      </Typography>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          id="standard-basic"
          placeholder="프로젝트의 상세 소개를 작성해 주세요"
          value={savedData?.detail ? savedData.detail : ''}
          onChange={e => {
            setSavedData(
              prev => ({ ...prev, detail: e.target.value } as SavedData),
            );
          }}
        />
      </Grid>
    </FormControl>
  );
};

export default OverviewPage;
