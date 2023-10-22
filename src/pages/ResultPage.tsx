import {
  Grid,
  Box,
  Typography,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import SaveButton from '../components/Button';

const ResultPage = () => {
  return (
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
            variant="h2"
            gutterBottom
            sx={{
              fontSize: '3rem',
              fontWeight: '400',
            }}
          >
            결과 보기
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
          {'팀이릉'}이 선택한 결광비니다.
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            marginBottom: '2rem',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Card elevation={0}>
          <CardHeader title="프로젝트 소개" />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardHeader title="프로젝트명" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardHeader title="팀명" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardHeader title="프로젝트 개요" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardHeader title="프로젝트 기간" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader title="프로젝트 상세설명" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader title="프로젝트 팀원" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card elevation={0}>
          <CardHeader title="기술 스택" />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} lg={4}>
                <Card variant="outlined">
                  <CardHeader title="언어" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Card variant="outlined">
                  <CardHeader title="스타일" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card variant="outlined">
                  <CardHeader title="프레임워크" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6}>
            <Card elevation={0}>
              <CardHeader title="그라운드 룰" />
              <CardContent>
                <ul>
                  <li>그라운드룰 1</li>
                  <li>그라운드룰 2</li>
                  <li>그라운드룰 3</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card elevation={0}>
              <CardHeader title="커밋컨벤션" />
              <CardContent>
                <ul>
                  <li>커밋컨벤션 1</li>
                  <li>커밋컨벤션 2</li>
                  <li>커밋컨벤션 3</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Card elevation={0}>
          <CardHeader title="코드컨벤션" />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} lg={6}>
                <Card variant="outlined">
                  <CardHeader title="자바스크립트" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Card variant="outlined">
                  <CardHeader title="타입스크립트" />
                  <CardContent></CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResultPage;
