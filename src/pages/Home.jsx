import { Typography, Box, Button, Modal, TextField, MenuItem, InputLabel, Select, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import family from "../assets/family.png";
import wave from '../assets/wave.png';
import { useLogin } from "../components/LoginContext";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alanBtn from "@alan-ai/alan-sdk-web";


const alnKey = "7db0621e8aaeb7f894687a44619f020e2e956eca572e1d8b807a3e2338fdd0dc/stage"

const Home = () => {
    const { isLogedin, loginAs, doctor, userAfterLogin } = useLogin();
    const navigate = useNavigate();

    const patientEmail = loginAs == "patient" ? userAfterLogin && userAfterLogin[0]?.email : "";

    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        department: '',
        doctor: '',
        doctorEmail: '',
        name: '',
        email: patientEmail,
        age: '',
        sex: ''
    });
    const [errMesg, setErrMesg] = useState(null);


    useEffect(() => {
        alanBtn({
            key: alnKey,
            onCommand: ({ command }) => {
                switch (command) {
                    case "getDoctor":
                        navigate("/doctors");
                        break;
                    case "serviceSection":
                        navigate("/services");
                        break;
                    case "aboutSection":
                        navigate("/about");
                        break;
                    case "doctorSection":
                        navigate("/doctors");
                        break;
                    case "contactSection":
                        navigate("/contactus");
                        break;
                    case "homeSection":
                        navigate("/");
                        break;
                    case "labTest":
                        navigate("/lab-test");
                        break;
                    case "orderMedicines":
                        window.location.replace('https://healthplus.flipkart.com/');
                        break;
                    case "DiseasePredict":
                        window.location.replace('http://localhost:8501/');
                        break;
                    case "loginPage":
                        navigate("/loginas");
                        break;
                    case "loginasDoctor":
                        navigate("/loginasdoctor");
                        break;
                    case "loginasPatient":
                        navigate("/loginaspatient");
                        break;
                    case "loginasAdmin":
                        navigate("/loginasadmin");
                        break;
                    case "signupPage":
                        navigate("/signupas");
                        break;
                    case "signupasDoctor":
                        navigate("/signupasdoctor");
                        break;
                    case "signupasPatient":
                        navigate("/signupaspatient");
                        break;
                    case "makeAppointment":
                        navigate("/contactus");
                        break;
                    default:
                        console.log("I have no data about this screen");
                }

            },
        })
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleClick = () => {
        isLogedin ? setOpen(true) : navigate("/loginaspatient")
    }


    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            department: formValues.department,
            doctor: formValues.doctor,
            doctorEmail: e.target[2].value,
            date: formValues.date,
            name: formValues.name,
            email: formValues.email,
            age: formValues.age,
            sex: formValues.sex
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };
        fetch('https://ehealthcare-7fn3.onrender.com/api/appointment', requestOptions)
            .then(res => res.json())
            .then(data => {
                data.email === "You already appointment with this doctor" ? setErrMesg(true) && setOpen(true) : toast.success("Appointment has been schedule") && setOpen(false)
                data.email !== "You already appointment with this doctor" && setFormValues({
                    department: '',
                    doctor: '',
                    date: '',
                    name: '',
                    email: patientEmail,
                    age: '',
                    sex: ''
                });
                data.email !== "You already appointment with this doctor" && setErrMesg(false)
            })
            .catch(err => {
                console.log(err)
            })


    }

    const departments = ["Cardiology", "Dentistry", "Dermatology", "ENT", "Gastroenterology", "Medical Oncology", "Neurosurgery", "Urology", "Pathology", "Neurology", "Radiology", "Pulmonology (Chest & TB)", "Nephrology (Including Dialysis)", "General Medicine", "General & Laparoscopic Surgery", "Obst & Gynecology", "Orthopedics & Joint Replacement", "Surgical Oncology", "GI Surgery", "Pediatrics Surgery", "Physiotherapy and Rehabilitation Center"];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 5,
    };


    return (
        <>
            <div style={{ backgroundImage: `url(${wave})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', margin: "-6px -32px 0px -32px" }}>
                <Box sx={{ paddingTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Box>
                        <Typography sx={{ fontSize: '48px', lineHeight: '57px', fontWeight: '300', color: '#283779' }}>We're <span style={{ fontSize: '48px', lineHeight: '57px', fontWeight: '600', color: '#283779' }}>determined</span> for</Typography>
                        <Typography sx={{ fontSize: '48px', lineHeight: '57px', fontWeight: '300', color: '#283779' }}>your <span style={{ fontSize: '48px', lineHeight: '57px', fontWeight: '600', color: '#283779' }}>better</span> life.</Typography>
                        <Typography sx={{ fontSize: '19px', lineHeight: '29px', fontWeight: '400', color: '#1b71a1' }}>You can get the care you need 24/7 – be it online or in</Typography>
                        <Typography sx={{ fontSize: '19px', lineHeight: '29px', fontWeight: '400', color: '#1b71a1' }}>person. You will be treated by caring specialist doctors.</Typography><br /><br />
                        {loginAs === 'doctor' ? "" :
                            <Button onClick={handleClick} variant='contained' sx={{ ":hover": { bgcolor: '#283779' }, bgcolor: '#283779', borderRadius: '50px', padding: '15px 50px', textTransform: 'none', fontSize: '16px', lineHeight: '24px', fontWeight: '700', color: '#fffefe' }}>Make an Appointment</Button>
                        }
                    </Box>
                    <img width={550} src={family} alt="family" />
                </Box>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
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
                    </Box>
                </Modal>
            </div>
            <ToastContainer />



        </>
    )
}

export default Home