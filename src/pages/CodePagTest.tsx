/*
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
} from '@mui/material';
import { useEffect, useState, FormEvent } from 'react';
import { nanoid } from 'nanoid';
import SaveButton from '../components/Button';

type CategoryType = {
  id: string;
  category: string;
  items: { id: string; name: string; example: string }[];
};

type ConventionType = {
  id: string;
  name: string;
  example: string;
};

function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export default function CodePage2() {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState(new Map());

  useEffect(() => {
    const fetchCodeConvention = async () => {
      const id = localStorage.getItem('project_name');
      const apiUrl = `https://api.pcmk.dppr.me/api/v1/projects/${id}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const list = (data?.code_convention.elements ?? []) as Omit<
        CategoryType,
        'id'
      >[];

      const listWithId = list.map(item => {
        return { ...item, id: nanoid() };
      });
      list.forEach(({ category, items }, index) => {
        // formData.append(`category_${index}`, category);
        setFormData(formData.set(`category_${index}`, category));
        items.forEach(({ id, name, example }, idx) => {
          setFormData(formData.set(`${category}_${index}_${idx}`, name));
        });
      });
      setCategoryList(listWithId);
    };

    fetchCodeConvention();
    console.log(formData, ';formdata');
  }, []);

  const handleDeleteCategory = (targetId: string) => {
    setCategoryList(categoryList.filter(({ id }) => id !== targetId));
  };

  const handleEditCategory = (
    targetId: string,
    targetCategoryValue: string,
  ) => {
    categoryList.map(category => {
      if (category.id === targetId) {
        return {
          id: category.id,
          name: targetCategoryValue,
          items: deepCopy(category.items),
        };
      }
    });
  };
  useEffect(() => {
    categoryList.forEach(({ category, items }, index) => {
      setFormData(formData.set(`category_${index}`, category));
      items.forEach(({ id, name, example }, idx) => {
        setFormData(formData.set(`${category}_${index}_${idx}`, name));
        setFormData(
          formData.set(`${category}_${index}_${idx}_example`, example),
        );
      });
    });
    // setFormData(formData);
  }, [categoryList]);
  useEffect(() => {
    for (const [key, value] of formData) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  }, [formData]);
  return (
    <Box>
      <FormControl
        component="form"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log(formData, 'map으로 된 래긍ㅁㄱ');
        }}
      >
        {categoryList.map(({ category, items }, index) => (
          <div key={category}>
            <FormControl>
              <TextField
                required
                fullWidth
                label="카테고리명"
                variant="outlined"
                size="medium"
                autoComplete="off"
                defaultValue={category}
                onChange={e =>
                  formData.set(`category_${category}`, e.target.value)
                }
              />
            </FormControl>
            {items.map(({ id, name, example }, idx) => (
              <FormControl key={id}>
                <TextField
                  required
                  fullWidth
                  label="컨벤션"
                  variant="outlined"
                  size="medium"
                  autoComplete="off"
                  defaultValue={name}
                  onChange={e => {
                    formData.set(
                      `category_${category}_${name}`,
                      e.target.value,
                    );
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="컨벤션"
                  variant="outlined"
                  size="medium"
                  autoComplete="off"
                  defaultValue={example}
                  onChange={e => {
                    formData.set(
                      `category_${category}_${name}_example`,
                      e.target.value,
                    );
                  }}
                />
              </FormControl>
            ))}
          </div>
        ))}
        <SaveButton />
      </FormControl>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" component="p" marginBottom={2}>
          코드 컨벤션
        </Typography>
        <Button variant="contained" color="primary" size="large">
          저장
        </Button>
      </Stack>
      <Typography variant="body1" marginBottom={2}>
        코드 컨벤션을 적어놓으면 이런 점이 좋답니다.
      </Typography>

      <Button
        onClick={() => {
          setCategoryList([
            ...categoryList,
            {
              id: nanoid(),
              category: '',
              items: [{ id: nanoid(), name: '', example: '' }],
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
      <Stack
        marginTop={4}
        sx={{
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
              handleEditCategory={handleEditCategory}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

type CategoryProps = CategoryType & {
  handleDeleteCategory: (id: string) => void;
  handleEditCategory: (id: string, value: string) => void;
};

function Category({
  id,
  handleDeleteCategory,
  items,
  category,
  handleEditCategory,
}: CategoryProps) {
  const [conventionList, setConventionList] = useState<ConventionType[]>(
    items ?? [],
  );
  // const [category, setCategory] = useState('');

  const handleDeleteConvention = (targetId: string) => {
    setConventionList(conventionList.filter(({ id }) => id !== targetId));
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={e => {
          e.preventDefault();
          setConventionList([
            ...conventionList,
            { id: nanoid(), name: category },
          ]);
        }}
      >
        <Stack direction="row" gap={4} alignItems="center" marginBottom={3}>
          <TextField
            onChange={e => {
              setCategory(e.target.value);
            }}
            value={category}
            required
            fullWidth
            label="카테고리명"
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
        <Button type="submit" variant="outlined" color="primary" size="large">
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

function ConventionItem({
  id,
  handleDeleteConvention,
  name,
  example,
}: ConventionItemProps) {
  return (
    <Box>
      <Stack direction="row" gap={4} alignItems="center" marginBottom={2}>
        <TextField
          value={name}
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
        value={example}
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
*/
