import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {
  FormControl,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import React, { useState } from 'react';
import react from '../assets/react.png';
import vue from '../assets/vue.png';
import javascript from '../assets/javascript.png';
import typescript from '../assets/typescript.png';
import svelte from '../assets/svelte.png';
import angular from '../assets/angular.png';
import css from '../assets/css.png';
import recoil from '../assets/recoil.svg';
import redux from '../assets/redux.png';
import tailwind from '../assets/tailwindcss.png';
import axios from '../assets/axios.svg';
import storybook from '../assets/storybook.svg';
import sass from '../assets/sass.png';
import jest from '../assets/jest.png';
import jotai from '../assets/jotai.png';
import reactQuery from '../assets/react-query.svg';
import zustand from '../assets/zustand.png';
import cypress from '../assets/cypress.png';
import { Button, Theme, makeStyles } from '@mui/material';
import SaveButton from '../components/Button';
import TextField from '@mui/material/TextField';

interface StackItemType {
  name: string;
  description: string;
  imgUrl: string;
}

const LANGUAGE_LIST: StackItemType[] = [
  { name: 'JavaScript', description: '웹 개발 언어', imgUrl: javascript },
  { name: 'TypeScript', description: '정적 타입 언어', imgUrl: typescript },
];

const FRAMEWORK_LIST: StackItemType[] = [
  {
    name: 'React',
    description: '인기있는 UI 라이브러리',
    imgUrl: react,
  },
  { name: 'Vue', description: '접근성 있는 프레임워크', imgUrl: vue },
  {
    name: 'Angular',
    description: '엔터프라이즈 프레임워크',
    imgUrl: angular,
  },
  {
    name: 'Svelte',
    description: '빠르고 간단한 UI 프레임워크',
    imgUrl: svelte,
  },
  { name: 'Redux', description: '상태 관리 라이브러리', imgUrl: redux },
  { name: 'Recoil', description: '최신 상태 관리 도구', imgUrl: recoil },
  {
    name: 'Zustand',
    description: '간편한 상태 관리 라이브러리',
    imgUrl: zustand,
  },
  {
    name: 'Jotai',
    description: '리액티브 상태 관리 도구',
    imgUrl: jotai,
  },
  {
    name: 'Axios',
    description: 'HTTP 클라이언트 라이브러리',
    imgUrl: axios,
  },
  {
    name: 'React-query',
    description: '데이터 쿼리 및 캐싱 라이브러리',
    imgUrl: reactQuery,
  },
  {
    name: 'Jest',
    description: '자바스크립트 테스트 프레임워크',
    imgUrl: jest,
  },
  {
    name: 'Cypress',
    description: '엔드 투 엔드 테스트 도구',
    imgUrl: cypress,
  },
  {
    name: 'Storybook',
    description: 'UI 컴포넌트 개발 환경',
    imgUrl: storybook,
  },
];

const STYLE_LIST: StackItemType[] = [
  { name: 'CSS', description: '웹 스타일링 언어', imgUrl: css },
  { name: 'SASS', description: 'CSS 확장 언어', imgUrl: sass },
  {
    name: 'TailwindCSS',
    description: '구성 가능한 CSS 프레임워크',
    imgUrl: tailwind,
  },
];

const Stack = () => {
  // 받아온 데이터 배열화 필요
  const [language, setLanguage] = useState<string[]>([]);
  const [framework, setFramework] = useState<string[]>(['React', 'Vue']);
  const [style, setStyle] = useState<string[]>(['SASS']);

  //** 언어를 선택해서 배열에 담는 함수 */
  const handleLanguageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedStack = e.currentTarget.getAttribute('data-stack');

    if (language.includes(selectedStack!)) {
      setLanguage(prev => prev.filter(item => item !== selectedStack));
    } else {
      if (language.length === 1) {
        alert('언어는 하나만 선택할 수 있습니다.');
        return;
      }
      setLanguage(prev => [...prev, selectedStack!]);
    }
  };

  //** 프레임워크를 선택해서 배열에 담는 함수 */
  const handleFrameworkChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedStack = e.currentTarget.getAttribute('data-stack');

    if (framework.includes(selectedStack!)) {
      setFramework(prev => prev.filter(item => item !== selectedStack));
    } else {
      setFramework(prev => [...prev, selectedStack!]);
    }
  };

  //** 스타일을 선택해서 배열에 담는 함수 */
  const handleStyleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedStack = e.currentTarget.getAttribute('data-stack');

    if (style.includes(selectedStack!)) {
      setStyle(prev => prev.filter(item => item !== selectedStack));
    } else {
      setStyle(prev => [...prev, selectedStack!]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      languages: language.map(item => ({ name: item })),
      frameworks: framework.map(item => ({ name: item })),
      styles: style.map(item => ({ name: item })),
    });
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit}>
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
              기술 스택
            </Typography>
            <SaveButton />
          </Box>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontSize: '1.5rem',
                color: '#666666',
              }}
            >
              팀원 간의 공통된 기술 스택을 공유하면 코드와 리소스를 재사용하기가
              더 쉬워지며 프로젝트를 빠르게 진행할 수 있습니다.
            </Typography>
            <Divider
              variant="fullWidth"
              sx={{
                marginBottom: '2rem',
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: '400',
              }}
            >
              언어
            </Typography>
            <Grid container spacing={2}>
              {LANGUAGE_LIST.map(item => {
                if (language.includes(item.name)) {
                  return (
                    <StackItemCard
                      item={item}
                      handleClick={handleLanguageChange}
                      key={item.name}
                      isSelected
                    />
                  );
                } else {
                  return (
                    <StackItemCard
                      handleClick={handleLanguageChange}
                      item={item}
                      isSelected={false}
                    />
                  );
                }
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: '400',
              }}
            >
              프레임워크 및 라이브러리
            </Typography>
            <Grid container spacing={2}>
              {FRAMEWORK_LIST.map(item => {
                if (framework.includes(item.name)) {
                  return (
                    <StackItemCard
                      item={item}
                      handleClick={handleFrameworkChange}
                      key={item.name}
                      isSelected
                    />
                  );
                } else {
                  return (
                    <StackItemCard
                      handleClick={handleFrameworkChange}
                      item={item}
                      isSelected={false}
                    />
                  );
                }
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: '400',
              }}
            >
              스타일
            </Typography>
            <Grid container spacing={2}>
              {STYLE_LIST.map(item => {
                if (style.includes(item.name)) {
                  return (
                    <StackItemCard
                      item={item}
                      handleClick={handleStyleChange}
                      key={item.name}
                      isSelected
                    />
                  );
                } else {
                  return (
                    <StackItemCard
                      handleClick={handleStyleChange}
                      item={item}
                      isSelected={false}
                    />
                  );
                }
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default Stack;

const StackItemCard = ({
  item,
  isSelected,
  handleClick,
}: {
  item: StackItemType;
  isSelected: boolean;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <Grid item xs={4} lg={2.5}>
      <Card
        style={{
          backgroundColor: isSelected ? 'pink' : 'white',
          display: 'flex',
          gap: '10px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}
        variant="outlined"
        data-stack={item.name}
        onClick={handleClick}
      >
        <div>
          <CardHeader title={item.name} />
          <CardContent>{item.description}</CardContent>
        </div>
        <img style={{ width: '50px' }} src={item.imgUrl} alt={item.name} />
      </Card>
    </Grid>
  );
};

const StackItemAdd = ({
  handleAddBtnClick,
}: {
  handleAddBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="contained" onClick={handleAddBtnClick}>
        추가
      </Button>
    </div>
  );
};
