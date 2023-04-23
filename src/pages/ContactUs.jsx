import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { LocationOn, Phone, Email } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useLogin } from "../components/LoginContext";

const ContactUs = () => {
    const { doctor, isLogedin, loginAs } = useLogin();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        department: '',
        doctor: '',
        date: '',
        name: '',
        phone: '',
        email: ''
    });
    const [errMesg, setErrMesg] = useState(null);

    const departments = ["Cardiology", "Dentistry", "Dermatology", "ENT", "Gastroenterology", "Medical Oncology", "Neurosurgery", "Urology", "Pathology", "Neurology", "Radiology", "Pulmonology (Chest & TB)", "Nephrology (Including Dialysis)", "General Medicine", "General & Laparoscopic Surgery", "Obst & Gynecology", "Orthopedics & Joint Replacement", "Surgical Oncology", "GI Surgery", "Pediatrics Surgery", "Physiotherapy and Rehabilitation Center"];

    const contactHedStyle = {
        fontSize: '30px',
        lineHeight: '34px',
        fontWeight: '700',
        color: '#081839'
    }
    const contactBodStyle = {
        fontSize: '18px',
        lineHeight: '30px',
        fontWeight: '400',
        color: '#666666'
    }
    const style = {
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        m: '100px auto 80px auto',
        p: 5,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            department: formValues.department,
            doctor: formValues.doctor,
            date: formValues.date,
            name: formValues.name,
            phone: formValues.phone,
            email: formValues.email
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };
        isLogedin ? fetch('http://localhost:5000/api/appointment', requestOptions)
            .then(res => res.json())
            .then(data => {
                data.email === "Email already exists" ? setErrMesg(true) : toast.success("Appointment has been schedule")
                data.email !== "Email already exists" && setFormValues({
                    department: '',
                    doctor: '',
                    date: '',
                    name: '',
                    phone: '',
                    email: ''
                });
                data.email !== "Email already exists" && setErrMesg(false)
            })
            .catch(err => {
                console.log(err)
            }) : navigate("/loginaspatient")


    }

    return (
        <div>
            <Typography sx={{ fontSize: '18px', lineHeight: '20px', fontWeight: '700', color: '#1bbde4', paddingTop: '20px' }} align="center">Get in touch</Typography>
            <Typography sx={{ fontSize: '54px', lineHeight: '60px', fontWeight: '700', color: '#081839' }} align="center">Call now or write a message</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', paddingTop: '25px' }}>
                <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '5px' }}>
                    <LocationOn fontSize="large" />
                    <Typography sx={contactHedStyle}>Our Location</Typography>
                    <Typography sx={contactBodStyle}>Calgiri Road, Malviya Nagar Jaipur, Rajasthan, India 302017</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '5px' }}>
                    <Phone fontSize="large" />
                    <Typography sx={contactHedStyle}>Phone Number</Typography>
                    <Typography sx={contactBodStyle}>Emergency Cases</Typography>
                    <Typography sx={contactBodStyle}>+91 89550 00333</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '5px' }}>
                    <Email fontSize="large" />
                    <Typography sx={contactHedStyle}>Email Address</Typography>
                    <Typography sx={contactBodStyle}>dmm@rungtahospital.com</Typography>
                </Box>
            </Box>

            {loginAs !== 'doctor' ? <Box sx={style}>
                <Typography align='center' sx={{ paddingBottom: '13px' }} variant='h4'>Make An Appointment!</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Departments</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant='standard'
                            name='department'
                            value={formValues.department}
                            onChange={handleChange}
                        >
                            {departments.map((dep, index) => (
                                <MenuItem key={index} value={dep}>{dep}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Name of Doctors</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant='standard'
                            value={formValues.doctor}
                            name='doctor'
                            onChange={handleChange}
                        >
                            {doctor?.filter(fdoc => formValues.department == fdoc.department).map((doc, index) => (
                                <MenuItem key={index} value={doc.name}>{doc.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {doctor?.filter(fdoc => formValues.doctor == fdoc.name).map((doc, index) => (
                        <input key={index} type="hidden" name="doctoremail" value={doc.email} />
                    ))}

                    <Box sx={{ paddingTop: '13px' }}>
                        <TextField
                            name='date'
                            type='date'
                            variant="standard"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Box>

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
                    <Box>
                        <TextField
                            name='email'
                            value={formValues.email}
                            type='text'
                            label="Email"
                            variant="standard"
                            fullWidth
                            required
                        />
                    </Box>
                    <Box>
                        <TextField
                            name='age'
                            value={formValues.age}
                            type='tel'
                            label="Age"
                            variant="standard"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant='standard'
                            value={formValues.sex}
                            name='sex'
                            onChange={handleChange}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="transgender">Transgender</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type='submit' sx={{ marginTop: '20px' }} variant='contained'>Make An Appointment</Button>
                    {errMesg && <Typography color="red" align='center'>You already appointment with this doctor</Typography>}
                </form>
            </Box> : ''}

            <ToastContainer />

        </div>
    )
}

export default ContactUs