import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DialogBase = ({ title, children, actions, onClose, open }) => {
    return (
        <Dialog open={Boolean(open)} onClose={onClose}>
            {Boolean(title) && (
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 1,
                        background: "#ddd",
                        borderBottom: "1px solid #ccc",
                    }}
                >
                    {title}
                </DialogTitle>
            )}
            <DialogContent>
                <DialogContentText sx={{ paddingTop: 3, paddingBottom: 3 }}>{children}</DialogContentText>
            </DialogContent>
            {Boolean(actions) && (
                <DialogActions
                    sx={{ justifyContent: "center", padding: 2, background: "#ddd", borderTop: "1px solid #ccc" }}
                >
                    {actions.map((action) => (
                        <Button
                            onClick={action.onClick}
                            variant={Boolean(action.default) ? "contained" : "outlined"}
                            color='primary'
                            autoFocus={Boolean(action.default)}
                            sx={{ minWidth: "120px", margin: "0 15px" }}
                        >
                            {action.text}
                        </Button>
                    ))}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default DialogBase;
