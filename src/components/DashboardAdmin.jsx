import React, { useEffect, useState } from 'react'
import { Box, CardContent, CardMedia, Grid, MenuItem, Typography } from '@mui/material';
import { Speed, PersonOutlineOutlined } from '@mui/icons-material';
import doctor from '../assets/doctor.jpg';
import DashboardMain from './DashboardMain';



const DashboardAdmin = () => {
    const [getOrder, setGetOrder] = useState([]);
    const [countOrder, setCountOrder] = useState([])
    const [switchScreen, setSwitchScreen] = useState("dashboard");


    const handleOrder = () => {
        fetch("https://ehealthcare-7fn3.onrender.com/api/getorder", { method: "GET" })
            .then(res => res.json())
            .then(data => setGetOrder(data))

        setSwitchScreen("orders");
    }
    const handleDashboard = () => {
        setSwitchScreen("dashboard");
    }

    useEffect(() => {
        fetch("https://ehealthcare-7fn3.onrender.com/api/getorder", { method: "GET" })
            .then(res => res.json())
            .then(data => setCountOrder(data))
    }, [])



    return (
        <>
            <Box sx={{ display: 'flex', marginX: '-25px', boxShadow: 3, height: '87vh' }}>
                <Box sx={{ bgcolor: '#FAFAFC', display: 'flex', flexDirection: 'column', flex: 0.5, rowGap: '20px' }}>
                    <Typography variant='h5' align='center' color="#1B71A1" pt={2} >Admin Dashboard</Typography>
                    <MenuItem onClick={handleDashboard} sx={{ mt: '80px', pl: '25px' }}><Speed sx={{ mr: '20px', color: '#1B71A1' }} /> Dashboard</MenuItem>
                    <MenuItem onClick={handleOrder} sx={{ pl: '25px' }} ><PersonOutlineOutlined sx={{ mr: '20px', color: '#1B71A1' }} />Lab Test Orders</MenuItem>
                </Box>
                <Box sx={{ flex: 2 }}>

                    {(() => {
                        switch (switchScreen) {
                            case 'dashboard':
                                return <DashboardMain />;
                            case 'orders':
                                return <div style={{ overflowY: 'scroll', height: '100%' }}>
                                    {getOrder.map((patient, index) => (
                                        <Box key={index} sx={{ bgcolor: "#FAFAFC", marginX: '10px', p: '15px', mb: '9px' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography>{patient.userAfterLogin[0].name}</Typography>
                                                <Typography>{new Date(patient.date).toLocaleDateString('en-GB')}</Typography>
                                                <Typography>₹ {patient.cartTotal}</Typography>
                                            </Box>
                                            <Grid container spacing={4} sx={{ pt: '15px' }}>
                                                {patient.items.map((item, index) => (
                                                    <Grid item key={index} xs={6}>
                                                        <Box sx={{ display: "flex", justifyContent: 'space-between', mb: '20px' }}>
                                                            <Typography>{item.name}</Typography>
                                                            <Typography>₹ {item.price}</Typography>
                                                        </Box>
                                                        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                                                            <Typography>{item.quantity}</Typography>
                                                            <Typography>₹ {item.itemTotal}</Typography>
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>

                                    ))}
                                </div>
                            default:
                                return 'foo';
                        }
                    })()}
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
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Box>
                                        <Typography align='center' variant='h6'>{countOrder?.length}</Typography>
                                        <Typography variant='h5'>Total Order</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DashboardAdmin;

