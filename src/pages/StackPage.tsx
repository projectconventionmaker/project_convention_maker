import {
  Button,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  TextField,
} from '@mui/material';
import SaveButton from '../components/Button';
import ModalAlert from '../components/ModalAlert';

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import useIsLogin from '../hooks/useIsLogin';

interface StackItemType {
  name: string;
  description: string;
  imgPosition: string;
}

const LANGUAGE_LIST: StackItemType[] = [
  { name: 'JavaScript', description: '웹 개발 언어', imgPosition: '-4px -2px' },
  {
    name: 'TypeScript',
    description: '정적 타입 언어',
    imgPosition: '-85px -8px',
  },
];

const FRAMEWORK_LIST: StackItemType[] = [
  {
    name: 'React',
    description: '인기있는 UI 라이브러리',
    imgPosition: '-3px -80px',
  },
  {
    name: 'Vue',
    description: '접근성 있는 프레임워크',
    imgPosition: '-73px -80px',
  },
  {
    name: 'Angular',
    description: '엔터프라이즈 프레임워크',
    imgPosition: '-143px -80px',
  },
  {
    name: 'Svelte',
    description: '빠르고 간단한 UI 프레임워크',
    imgPosition: '-213px -70px',
  },
  {
    name: 'Redux',
    description: '상태 관리 라이브러리',
    imgPosition: '-3px -250px',
  },
  {
    name: 'Recoil',
    description: '최신 상태 관리 도구',
    imgPosition: '-70px -240px',
  },
  {
    name: 'Zustand',
    description: '간편한 상태 관리 라이브러리',
    imgPosition: '-220px -245px',
  },
  {
    name: 'Jotai',
    description: '리액티브 상태 관리 도구',
    imgPosition: '-140px -240px',
  },
  {
    name: 'Axios',
    description: 'HTTP 클라이언트 라이브러리',
    imgPosition: '-3px -308px',
  },
  {
    name: 'React-query',
    description: '데이터 쿼리 및 캐싱 라이브러리',
    imgPosition: '-73px -308px',
  },
  {
    name: 'Jest',
    description: '자바스크립트 테스트 프레임워크',
    imgPosition: '-73px -370px',
  },
  {
    name: 'Cypress',
    description: '엔드 투 엔드 테스트 도구',
    imgPosition: '-3px -374px',
  },
  {
    name: 'Storybook',
    description: 'UI 컴포넌트 개발 환경',
    imgPosition: '-143px -374px',
  },
];

const STYLE_LIST: StackItemType[] = [
  { name: 'CSS', description: '웹 스타일링 언어', imgPosition: '-0px -160px' },
  { name: 'SASS', description: 'CSS 확장 언어', imgPosition: '-80px -160px' },
  {
    name: 'TailwindCSS',
    description: '구성 가능한 CSS 프레임워크',
    imgPosition: '-150px -160px',
  },
];

