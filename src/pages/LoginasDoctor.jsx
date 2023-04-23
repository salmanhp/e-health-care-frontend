import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from "../components/LoginContext";


const LoginasDoctor = () => {
    const { setLoginData, setIsLogedin, setLoginAs } = useLogin();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [errMesg, setErrMesg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: formValues.email,
            password: formValues.password
        };
        setLoginData(userData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };
        fetch('https://ehealthcare-7fn3.onrender.com/api/dlogin', requestOptions)
            .then(res => res.json())
            .then(data => {
                setIsLogedin(data.success)
                setLoginAs("doctor");
                data.success !== true && setErrMesg(true)
                data.success === true && navigate("/")
            })
            .catch(err => {
                console.log(err)
            })


    }

    const paperStyle = { padding: '20px', height: '55vh', width: '400px', margin: '40px auto' }
    return (
        <Box>

            <Paper elevation={10} style={paperStyle}>

                <Typography align='center' sx={{ margin: '20px 0px' }} variant='h4'>Login as Doctor</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '15px' }}>
                    <Box>
                        <TextField
                            name='email'
                            value={formValues.email}
                            type='email'
                            label="Email"
                            variant="standard"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <TextField
                            name='password'
                            value={formValues.password}
                            type='password'
                            label="Password"
                            variant="standard"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Box>

                    <br />
                    <Button type='submit' variant='contained' sx={{ fontSize: '20px', lineHeight: '34px', fontWeight: '700', textTransform: 'none' }} fullWidth>Log in</Button>
                    <Typography align='center'>Don't have an account? <Link color='primary' style={{ textDecoration: 'none' }} to='/signupasdoctor'>Sign Up</Link></Typography>
                    {errMesg && <Typography color="red" align='center' >Enter Valid Credentials</Typography>}
                </form>
            </Paper>
        </Box>
    )
}

export default LoginasDoctor;

