import { useState, useEffect } from 'react';
import styles from './GroundRule.module.scss';
import SaveButton from './Button';

const GROUND_RULE = [
  '반말은 절대로 하지 않고 높임말도 하지 않으려고 합니다.',
  '~님을 붙이지 않고 끝은 ~요로 끝내서 존중을 표현하되 ~시- ~께서 와 같은 높임말을 쓰지 않도록 하여 존중하되 격없는 대화 문화를 만듭니다',
  '닉네임을 사용합니다',
  '알려줄 때에도 굳이 지적하는 식의 표현은 지양하도록 합니다.',
  '적극적으로 모르는 것에 대해 질문합니다.',
  '왜 지금 상황이 이렇게 힘든지 말하기 보다 어떻게 하면 이 도전과제를 해결할 수 있을지에 집중합니다',
  ''
];

const GroundRule = () => {
  const [GR, setGR] = useState<number[]>([]);
  const handleCheckboxChange = (index: number) => {
    const updatedGR = [...GR];
    if (updatedGR.includes(index)) {
      const indexToRemove = updatedGR.indexOf(index);
      updatedGR.splice(indexToRemove, 1);
    } else {
      updatedGR.push(index);
    }
    setGR(updatedGR);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
useEffect(() => {
  // getGroundrule = () => {

  // }
},[])
  return (
    <>
      <div className={styles.groundrule_container}>
        <div className={styles.groundrule_title}>
          <span>그라운드 룰</span>
        </div>
        <form action="" className={styles.groundrule_form}>
          <div className={styles.groundrule_savebutton}>
            <SaveButton />
          </div>
          {GROUND_RULE.map((rule, index) => {
            return (
              <div key={index} className={styles.groundrule_box}>
                <label htmlFor={rule} className={styles.groundrule_label}>
                  <input
                    type="checkbox"
                    id={rule}
                    onChange={() => handleCheckboxChange(index)}
                    checked={GR.includes(index)}
                  />
                  <span className={styles.groundrule_rule}>{rule}</span>
                </label>
              </div>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default GroundRule;

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
