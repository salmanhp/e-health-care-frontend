import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import Doctor from "../assets/doctor.jpeg";
import { useLogin } from "../components/LoginContext";


const Doctors = () => {
    const { setDoctor } = useLogin();
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("https://ehealthcare-7fn3.onrender.com/api/doctors", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setDoctors(data)
                setDoctor(data)
            })
    }, [])


    return (
        <>
            <Box p={5}>
                <Grid container spacing={2}>
                    {doctors?.map((doctor, index) => (
                        <Grid item key={index} xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '15px' }}>
                            <img src={Doctor} alt="doctor" style={{ width: '150px', borderRadius: '50%' }} />
                            <Typography sx={{ fontSize: '22px', lineHeight: '28px', fontWeight: '700', color: '#081839' }}>{doctor.name}</Typography>
                            <Typography sx={{ fontSize: '15px', lineHeight: '24px', fontWeight: '400', color: '#074aad' }}>MBBS, {doctor.department}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </>
    )
}

export default Doctors