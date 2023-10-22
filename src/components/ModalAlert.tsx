import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ModalAlert = ({
  isOpen,
  handleIsOpen,
  title,
  content,
  handleConfirm,
}: {
  isOpen: boolean;
  handleIsOpen: () => void;
  title: string;
  content: string;
  handleConfirm?: () => void;
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleIsOpen}>
          닫기
        </Button>
        {handleConfirm && (
          <Button type="button" onClick={handleConfirm}>
            확인
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalAlert;
