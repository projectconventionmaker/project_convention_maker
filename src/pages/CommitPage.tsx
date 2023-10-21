import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import SaveButton from '../components/Button';
import { FormEvent } from 'react';

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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(
      Array.from(formData.entries())
        .filter(([key, value]) => value === 'on')
        .map(([key, value]) => key),
    );
  };

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
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: '400',
              }}
            >
              💌 커밋 컨벤션
            </Typography>
            <SaveButton />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontSize: '1.5rem',
              color: '#666666',
            }}
          >
            팀원과 소통을 원활히 하고, 코드 변경사항을 편리하게 확인하기 위해
            좋은 커밋메시지를 작성해야 합니다.
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{
              marginBottom: '2rem',
            }}
          />
        </Grid>

        {COMMIT_MESSAGES.map((message, _) => (
          <Grid item key={message} xs={12} lg={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name={message}
                  sx={{
                    fontSize: '1.4rem',
                  }}
                />
              }
              label={<div style={{ fontSize: '1.6rem' }}>{message}</div>}
            />
          </Grid>
        ))}
      </Grid>
    </FormControl>
  );
};

export default CommitPage;
