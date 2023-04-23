import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from "../components/LoginContext";


const LoginasAdmin = () => {
    const { setLoginData, setIsLogedin, setLoginAs } = useLogin();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        user: '',
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
            user: formValues.user,
            password: formValues.password
        };
        setLoginData(userData);



        if (formValues.user == "Admin" && formValues.password == "User@admin") {
            setIsLogedin(true);
            setLoginAs("admin");
            navigate("/")
        }
        else {
            setErrMesg(true)
        }


    }

    const paperStyle = { padding: '20px', height: '55vh', width: '400px', margin: '40px auto' }
    return (
        <Box>

            <Paper elevation={10} style={paperStyle}>

                <Typography align='center' sx={{ margin: '20px 0px' }} variant='h4'>Login as Admin</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '15px' }}>
                    <Box>
                        <TextField
                            name='user'
                            value={formValues.user}
                            type='text'
                            label="User"
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
                    {errMesg && <Typography color="red" align='center' >Enter Valid Credentials</Typography>}
                </form>
            </Paper>
        </Box>
    )
}

export default LoginasAdmin;

