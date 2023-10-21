import { Button } from "@mui/material";

const SaveButton = ({ onClick }: { onClick: () => void}) => {
    return (
        <Button variant="contained" onClick={onClick}>저장</Button>
    );
};

export default SaveButton;