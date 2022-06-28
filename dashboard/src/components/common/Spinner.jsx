import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner'
import { Box } from "@mui/material";

const Spinner = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TailSpin
                height="100"
                width="100"
                color='#0099DD'
                ariaLabel='loading'
            />
        </Box>
    )
}

export default Spinner