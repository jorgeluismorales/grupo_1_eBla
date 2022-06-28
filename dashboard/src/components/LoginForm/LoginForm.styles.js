import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({

    form: {
        display: "flex",
        maxWidth: 500,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        marginBottom: theme.spacing(3),
        minWidth: 300,
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.light,
            },
        },
    },
    inputLabelFocused: {
        color: `${theme.palette.primary.light} !important`,
    },
    alert: {
        color: `${theme.palette.error.light} !important`,
        border: "none",
        fontWeight: "bold",
    },
    alertIcon: {
        color: `${theme.palette.error.light} !important`,
    },
}));