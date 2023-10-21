import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import styles from './Stack.module.scss';

interface StackItemType {
  name: string;
  description: string;
  imgUrl: string;
}

const LANGUAGE_LIST: StackItemType[] = [
  { name: 'JavaScript', description: '리액트관련 설명', imgUrl: 'assets/png' },
  { name: 'TypeScript', description: '리액트관련 설명', imgUrl: 'assets/png' },
];

const FRAMEWORK_LIST: StackItemType[] = [
  { name: 'React', description: '리액트관련 설명', imgUrl: 'assets/png' },
  { name: 'Vue', description: '리액트관련 설명', imgUrl: 'assets/png' },
  { name: 'Angular', description: '리액트관련 설명', imgUrl: 'assets/png' },
  { name: 'Svelte', description: '리액트관련 설명', imgUrl: 'assets/png' },
];

const STYLE_LIST: StackItemType[] = [
  { name: 'CSS', description: '리액트관련 설명', imgUrl: 'assets/png' },
  { name: 'SASS', description: '리액트관련 설명', imgUrl: 'assets/png' },
  { name: 'TailwindCSS', description: '리액트관련 설명', imgUrl: 'assets/png' },
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
      <img src={'#' ?? item.imgUrl} />
    </Card>
  );
};
