import { useState } from "react";
import { AppBar, Button, IconButton, Stack, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

import { clearToken } from "../../helpers/utils";

const NavBar = () => {
    const navigate = useNavigate();

    const pages = ["Products", "Users", "Categories"];

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        clearToken();
        navigate("/login");
    };

    return (
        <AppBar position='static' elevation={0}>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
                        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                            <DashboardIcon />
                        </IconButton>
                        Ebla Dashboard
                    </Link>
                </Typography>
                <Stack spacing={2} direction='row'>
                    {pages.map((page) => (
                        <Link
                            key={page}
                            to={`/${page.toLowerCase()}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button sx={{ my: 2, color: "white", display: "block" }}>{page}</Button>
                        </Link>
                    ))}
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        id='logout-button'
                        aria-controls={open ? "logout-menu" : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                </Stack>
                <Menu
                    id='logout-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    MenuListProps={{
                        "aria-labelledby": "logout-button",
                    }}
                >
                    <MenuItem>
                        <Typography onClick={logout}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
