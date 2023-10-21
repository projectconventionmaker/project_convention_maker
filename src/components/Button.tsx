import { Button } from '@mui/material';

const SaveButton = ({ onClick }: { onClick: (e: any) => void }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      저장
    </Button>
  );
};

export default SaveButton;
