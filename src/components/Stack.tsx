import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import styles from './Stack.module.scss';
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
    imgUrl: 'assets/png',
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
    imgUrl: 'assets/png',
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
  const [language, setLanguage] = useState<string[]>([]);
  const [framework, setFramework] = useState<string[]>(['React', 'Vue']);
  const [style, setStyle] = useState<string[]>(['SASS']);

  //** 언어를 선택해서 배열에 담는 함수 */
  const handleLanguageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedStack = e.currentTarget.getAttribute('data-stack');
    setLanguage(prev => [...prev, selectedStack!]);
  };

  //** 프레임워크를 선택해서 배열에 담는 함수 */
  const handleFrameworkChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedStack = e.currentTarget.getAttribute('data-stack');
    setFramework(prev => [...prev, selectedStack!]);
  };

  //** 스타일을 선택해서 배열에 담는 함수 */
  const handleStyleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedStack = e.currentTarget.getAttribute('data-stack');
    setStyle(prev => [...prev, selectedStack!]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ ...language, ...framework, ...style });
  };

  return (
    <form className={styles.container}>
      <label>언어</label>
      <div className={styles.card_wrapper}>
        {LANGUAGE_LIST.map(item => {
          if (language.includes(item.name)) {
            return <StackItemCard item={item} isSelected />;
          } else {
            return <StackItemCard item={item} isSelected={false} />;
          }
        })}
        <StackItemAdd />
      </div>
      <label>프레임워크</label>
      <div className={styles.card_wrapper}>
        {FRAMEWORK_LIST.map(item => {
          if (framework.includes(item.name)) {
            return <StackItemCard item={item} isSelected />;
          } else {
            return <StackItemCard item={item} isSelected={false} />;
          }
        })}
        <StackItemAdd />
      </div>
      <label>스타일</label>
      <div className={styles.card_wrapper}>
        {STYLE_LIST.map(item => {
          if (style.includes(item.name)) {
            return <StackItemCard item={item} isSelected />;
          } else {
            return <StackItemCard item={item} isSelected={false} />;
          }
        })}
        <StackItemAdd />
      </div>
    </form>
  );
};

export default Stack;

const StackItemCard = ({
  item,
  isSelected,
}: {
  item: StackItemType;
  isSelected: boolean;
}) => {
  return (
    <Card
      variant="outlined"
      classes={{
        root: isSelected
          ? `${styles.itemCard} ${styles.active}`
          : styles.itemCard,
      }}
      data-stack={item.name}
    >
      <div>
        <CardHeader title={item.name} />
        <CardContent>{item.description}</CardContent>
      </div>
      <img src={item.imgUrl} alt={item.name} />
    </Card>
  );
};

const StackItemAdd = () => {
  return (
    <Card variant="outlined">
      <div>
        <button>+</button>
      </div>
    </Card>
  );
};
