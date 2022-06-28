import { useState } from "react";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";

import { setToken } from "../../helpers/utils";
import { checkCredentials } from '../../services/login';

const LoginForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        if (email === '' || password === '') {
            setErrorMessage("Email and password are required");
            setError(true);
            return;
        }
        try {
            setLoading(true);
            const response = await checkCredentials(email, password);
            if (response.status === 200) {
                setToken(response.data.token);
                navigate("/");
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setError(true);
            setLoading(false);
        }


    }


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw"
        }}>
            <form>
                <Stack width={500} spacing={3}>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={email}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleLogin()}
                        sx={{
                            width: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            height: "3rem"
                        }}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </Stack>
            </form>
            {error && (
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            )}
        </Box>
    )
}

export default LoginForm