const Stack = () => {
  // 받아온 데이터 배열화 필요
  const [language, setLanguage] = useState<string[]>([]);
  const [framework, setFramework] = useState<string[]>([]);
  const [style, setStyle] = useState<string[]>([]);
  const [etc, setEtc] = useState<string[]>([]);

  const [isModalAlertOpen, setIsModalAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const navigator = useNavigate();

  const toggleIsModalAlertOpen = () => {
    setIsModalAlert(prev => !prev);
  };

  //** 언어를 선택해서 배열에 담는 함수 */
  const handleLanguageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedStack = e.currentTarget.getAttribute('data-stack');

    if (language.includes(selectedStack!)) {
      setLanguage(prev => prev.filter(item => item !== selectedStack));
    } else {
      if (language.length === 1) {
        setAlertContent('언어는 하나만 선택할 수 있습니다.');
        toggleIsModalAlertOpen();
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

  const handleEtcDelete = (name: string) => {
    setEtc(prev => prev.filter(item => item !== name));
  };

  const handleEtcAdd = (name: string) => {
    if (etc.includes(name)) {
      setAlertContent('이미 사용하는 라이브러리입니다.');
      toggleIsModalAlertOpen();
      return;
    }
    setEtc(prev => [...prev, name]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = JSON.stringify({
      tech_stack: [
        { category: 'Language', names: language },
        { category: 'Styles', names: style },
        { category: 'Framework', names: framework },
        { category: 'Etc', names: etc },
      ],
    });
    try {
      const response = await fetch(
        `https://api.pcmk.dppr.me/api/v1/projects/${
          localStorage.getItem('project_name') ?? localStorage.getItem('id')
        }/tech-stack`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        },
      );
      // 스택 저장 후 그라운드롤 이동
      if (response.ok) {
        navigator('/groundrule');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
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
          jsonResponse.tech_stack.elements.map(
            (el: { category: string; names: string[] }) => {
              if (el.category === 'Language') {
                setLanguage(el.names ?? []);
              }
              if (el.category === 'Styles') {
                setStyle(el.names ?? []);
              }
              if (el.category === 'Framework') {
                setFramework(el.names ?? []);
              }
              if (el.category === 'Etc') {
                setEtc(el.names ?? []);
              }
            },
          );
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Crystal%20Ball.png"
                alt="Crystal Ball"
                width="60"
                height="60"
              />
              <Typography variant="h2">기술 스택</Typography>
            </Box>
            <SaveButton />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            팀원 간의 공통된 기술 스택을 공유하면 코드와 리소스를 재사용하기가
            더 쉬워지며 프로젝트를 빠르게 진행할 수 있습니다.
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ marginBottom: '30px' }}>
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
                      key={item.name}
                      isSelected={false}
                    />
                  );
                }
              })}
            </Grid>
          </Grid>
          <Divider variant="fullWidth" />
          {language.length >= 1 && (
            <Grid item xs={12} sx={{ marginBottom: '30px' }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: '400',
                }}
              >
                스타일
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
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
                        key={item.name}
                        isSelected={false}
                      />
                    );
                  }
                })}
              </Grid>
              <Divider variant="fullWidth" />
            </Grid>
          )}
          {language.length >= 1 && style.length >= 1 && (
            <>
              <Grid item xs={12} sx={{ marginBottom: '30px' }}>
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
                          key={item.name}
                          isSelected={false}
                        />
                      );
                    }
                  })}
                </Grid>
              </Grid>
              <Divider variant="fullWidth" />
              <Grid item xs={12} sx={{ marginBottom: '30px' }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: '400',
                  }}
                >
                  기타
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: 'flex', gap: '10px', padding: '20px' }}
                >
                  {etc.map(item => (
                    <EctItem
                      data={item}
                      handleEtcDelete={handleEtcDelete}
                      key={item}
                    />
                  ))}
                </Grid>
              </Grid>
              {<StackItemAdd handleAddBtnClick={handleEtcAdd} />}
            </>
          )}
        </Grid>
      </Grid>
      {isModalAlertOpen && (
        <ModalAlert
          isOpen={isModalAlertOpen}
          title={'프로젝트 컨벤션 메이커'}
          content={alertContent}
          handleIsOpen={toggleIsModalAlertOpen}
        />
      )}
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
    <Grid item xs={4} lg={4}>
      <Card
        sx={{
          border: isSelected ? '#1976d2 solid 5px' : 'white solid 5px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          '&:hover': {
            border: '#1976d2 solid 5px',
          },
        }}
        variant="outlined"
        data-stack={item.name}
        onClick={handleClick}
      >
        <div>
          <CardHeader title={item.name} />
          <CardContent>{item.description}</CardContent>
        </div>
        <div
          style={{ display: 'block', overflow: 'hidden', position: 'relative' }}
        >
          <div
            style={{
              background: "url('/icons.png')",
              width: '70px',
              height: '70px',
              backgroundPosition: item.imgPosition,
            }}
          />
        </div>
      </Card>
    </Grid>
  );
};

const StackItemAdd = ({
  handleAddBtnClick,
}: {
  handleAddBtnClick: (name: string) => void;
}) => {
  const [name, setName] = useState('');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          handleAddBtnClick(name);
          setName('');
        }}
      >
        추가
      </Button>
    </Box>
  );
};

const EctItem = ({
  data,
  handleEtcDelete,
}: {
  data: string;
  handleEtcDelete: (name: string) => void;
}) => {
  return (
    <Chip
      label={data}
      onDelete={() => {
        handleEtcDelete(data);
      }}
    />
  );
};
