import { Button } from '@mui/material';

const SaveButton = () => {
  return (

    <Button
      variant="contained"
      type="submit"
      size="large"
      sx={{
        fontSize: '1.6rem',
      }}
    >
      저장
    </Button>
  );
};

export default SaveButton;
