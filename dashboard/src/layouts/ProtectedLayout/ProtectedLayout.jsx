import { useEffect } from 'react'
import { Container } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import {NavBar} from '../../components/NavBar'
import { isLoggedIn } from '../../helpers/utils'
const ProtectedLayout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            <NavBar />
            <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
                <Outlet />
            </Container>
        </div>
    )
}

export default ProtectedLayout