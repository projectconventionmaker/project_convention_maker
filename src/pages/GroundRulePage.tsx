import { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import SaveButton from '../components/Button';

const GROUND_RULE = [
  '반말은 절대로 하지 않고 높임말도 하지 않으려고 합니다.',
  '~님을 붙이지 않고 끝은 ~요로 끝내서 존중을 표현하되 ~시- ~께서 와 같은 높임말을 쓰지 않도록 하여 존중하되 격없는 대화 문화를 만듭니다.',
  '닉네임을 사용합니다.',
  '알려줄 때에도 굳이 지적하는 식의 표현은 지양하도록 합니다.',
  '적극적으로 모르는 것에 대해 질문합니다.',
  '왜 지금 상황이 이렇게 힘든지 말하기 보다 어떻게 하면 이 도전과제를 해결할 수 있을지에 집중합니다.',
  '서로에게 후한 리액션을 해줘요.',
  '아낌없이 지식을 나눠요.'
];

const GroundRulePage = () => {
  const [selectedRules, setSelectedRules] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedRules((prevSelectedRules) => [...prevSelectedRules, name]);
    } else {
      setSelectedRules((prevSelectedRules) =>
        prevSelectedRules.filter((rule) => rule !== name)
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  useEffect(() => {
    // getGroundrule = () => {
    // }
  }, []);
  return (
    <FormControl fullWidth>
      <Grid
        spacing={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid>
          <Typography variant="h5" component="p" marginBottom={2} marginTop={2}>
            그라운드 룰
          </Typography>
        </Grid>
        <Grid>
          <SaveButton />
        </Grid>
      </Grid>
      <Grid>
        {GROUND_RULE.map((rule, _) => (
          <Grid key={rule}>
            <FormControlLabel
              control={
                <Checkbox
                  name={rule}
                  checked={selectedRules.includes(rule)}
                  onChange={handleCheckboxChange}
                />
              }
              label={rule}
            />
          </Grid>
        ))}
      </Grid>
    </FormControl>
  );
};

export default GroundRulePage;

// export const AddRule = () => {
//   const [addedRule, setAddedRule] = useState<string[]>([]);
//   const [rule, setRule] = useState('');
//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRule(e.target.value);
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setAddedRule(prev => [...prev, rule]);
//     setRule('');
//   };
//   const handleDelete = (index: number) => {
//     setAddedRule(prevState => prevState.filter((rule, i) => i !== index));
//   };
//   return (
//     <div>
//       <form action="" onClick={handleSubmit}>
//         <input type="text" onChange={handleInput} value={rule} />
//         <button>Add</button>

//         <ul>
//           {addedRule.map((rule, index) => (
//             <>
//               <li key={nanoid()}>{rule}</li>
//               <button onClick={() => handleDelete(index)}>❌Delete</button>
//             </>
//           ))}
//         </ul>
//       </form>
//     </div>
//   );
// };
