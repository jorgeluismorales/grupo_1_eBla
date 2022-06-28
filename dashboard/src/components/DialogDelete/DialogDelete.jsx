import { Typography } from "@mui/material";
import { DialogBase } from "../DialogBase";

const DialogDelete = ({ onClose, open, id, onDelete, title }) => {
    const handleDelete = async () => {
        onDelete(id);
        onClose();
    };

    return (
        <>
            <DialogBase
                onClose={onClose}
                open={open}
                actions={[
                    {
                        text: "No",
                        onClick: onClose,
                    },
                    {
                        text: "Yes",
                        default: true,
                        onClick: handleDelete,
                    },
                ]}
                title='Confirm delete'
            >
                <Typography variant='p' sx={{ color: "error" }}>
                    Are you sure you want to delete this {title}?
                </Typography>
            </DialogBase>
        </>
    );
};

export default DialogDelete;
