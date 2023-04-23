import React, { useState } from 'react'
import { useLogin } from "../components/LoginContext";
import { Box, CardContent, CardMedia, Chip, MenuItem, Typography } from '@mui/material';
import { Speed, PersonOutlineOutlined, InfoOutlined } from '@mui/icons-material';
import Prescription from './Prescription';
import Chat from './Chat';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import doctor from '../assets/doctor.jpg';
import DashboardMain from './DashboardMain';


const DashboardD = () => {

    const { userAfterLogin, selectedPatient, setSelectedPatient } = useLogin();
    const [appointment, setAppointment] = useState([]);
    const [switchScreen, setSwitchScreen] = useState("dashboard");
    const [switchContact, setSwitchContact] = useState("");



    const handlePatient = () => {
        userAfterLogin[0].department && fetch("https://ehealthcare-7fn3.onrender.com/api/getappointment", { method: "GET" })
            .then(res => res.json())
            .then(data => setAppointment(data.filter(appointment => userAfterLogin[0]?.name == appointment.doctor)))

        setSwitchScreen("patients");
        setSwitchContact("");
    }
    const handleDashboard = () => {
        setSwitchScreen("dashboard");
        setSwitchContact("");
    }
    const handleAboutPatient = (value) => {
        setSwitchScreen("patientDetails");
        setSwitchContact("chat");
        setSelectedPatient(value);
    }
    const handlePrescription = () => {
        setSwitchContact("pescription");
    }
    const handleChat = () => {
        setSwitchContact("chat");
    }



    return (
        <>
            <Box sx={{ display: 'flex', marginX: '-25px', boxShadow: 3, height: '87vh' }}>
                <Box sx={{ bgcolor: '#FAFAFC', display: 'flex', flexDirection: 'column', flex: 0.5, rowGap: '20px' }}>
                    <Typography variant='h5' align='center' color="#1B71A1" pt={2} >Doctor Dashboard</Typography>
                    <MenuItem onClick={handleDashboard} sx={{ mt: '80px', pl: '25px' }}><Speed sx={{ mr: '20px', color: '#1B71A1' }} /> Dashboard</MenuItem>
                    <MenuItem onClick={handlePatient} sx={{ pl: '25px' }} ><PersonOutlineOutlined sx={{ mr: '20px', color: '#1B71A1' }} /> Patients</MenuItem>
                </Box>
                <Box sx={{ flex: 2 }}>

                    {(() => {
                        switch (switchScreen) {
                            case 'dashboard':
                                return <DashboardMain />;
                            case 'patients':
                                return appointment.map((patient, index) => (
                                    <MenuItem onClick={() => handleAboutPatient(patient)} key={index} sx={{ display: 'flex', justifyContent: 'space-between', paddingY: '22px' }}>
                                        <Typography>{patient.name}</Typography>
                                        <Typography>{new Date(patient.date).toLocaleDateString('en-GB')}</Typography>
                                    </MenuItem>
                                ));
                            case 'patientDetails':
                                return <Box sx={{ display: 'flex', boxShadow: 5 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                        <MenuItem sx={{ width: '100%', paddingY: '13px' }} onClick={handlePrescription} variant='h1'>Prescription</MenuItem>
                                        {switchContact == "pescription" ? <div style={{ border: '1.5px solid #1B71A1' }}></div> : ''}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                        <MenuItem sx={{ width: '100%', paddingY: '13px' }} onClick={handleChat} variant='h1'>Chat</MenuItem>
                                        {switchContact == "chat" ? <div style={{ border: '1.5px solid #1B71A1' }}></div> : ''}
                                    </Box>
                                </Box>;
                            default:
                                return 'foo';
                        }
                    })()}
                    {switchContact == "pescription" ? <Prescription selectedPatient={selectedPatient} /> :
                        switchContact == "chat" ? <Chat selectedPatient={selectedPatient} /> : ''
                    }
                </Box>
                <Box sx={{ bgcolor: '#FAFAFC', flex: 0.7 }}>
                    <Box>
                        <CardMedia
                            component="img"
                            height="100"
                            image="https://wallpaper.dog/large/20499790.jpg"
                            style={{ color: 'red', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}
                        />
                        <CardContent>
                            <img style={{ position: 'relative', left: '42%', bottom: '50px', borderRadius: '50%', border: '5px solid white' }} src={doctor} width={80} height={80} alt="Women" />
                            <Box>
                                <Box sx={{ position: 'relative', bottom: '40px', textAlign: 'center' }}>
                                    <Typography variant='h6' sx={{ color: '#081839' }}>{userAfterLogin[0]?.name}</Typography>
                                    <Typography variant='caption' sx={{ fontWeight: '400', color: '#074aad' }}>MBBS, {userAfterLogin[0]?.department}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Box>
                                        <Typography align='center' variant='h6'>21</Typography>
                                        <Typography variant='caption'>Total Patients</Typography>
                                    </Box>
                                    <div style={{ width: '1px', backgroundColor: 'lightgray' }}></div>
                                    <Box>
                                        <Typography align='center' variant='h6'>4.8</Typography>
                                        <Typography variant='caption'>Overall Rating</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>
                    <div style={{ height: '1px', width: '90%', backgroundColor: 'lightgray', margin: 'auto' }}></div>

                    <Box sx={{ paddingX: '15px', marginTop: '10px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h6'>Earning</Typography>
                            <InfoOutlined />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <SemiCircleProgressBar strokeWidth={15} stroke='#27ba57' percentage={76} showPercentValue />
                        </Box>
                        <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                            <Typography variant='h6'>₹ 26,256</Typography>
                            <Typography variant='caption'>Earning This Month</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', columnGap: '10px' }}>

                            <Chip size="small" sx={{ bgcolor: '#daedda', color: 'green' }} label="+2.65%" />
                            <Typography>From Previous Period</Typography>
                        </Box>
                    </Box>


                </Box>

            </Box>
        </>
    )
}

export default DashboardD

