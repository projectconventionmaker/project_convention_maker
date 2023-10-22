import TextField from '@mui/material/TextField';
import { Button, FormControl, Typography } from '@mui/material';
const IntroPage = () => {
  const handleSubmit = () => {
    console.log('프로젝트명 변경');
  };
  return (
    <main>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: '400',
        }}
      >
        프로젝트 컨벤션 메이커
      </Typography>
      <FormControl component="form" onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="프로젝트명" variant="outlined" />
        <Button variant="contained">작성</Button>
      </FormControl>
    </main>
  );
};

export default IntroPage;
