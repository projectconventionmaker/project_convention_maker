import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Divider,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import SaveButton from '../components/Button';
type CategoryType = {
  id: string;
};

type ConventionType = {
  id: string;
};

export default function CodePage() {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([
    {
      id: nanoid(),
    },
  ]);

  const handleDeleteCategory = (targetId: string) => {
    setCategoryList(categoryList.filter(({ id }) => id !== targetId));
  };

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Keyboard.webp"
              alt="Keyboard"
              width="60"
              height="60"
            />
            <Typography variant="h2">코드 컨벤션</Typography>
          </Box>
          <SaveButton />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          팀원과 소통을 원활히 하고, 코드 변경사항을 편리하게 확인하기 위해 좋은
          커밋메시지를 작성해야 합니다.
        </Typography>
        <Divider variant="fullWidth" />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            setCategoryList([
              ...categoryList,
              {
                id: nanoid(),
              },
            ]);
          }}
          variant="contained"
          color="primary"
          size="large"
          endIcon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
                fill="white"
              />
            </svg>
          }
        >
          카테고리 시작하기
        </Button>
      </Grid>

      <Stack
        marginTop={4}
        sx={{
          paddingLeft: '16px',
          '& > div:not(:last-child)::after': {
            content: '""',
            display: 'block',
            height: '1px',
            backgroundColor: '#0000001f',
            margin: '16px 0',
          },
        }}
      >
        {categoryList.map(category => {
          return (
            <Category
              {...category}
              key={category.id}
              handleDeleteCategory={handleDeleteCategory}
            />
          );
        })}
      </Stack>
    </Grid>
  );
}

type CategoryProps = CategoryType & {
  handleDeleteCategory: (id: string) => void;
};

function Category({ id, handleDeleteCategory }: CategoryProps) {
  const [conventionList, setConventionList] = useState<ConventionType[]>([
    {
      id: nanoid(),
    },
  ]);

  const handleDeleteConvention = (targetId: string) => {
    setConventionList(conventionList.filter(({ id }) => id !== targetId));
  };

  return (
    <Box>
      <Box>
        <Stack direction="row" gap={4} alignItems="center" marginBottom={3}>
          <TextField
            fullWidth
            label="카테고리명*"
            variant="outlined"
            size="medium"
            autoComplete="off"
          />
          <Button
            onClick={() => {
              handleDeleteCategory(id);
            }}
            sx={{ flexShrink: 0 }}
            variant="contained"
            color="error"
            size="large"
          >
            카테고리 삭제
          </Button>
        </Stack>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            setConventionList([...conventionList, { id: nanoid() }]);
          }}
        >
          항목 추가
        </Button>
      </Box>
      <Stack
        marginTop={3}
        sx={{
          '& > div:not(:last-child)': {
            marginBottom: '36px',
          },
        }}
      >
        {conventionList.map(convention => (
          <ConventionItem
            {...convention}
            key={convention.id}
            handleDeleteConvention={handleDeleteConvention}
          />
        ))}
      </Stack>
    </Box>
  );
}

type ConventionItemProps = ConventionType & {
  handleDeleteConvention: (id: string) => void;
};

function ConventionItem({ id, handleDeleteConvention }: ConventionItemProps) {
  return (
    <Box>
      <Stack direction="row" gap={4} alignItems="center" marginBottom={2}>
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          label="컨벤션*"
          autoComplete="off"
        />
        <Button
          onClick={() => {
            handleDeleteConvention(id);
          }}
          sx={{ flexShrink: 0 }}
          variant="outlined"
          color="error"
          size="large"
        >
          항목 삭제
        </Button>
      </Stack>
      <TextField
        autoComplete="off"
        variant="outlined"
        size="medium"
        label="예시 코드"
        multiline
        fullWidth
        minRows={7}
        helperText="0/100"
      />
    </Box>
  );
}
