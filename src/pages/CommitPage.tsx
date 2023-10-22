import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import SaveButton from '../components/Button';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COMMIT_MESSAGES = [
  '[feat] : 기능 추가, 삭제, 변경',
  '[fix] : 버그, 오류 수정',
  '[docs] : readme.md, json 파일 등 수정, 라이브러리 설치 (문서 관련, 코드 수정 없음)',
  '[style] : CSS 등 사용자 UI 디자인 변경 (제품 코드 수정 발생, 코드 형식, 정렬 등의 변경)',
  '[refactor] : 코드 리팩토링',
  '[test] : 테스트 코드 추가, 삭제, 변경 등 (코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)',
  '[config] : npm 모듈 설치 등',
  '[chore] : 패키지 매니저 설정할 경우, etc 등 (ex. gitignore)',
  '[comment] : 필요한 주석 추가 및 변경',
  '[rename] : 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우',
  '[remove] : 파일을 삭제하는 작업만 수행한 경우',
];

const CommitPage = () => {
  const [commitData, setCommitData] = useState<
    { name: string; checked: boolean }[]
  >([]);

  const navigator = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.pcmk.dppr.me/api/v1/projects/${
          localStorage.getItem('project_name') ?? localStorage.getItem('id')
        }/commit-conventions`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code_conventions: commitData }),
        },
      );
      // 스택 저장 후 그라운드롤 이동
      if (response.ok) {
        navigator('/code');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.name;

    setCommitData(prev => {
      const foundIndex = prev.findIndex(item => item.name === message);

      if (foundIndex !== -1) {
        // 메시지가 이미 있는 경우, 해당 메시지의 체크 상태를 토글
        const updatedItem = {
          ...prev[foundIndex],
          checked: !prev[foundIndex].checked,
        };
        const updatedData = [...prev];
        updatedData[foundIndex] = updatedItem;
        return updatedData;
      } else {
        // 메시지가 없는 경우, 새로운 메시지를 추가
        return [...prev, { name: message, checked: false }];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.pcmk.dppr.me/api/v1/projects/${
            localStorage.getItem('project_name') ?? localStorage.getItem('id')
          }`,
        );

        if (response.ok) {
          const jsonResponse = await response.json();

          if (!jsonResponse.commit_convention) {
            setCommitData([]);
          } else {
            setCommitData(jsonResponse.commit_convention.elements);
          }
        } else {
          console.error('GET Error:', response.status);
        }
      } catch (error) {
        console.error('GET Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <FormControl component="form" onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h2" gutterBottom>
              💌 커밋 컨벤션
            </Typography>
            <SaveButton />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            팀원과 소통을 원활히 하고, 코드 변경사항을 편리하게 확인하기 위해
            좋은 커밋메시지를 작성해야 합니다.
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>

        {COMMIT_MESSAGES.map((message, _) => (
          <Grid item key={message} xs={12} lg={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name={message}
                  checked={commitData.some(
                    item => item.name === message && item.checked,
                  )}
                  onChange={handleCheckboxChange}
                />
              }
              label={message}
            />
          </Grid>
        ))}
      </Grid>
    </FormControl>
  );
};

export default CommitPage;
