import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  FormControl,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Divider,
} from '@mui/material';
import SaveButton from '../components/Button';
import useIsLogin from '../hooks/useIsLogin';

const GROUND_RULE = [
  '반말은 절대로 하지 않고 높임말도 하지 않으려고 합니다.',
  '~님을 붙이지 않고 끝은 ~요로 끝내서 존중을 표현하되 ~시- ~께서 와 같은 높임말을 쓰지 않도록 하여 존중하되 격없는 대화 문화를 만듭니다.',
  '닉네임을 사용합니다.',
  '알려줄 때에도 굳이 지적하는 식의 표현은 지양하도록 합니다.',
  '적극적으로 모르는 것에 대해 질문합니다.',
  '왜 지금 상황이 이렇게 힘든지 말하기 보다 어떻게 하면 이 도전과제를 해결할 수 있을지에 집중합니다.',
  '서로에게 후한 리액션을 해줘요.',
  '아낌없이 지식을 나눠요.',
];

interface GroundRule {
  name: string;
  checked: boolean;
}

const GroundRulePage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [rules, setRules] = useState<GroundRule[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rule = e.target.name;
    
    setRules(prev => {
      const foundIndex = prev.findIndex(item => item.name === rule);

      if (foundIndex !== -1) {
        const updatedItem = {
          ...prev[foundIndex],
          checked: !prev[foundIndex].checked,
        };
        const updatedData = [...prev];
        updatedData[foundIndex] = updatedItem;
        return updatedData;
      } else {
        return [...prev, { name: rule, checked: false }];
      }
    });

  };
  
  const handleSumbit = () => {
    const requestData = JSON.stringify({ ground_rules: rules });
    const apiUrl = `https://api.pcmk.dppr.me/api/v1/projects/${id}/ground-rules`;
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestData,
    }).then(response => response.json());
    navigate('/commit');
  };

  useEffect(() => {
    const getGroundRule = async () => {
      const uuid = localStorage.getItem('id');
      const response = await fetch(
        `https://api.pcmk.dppr.me/api/v1/projects/${uuid}`,
      );
      const wholeData = await response.json();
      setId(wholeData.project_uuid);
    };
    getGroundRule();
  }, []);

  return (
    <FormControl fullWidth onSubmit={handleSumbit}>
      <Grid display="flex" justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
            그라운드 룰
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            그라운드룰 설명
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: 2 }}>
        {GROUND_RULE.map((rule, _) => (
          <Grid key={rule}>
            <FormControlLabel
              control={
                <Checkbox
                  name={rule}
                  checked={rules.some(
                    item => item.name === rule && item.checked,
                  )}
                  onChange={handleCheckboxChange}
                />
              }
              label={rule}
            />
          </Grid>
        ))}
      </Box>
    </FormControl>
  );
};

export default GroundRulePage;
