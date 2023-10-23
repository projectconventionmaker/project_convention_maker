import {
  Grid,
  Typography,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Box,
} from '@mui/material';
import useIsLogin from '../hooks/useIsLogin';
import { useEffect, useState } from 'react';

interface ResultDataType {
  code_convention: null;
  commit_convention: { name: string; checked: boolean }[];
  ground_rule: null;
  project_detail: null;
  tech_stack: {
    category: 'Language' | 'Styles' | 'Framework' | 'Etc';
    names: string[];
  }[];
}
const ResultPage = () => {
  const [resultData, setResultData] = useState<ResultDataType>({
    code_convention: null,
    commit_convention: [],
    ground_rule: null,
    project_detail: null,
    tech_stack: [],
  });

  useIsLogin();

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
          setResultData({
            code_convention: null,
            commit_convention: jsonResponse.commit_convention.elements,
            ground_rule: null,
            project_detail: null,
            tech_stack: jsonResponse.tech_stack.elements,
          });
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Triangular%20Flag.png"
            alt="Triangular Flag"
            width="60"
            height="60"
          />
          <Typography variant="h2">결과 보기</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: '#666666',
          }}
        >
          {'프로젝트명'}이 설정한 컨벤션입니다.
        </Typography>
        <Divider variant="fullWidth" sx={{}} />
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
                  <CardContent sx={{ '> img': '50px' }}>
                    <ul>
                      {resultData?.tech_stack?.map(item => {
                        if (item.category === 'Language') {
                          return item.names.map(name => (
                            <li key={name}>{name}</li>
                          ));
                        }
                        return null;
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Card variant="outlined">
                  <CardHeader title="스타일" />
                  <CardContent>
                    <ul>
                      {resultData?.tech_stack?.map(item => {
                        if (item.category === 'Styles') {
                          return item.names.map(name => (
                            <li key={name}>{name}</li>
                          ));
                        }
                        return null;
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card variant="outlined">
                  <CardHeader title="프레임워크" />
                  <CardContent>
                    <ul>
                      {resultData?.tech_stack?.map(item => {
                        if (item.category === 'Framework') {
                          return item.names.map(name => (
                            <li key={name}>{name}</li>
                          ));
                        }
                        return null;
                      })}
                      {resultData?.tech_stack?.map(item => {
                        if (item.category === 'Etc') {
                          return item.names.map(name => (
                            <li key={name}>{name}</li>
                          ));
                        }
                        return null;
                      })}
                    </ul>
                  </CardContent>
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
                  {resultData?.commit_convention?.map(item => (
                    <li key={item.name}>{item.name}</li>
                  ))}
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
