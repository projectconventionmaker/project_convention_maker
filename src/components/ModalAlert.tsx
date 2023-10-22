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
  isConfirm,
}: {
  isOpen: boolean;
  handleIsOpen: () => void;
  title: string;
  content: string;
  handleConfirm?: () => void;
  isConfirm?: boolean;
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
        {isConfirm && (
          <Button type="button" onClick={handleConfirm}>
            확인
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalAlert;
