import TextField from '@mui/material/TextField';
import { useEffect, useReducer } from 'react';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import SaveButton from '../components/Button';
import { Grid, Typography, FormControl, Box, Divider } from '@mui/material';
import useIsLogin from '../hooks/useIsLogin';

const reducer = (overview, action) => {
  switch (action.type) {
    case 'set_data':
      return {
        ...overview,
        setData: action.payload,
      };
    case 'updated':
      return {
        ...overview,
        [action.name]: action.value,
      };
    case 'add_teammate': {
      return {
        ...overview,
        teammates: [
          ...overview.teammates,
          { id: nanoid(), name: '', position: '', link: '' },
        ],
      };
    }
    case 'delete_teammate': {
      return {
        ...overview,
        teammates: overview.teammates.filter(
          teammate => teammate.id !== action.id,
        ),
      };
    }

    case 'update_teammate': {
      return {
        ...overview,
        teammates: overview.teammates.map(teammate => {
          if (teammate.id === action.id) {
            return {
              ...teammate,
              [action.name]: action.value,
            };
          }
          return teammate;
        }),
      };
    }
  }
};

const OverviewPage2 = () => {
  useIsLogin();
  const navigate = useNavigate();
  const [overview, dispatch] = useReducer(reducer, overview);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'updated',
      name,
      value,
    });
  };

  const onChangeTeammate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
  ) => {
    const { name, value } = e.target;

    dispatch({
      type: 'update_teammate',
      id,
      name,
      value,
    });
  };

  const addTeammate = () => {
    dispatch({ type: 'add_teammate' });
  };

  const deleteTeammate = (id: string) => {
    dispatch({ type: 'delete_teammate', id });
  };

  const {
    project_name,
    team_name,
    introduction,
    teammates,
    project_start,
    project_end,
    detail,
  } = overview;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.pcmk.dppr.me/api/v1/projects/${
          localStorage.getItem('project_name') ?? localStorage.getItem('id')
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ project_detail: overview }),
        },
      );
      if (response.ok) {
        navigate('/stack');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const getOverviewData = async () => {
      try {
        const id = localStorage.getItem('project_name');
        const response = await fetch(
          `https://api.pcmk.dppr.me/api/v1/projects/${id}`,
        );
        if (response.ok) {
          const overviewData = (await response.json()).project_detail;
          dispatch({ type: 'set_data', payload: overviewData });
        } else {
          console.error('GET Error:', response.status);
        }
      } catch (error) {
        console.error('GET Error:', error);
      }
    };
    getOverviewData();
  }, []);

  return (
    <FormControl component="form" fullWidth onSubmit={handleSubmit}>
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
              name="project_name"
              value={project_name}
              id="outlined-required"
              placeholder="프로젝트 이름"
              onChange={onChange}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              required
              fullWidth
              name="team_name"
              value={team_name}
              id="outlined-required"
              placeholder="팀 이름"
              onChange={onChange}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="introduction"
            value={introduction}
            id="outlined-required"
            placeholder="프로젝트 한 줄 요약"
            onChange={onChange}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
        프로젝트 기간
      </Typography>

      <Grid spacing={2} container marginBottom={2} display="flex">
        <Grid item xs={3}>
          <TextField
            required
            fullWidth
            name="project_start"
            value={project_start}
            id="outlined-required"
            placeholder="프로젝트 시작하는 날짜"
            onChange={e => onChange(e)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            required
            fullWidth
            name="project_end"
            value={project_end}
            id="outlined-required"
            placeholder="프로젝트 끝나는 날짜"
            onChange={e => onChange(e)}
          />
        </Grid>
      </Grid>

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
      {overview.teammates?.map(mate => {
        return (
          <Grid key={mate.id} container alignItems="center" marginBottom={2}>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                placeholder="이름"
                name="name"
                defaultValue={mate.name}
                onChange={e => onChangeTeammate(e, mate.id)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                name="position"
                placeholder="포지션"
                defaultValue={mate.position}
                onChange={e => onChangeTeammate(e, mate.id)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="outlined-required"
                name="link"
                defaultValue={mate.link}
                placeholder="깃허브"
                fullWidth
                onChange={e => onChangeTeammate(e, mate.id)}
              />
            </Grid>
            <Grid item xs={2} style={{ marginLeft: 10 }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => deleteTeammate(mate.id)}
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
          name="detail"
          rows={4}
          id="standard-basic"
          placeholder="프로젝트의 상세 소개를 작성해 주세요"
          value={detail}
          onChange={onChange}
        />
      </Grid>
    </FormControl>
  );
};

export default OverviewPage2;
