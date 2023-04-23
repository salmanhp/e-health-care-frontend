import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { AccountCircle } from '@mui/icons-material';
import {
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Drawer from "./Drawer";
import { useLogin } from "../components/LoginContext";

const pages = ["Services", "Doctors", "Lab Test", "Order Medicines", "Disease Predict", "About Us", "Contact Us"];





const Header = () => {
    const { loginData, userAfterLogin, isLogedin, setIsLogedin, loginAs, setLoginAs, setUserAfterLogin } = useLogin();


    const [users, setUsers] = useState()


    const [isLogin, setIsLogin] = useState(false);
    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down("md"));


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        setIsLogedin(false);
        setLoginAs("");
    };

    useEffect(() => {
        loginData.email && fetch(`https://ehealthcare-7fn3.onrender.com/api/${loginAs === 'doctor' ? 'doctors' : loginAs === 'patient' ? 'patients' : ''}`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })

    }, [loginData.email])


    useEffect(() => {
        users && setUserAfterLogin(users.filter(user => {
            return user.email == loginData.email
        }))
    }, [users])

    useEffect(() => {
        setIsLogin(isLogedin)
    }, [isLogedin])


    return (
        <React.Fragment>
            <AppBar sx={{ bgcolor: '#B2DDED', boxShadow: 'none', position: 'absolute', paddingTop: '10px' }} >
                <Toolbar>
                    <Link to="/">
                        <LocalHospitalIcon sx={{ transform: "scale(2)", color: '#1b71a1' }} />
                    </Link>
                    {isMatch ? (
                        <>
                            <Typography sx={{ fontSize: "2rem", paddingLeft: "10%", color: '#1b71a1' }}>
                                E-health
                            </Typography>
                            <Drawer />
                        </>
                    ) : (
                        <>
                            <Stack direction="row" spacing={4} sx={{ marginLeft: "auto" }}>
                                {pages.map((page, index) => (
                                    (page === 'Order Medicines') ?
                                        <a style={{ textDecoration: 'none' }} key={index} href="https://healthplus.flipkart.com/"><Button sx={{ color: '#1b71a1' }} variant="text">{page}</Button></a> :
                                        (page === 'Disease Predict') ?
                                            <a style={{ textDecoration: 'none' }} key={index} href="http://localhost:8501/"><Button sx={{ color: '#1b71a1' }} variant="text">{page}</Button></a>
                                            : <Link key={index} style={{ textDecoration: 'none' }} to={page === 'About Us' ? '/about' : page === 'Services' ? '/services' : page === 'Doctors' ? '/doctors' : page === "Contact Us" ? '/contactus' : page === 'Lab Test' ? '/lab-test' : '/'}>
                                                <Button sx={{ color: '#1b71a1' }} variant="text">{page}</Button>
                                            </Link>
                                ))}

                            </Stack>
                            {
                                isLogin ?
                                    <>
                                        <Link
                                            onClick={handleClick}
                                            style={{ marginLeft: "auto", textDecoration: 'none' }}
                                            id="fade-button"
                                            aria-controls={open ? 'fade-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <IconButton>
                                                <AccountCircle fontSize="large" sx={{ fontSize: '40px', color: '#283779' }} />
                                            </IconButton>
                                        </Link>
                                        <Menu
                                            id="fade-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'fade-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            sx={{ zIndex: '1500' }}
                                        >
                                            <Typography align="center" sx={{ p: '10px', fontWeight: 'bold' }}>{userAfterLogin ? userAfterLogin[0]?.name : 'Admin'}</Typography>
                                            <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} to="/dashboard"><MenuItem onClick={handleClose}>Dashboard</MenuItem></Link>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </Menu></> :
                                    <>
                                        <Link style={{ marginLeft: "auto", textDecoration: 'none' }} to="/loginas">
                                            <Button variant="outlined">
                                                Log In
                                            </Button>
                                        </Link>
                                        <Link style={{ marginLeft: "10px", textDecoration: 'none' }} to="/signupas">
                                            <Button variant="outlined">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </>

                            }
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Header;

