import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import useIsLogin from '../hooks/useIsLogin';
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

export default function CodePage() {
  useIsLogin();

  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

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
        const newItem = { ...item, id: nanoid() };
        newItem.items = (item?.items ?? []).map(aaa => ({
          //@ts-ignore
          id: nanoid(),
          ...aaa,
        }));
        return newItem;
      });

      setCategoryList(listWithId);
    };

    fetchCodeConvention();
  }, []);

  const handleDeleteCategory = (targetId: string) => {
    setCategoryList(categoryList.filter(({ id }) => id !== targetId));
  };

  const handleEditCategory = (
    targetId: string,
    targetCategoryValue: string,
  ) => {
    setCategoryList(
      categoryList?.map(category => {
        if (category.id === targetId) {
          return {
            id: category.id,
            category: targetCategoryValue,
            items: deepCopy(category.items),
          };
        } else return category;
      }),
    );
  };
  const handleDeleteConvention = (
    targetCategoryId: string,
    targetId: string,
  ) => {
    setCategoryList(
      categoryList.map(category => {
        if (category.id === targetCategoryId) {
          const list = category.items.filter(item => item.id !== targetId);
          return {
            ...category,
            items: list,
          };
        }
        return category;
      }),
    );
  };

  const handleEditConventionItem = ({
    targetCategoryId,
    targetName,
    targetExample,
    targetConventionId,
  }: {
    targetCategoryId: string;
    targetConventionId: string;
    targetName: string;
    targetExample: string;
  }) => {
    setCategoryList(
      categoryList?.map(category => {
        if (category.id === targetCategoryId) {
          const currentItems = Array.isArray(category.items)
            ? deepCopy(category.items)
            : [];

          const list = currentItems.map(item => {
            if (item.id === targetConventionId) {
              if (targetName) {
                return {
                  ...item,
                  name: targetName,
                  example: item.example,
                };
              } else {
                return {
                  ...item,
                  name: item.name,
                  example: targetExample,
                };
              }
            }
            return item;
          });

          return {
            ...category,
            items: list,
          };
        }
        return category;
      }),
    );
  };

  const handleCreateConventionItem = (categoryId: string) => {
    setCategoryList(
      categoryList?.map(category => {
        if (category.id === categoryId) {
          const currentItems = Array.isArray(category.items)
            ? deepCopy(category.items)
            : [];

          return {
            ...category,
            items: [
              ...currentItems,
              {
                id: nanoid(),
                name: '',
                example: '',
              },
            ],
          };
        } else return category;
      }),
    );
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              const handleSubmit = () => {
                const requestData = JSON.stringify({
                  code_conventions: categoryList,
                });
                const apiUrl = `https://api.pcmk.dppr.me/api/v1/projects/${localStorage.getItem(
                  'project_name',
                )}/code-conventions`;
                fetch(apiUrl, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: requestData,
                }).then(response => response.json());
              };
              handleSubmit();
            }}
          >
            저장
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          코드 컨벤션은 프로젝트 전체에서 일관성을 유지하는 데 도움이 됩니다.
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
      </Grid>
      <Grid item xs={12}>
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
                handleCreateConventionItem={handleCreateConventionItem}
                handleEditConventionItem={handleEditConventionItem}
                handleDeleteConvention={handleDeleteConvention}
              />
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}

type CategoryProps = CategoryType & {
  handleDeleteCategory: (id: string) => void;
  handleDeleteConvention: (categoryId: string, id: string) => void;
  handleEditCategory: (id: string, value: string) => void;
  handleCreateConventionItem: (
    id: string,
    name?: string,
    example?: string,
  ) => void;

  handleEditConventionItem: ({
    targetCategoryId,
    targetConventionId,
    targetExample,
    targetName,
  }: {
    targetCategoryId: string;
    targetConventionId: string;
    targetName: string;
    targetExample: string;
  }) => void;
};

function Category({
  id,
  handleDeleteCategory,
  items,
  category,
  handleEditCategory,
  handleCreateConventionItem,
  handleEditConventionItem,
  handleDeleteConvention,
}: CategoryProps) {
  return (
    <Box>
      <Box
        component="form"
        onSubmit={e => {
          e.preventDefault();
          handleCreateConventionItem(id);
        }}
      >
        <Stack direction="row" gap={4} alignItems="center" marginBottom={3}>
          <TextField
            onChange={e => {
              handleEditCategory(id, e.target.value);
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
        {(items ?? []).map(convention => (
          <ConventionItem
            categoryId={id}
            {...convention}
            key={convention.id}
            handleDeleteConvention={handleDeleteConvention}
            handleEditConventionItem={handleEditConventionItem}
            handleCreateConventionItem={handleCreateConventionItem}
          />
        ))}
      </Stack>
    </Box>
  );
}

type ConventionItemProps = ConventionType & {
  categoryId: string;
  handleDeleteConvention: (categoryId: string, id: string) => void;
  handleCreateConventionItem: (
    id: string,
    name?: string,
    example?: string,
  ) => void;
  handleEditConventionItem: ({
    targetCategoryId,
    targetConventionId,
    targetExample,
    targetName,
  }: {
    targetCategoryId: string;
    targetConventionId: string;
    targetName: string;
    targetExample: string;
  }) => void;
};

function ConventionItem({
  id,
  categoryId,
  handleDeleteConvention,
  name,
  example,

  handleEditConventionItem,
}: ConventionItemProps) {
  return (
    <Box>
      <Stack direction="row" gap={4} alignItems="center" marginBottom={2}>
        <TextField
          required
          value={name}
          fullWidth
          variant="outlined"
          size="medium"
          label="컨벤션*"
          autoComplete="off"
          onChange={e => {
            handleEditConventionItem({
              targetCategoryId: categoryId,
              targetConventionId: id,
              targetName: e.target.value,
              targetExample: '',
            });
          }}
        />
        <Button
          onClick={() => {
            handleDeleteConvention(categoryId, id);
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
        required
        value={example}
        onChange={e => {
          handleEditConventionItem({
            targetCategoryId: categoryId,
            targetConventionId: id,
            targetExample: e.target.value,
            targetName: '',
          });
        }}
        autoComplete="off"
        minRows={3}
        variant="outlined"
        size="medium"
        label="예시 코드"
        multiline
        fullWidth
        inputProps={{ maxLength: 100 }}
        helperText={`${example.length ?? 0}/100`}
      />
    </Box>
  );
}
