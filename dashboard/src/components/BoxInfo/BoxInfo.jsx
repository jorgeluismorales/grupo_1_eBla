import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const BoxInfo = ({ title, value, color }) => {
    return (
        <Box sx={{ position: "relative", backgroundColor: color ? color : "#ccc" }}>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Typography variant='h6'>{title}</Typography>

                <Typography variant='h2'>{value}</Typography>
            </Box>

            <Box
                sx={{
                    paddingBottom: "calc(100% / (1/1))",
                    height: 0,
                }}
            ></Box>
        </Box>
    );
};

export default BoxInfo;
