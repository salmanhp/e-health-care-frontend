import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const SignupasDoctor = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        department: '',
        email: '',
        password: '',
        password2: ''
    });

    const [postData, setPostData] = useState({
        name: '',
        department: '',
        email: '',
        password: '',
        password2: ''
    });
    const departments = ["Cardiology", "Dentistry", "Dermatology", "ENT", "Gastroenterology", "Medical Oncology", "Neurosurgery", "Urology", "Pathology", "Neurology", "Radiology", "Pulmonology (Chest & TB)", "Nephrology (Including Dialysis)", "General Medicine", "General & Laparoscopic Surgery", "Obst & Gynecology", "Orthopedics & Joint Replacement", "Surgical Oncology", "GI Surgery", "Pediatrics Surgery", "Physiotherapy and Rehabilitation Center"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://ehealthcare-7fn3.onrender.com/api/dregister', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        })
            .then(res => res.json())
            .then(data => {
                setPostData(data)
                data.email !== "Email already exists" && data.password2 !== "Passwords must match" && navigate("/loginasdoctor")

            })
            .catch(err => console.log(err))


    }

    const paperStyle = { padding: '20px', height: '80vh', width: '400px', margin: '40px auto' }
    return (
        <Box>

            <Paper elevation={10} style={paperStyle}>

                <Typography align='center' sx={{ margin: '20px 0px' }} variant='h4'>SignUp as Doctor</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '15px' }}>
                    <Box>
                        <TextField
                            name='name'
                            value={formValues.name}
                            type='text'
                            label="Name"
                            variant="standard"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Box>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Departments</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant='standard'
                            name="department"
                            value={formValues.department}
                            onChange={handleChange}
                        >
                            {departments.map((dep, index) => (
                                <MenuItem key={index} value={dep}>{dep}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    <Box>
                        <TextField
                            name='password2'
                            value={formValues.password2}
                            type='password'
                            label="Confirm Password"
                            variant="standard"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Box>

                    <br />
                    <Button type='submit' variant='contained' sx={{ fontSize: '20px', lineHeight: '34px', fontWeight: '700', textTransform: 'none' }} fullWidth>Sign Up</Button>
                    <Typography align='center'>Already have an account? <Link color='primary' style={{ textDecoration: 'none' }} to='/loginasdoctor'>Log in</Link></Typography>
                    <Typography color="red" align='center'>{postData.email === "Email already exists" ? "Email already exists" : postData.password2 === "Passwords must match" ? "Passwords must match" : ''}</Typography>
                </form>
            </Paper>
        </Box>
    )
}

export default SignupasDoctor;





