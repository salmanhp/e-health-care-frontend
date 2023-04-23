import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import { LineChart } from './LineChart';
import { useLogin } from "../components/LoginContext";



const DashboardMain = () => {
    const { userAfterLogin, loginAs } = useLogin();
    const [appointment, setAppointment] = useState([]);
    const [appointment2, setAppointment2] = useState([]);
    const [getOrder, setGetOrder] = useState([])

    useEffect(() => {
        loginAs == "doctor" && fetch("https://ehealthcare-7fn3.onrender.com/api/getappointment", { method: "GET" })
            .then(res => res.json())
            .then(data => setAppointment(data.filter(appointment => userAfterLogin[0]?.name == appointment.doctor)))


        loginAs == "patient" && fetch("https://ehealthcare-7fn3.onrender.com/api/getappointment", { method: "GET" })
            .then(res => res.json())
            .then(data => setAppointment2(data.filter(appointment2 => userAfterLogin[0]?.email == appointment2.email)))


        loginAs == "admin" && fetch("https://ehealthcare-7fn3.onrender.com/api/getorder", { method: "GET" })
            .then(res => res.json())
            .then(data => setGetOrder(data))


    }, [])

    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '20px', paddingTop: '25px' }}>
                    <Typography variant='h5'>Dashboard</Typography>
                    <Typography color="gray">Monday, 27 March, 2023</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '50px', mt: '30px' }}>
                    <Typography sx={{ width: '350px' }}>
                        <Typography mb={1} color="#074aad" variant='h4'>Welcome {userAfterLogin[0]?.name}!</Typography>
                        You have <b>some {loginAs == "doctor" ? "patients" : loginAs == "patient" ? "Appointment" : loginAs == "admin" ? "Lab Test Order" : ""}</b> remaining today!<br />
                        {loginAs == "doctor" ? "Remember to check documentation before call." : ""}
                    </Typography>
                    <img width="30%" src="https://media.istockphoto.com/id/874103026/photo/heart-stethoscope.jpg?s=612x612&w=0&k=20&c=tjQ8Y2R-x4LToTYHbGBUZ41AlZQLbHO2ixqXQOzwrUw=" alt="stes" />
                </Box>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '7px' }}>
                <Box sx={{ mx: '20px', bgcolor: "#FAFAFC", width: '50%' }}>
                    <Typography p={1} sx={{ fontWeight: 'bold' }}>{loginAs == "doctor" ? "Today's Appointments" : loginAs == "patient" ? "Don't miss your Appointment with the doctor" : loginAs == "admin" ? "Lab Test Order List" : ""}</Typography>
                    {loginAs == "doctor" ? appointment?.map((patient, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid lightgray', p: '15px' }}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '13px' }}>
                                <Person color='info' />
                                <Typography sx={{ fontWeight: '400' }}>{patient.name}</Typography>
                            </Typography>
                            <Typography sx={{ fontWeight: '400' }}>{new Date(patient.date).toLocaleDateString('en-GB')}</Typography>
                        </Box>
                    )) : loginAs == "patient" ?
                        appointment2?.map((patient, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid lightgray', p: '15px' }}>
                                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '13px' }}>
                                    <Person color='info' />
                                    <Typography sx={{ fontWeight: '400' }}>{patient.doctor}</Typography>
                                </Typography>
                                <Typography sx={{ fontWeight: '400' }}>{new Date(patient.date).toLocaleDateString('en-GB')}</Typography>
                            </Box>))
                        : loginAs == "admin" ?
                            getOrder?.map((patient, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid lightgray', p: '15px' }}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '13px' }}>
                                        <Person color='info' />
                                        <Typography sx={{ fontWeight: '400' }}>{patient.userAfterLogin[0]?.name}</Typography>
                                    </Typography>
                                    <Typography sx={{ fontWeight: '400' }}>₹ {patient.cartTotal}</Typography>
                                    <Typography sx={{ fontWeight: '400' }}>{new Date(patient.date).toLocaleDateString('en-GB')}</Typography>
                                </Box>))
                            : ""}
                </Box>
                {loginAs == "doctor" ? <Box sx={{ mx: '20px', width: '50%' }}>
                    <Box sx={{ bgcolor: '#FAFAFC' }}>
                        <Typography p={1}>Revenue</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingY: '10px' }}>
                            <Box>
                                <Typography variant='h5'>₹ 26,256</Typography>
                                <Typography variant='caption'>This Month</Typography>
                            </Box>
                            <div style={{ width: '1px', backgroundColor: 'lightgray' }}></div>
                            <Box>
                                <Typography variant='h5'>₹ 850</Typography>
                                <Typography variant='caption'>This Week</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ bgcolor: '#FAFAFC', mt: '15px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }}>
                            <Typography>Analytics</Typography>
                            <Typography>Weekly</Typography>
                        </Box>
                        <LineChart />
                    </Box>
                </Box> : ''}
            </Box>
        </>
    )
}

export default DashboardMain;

