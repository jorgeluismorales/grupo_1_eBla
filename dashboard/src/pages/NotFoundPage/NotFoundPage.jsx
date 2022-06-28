import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw"
        }}>
            <h1>Content not found</h1>

            <Button variant='outlined' color='primary' onClick={() => navigate("/")}>
                Go to home
            </Button>
        </Box>
    )
}

export default NotFound