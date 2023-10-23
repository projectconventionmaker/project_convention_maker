import TextField from '@mui/material/TextField';
import { Button, FormControl, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalAlert from '../components/ModalAlert';

const IntroPage = () => {
  const [projectName, setProjectName] = useState('');
  const [isModalAlertOpen, setIsModalAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);

  const navigator = useNavigate();

  const handleConfirm = () => {
    localStorage.setItem('project_name', projectName);
    navigator('/overview');
  };

  const toggleIsModalAlertOpen = () => {
    setIsModalAlert(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(projectName);
    if (!projectName || projectName === '') {
      setAlertContent('프로젝트명을 입력해주세요');
      toggleIsModalAlertOpen();
      return;
    }

    try {
      const response = await fetch('https://api.pcmk.dppr.me/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_name: projectName }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        localStorage.setItem('data', JSON.stringify(jsonResponse));
        localStorage.setItem('id', jsonResponse.project_detail.project_uuid);
        localStorage.setItem(
          'project_name',
          jsonResponse.project_detail.project_name,
        );
        navigator('/overview');
      } else {
        if (jsonResponse.code === 1001) {
          setIsConfirm(true);
          setAlertContent(
            '이미 존재하는 프로젝트명입니다. 기존 데이터를 불러올까요?',
          );
          toggleIsModalAlertOpen();
          // 확인 시 요청 후  handleConfirm에 프로젝트명 저장 및 이동
          return;
        }
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Box
      style={{
        height: '70vh',
        display: 'flex',
        gap: '30px',
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
          sx={{ marginBottom: '20px' }}
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
      {isModalAlertOpen && (
        <ModalAlert
          isOpen={isModalAlertOpen}
          title={'프로젝트 컨벤션 메이커'}
          content={alertContent}
          handleIsOpen={toggleIsModalAlertOpen}
          isConfirm={isConfirm}
          handleConfirm={handleConfirm}
        />
      )}
    </Box>
  );
};

export default IntroPage;
