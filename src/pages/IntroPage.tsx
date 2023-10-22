import TextField from '@mui/material/TextField';
import { Button, FormControl, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
  const [projectName, setProjectName] = useState('');
  const navigator = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = JSON.stringify(projectName);
    try {
      const response = await fetch('https://api.pcmk.dppr.me/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        localStorage.setItem('data', JSON.stringify(jsonResponse));
        localStorage.setItem('id', jsonResponse.project_detail.project_uuid);
        localStorage.setItem(
          'project_name',
          jsonResponse.project_detail.project_name,
        );
        navigator('/overview');
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: '400',
        }}
      >
        프로젝트 컨벤션 메이커
      </Typography>
      <FormControl component="form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="프로젝트명"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProjectName(e.target.value)
          }
        />
        <Button type="submit" variant="contained">
          작성
        </Button>
      </FormControl>
    </Box>
  );
};

export default IntroPage;
