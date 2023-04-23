import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';


const Loginas = () => {
    return (
        <Box sx={{ display: 'flex', height: '87vh', boxShadow: 7 }}>
            <Box sx={{ bgcolor: '#EAF7EE', marginLeft: '-20px', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '36px', lineHeight: '48px', fontWeight: '300' }}>For <span style={{ color: '#1B71A1' }}>Doctors</span></Typography>
                <Link to="/loginasdoctor" style={{ textDecoration: 'none', margin: '15px 0px' }}>
                    <Button variant='contained' sx={{ padding: '10px 80px', bgcolor: "#1B71A1", ":hover": { bgcolor: '#327fab' } }}>Log In</Button>
                </Link>
                <Typography sx={{ fontSize: '18px', lineHeight: '24px', fontWeight: '300' }}>Don't have account? <Link to="/signupasdoctor">sign up</Link></Typography>
            </Box>
            <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '36px', lineHeight: '48px', fontWeight: '300' }}>For <span style={{ color: '#068932' }}>Patients</span></Typography>
                <Link to="/loginaspatient" style={{ textDecoration: 'none', margin: '7px 0px' }}>
                    <Button variant='contained' sx={{ padding: '10px 80px', bgcolor: "#068932", ":hover": { bgcolor: '#05ab3d' } }}>Log In</Button>
                </Link>
                <Typography sx={{ fontSize: '18px', lineHeight: '24px', fontWeight: '300' }}>Don't have account? <Link to="/signupaspatient">sign up</Link></Typography>
            </Box>
            <Box sx={{ bgcolor: '#EAF7EE', marginRight: '-20px', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '36px', lineHeight: '48px', fontWeight: '300' }}>For <span style={{ color: '#097bbf' }}>Admin</span></Typography>
                <Link to="/loginasadmin" style={{ textDecoration: 'none', margin: '7px 0px' }}>
                    <Button variant='contained' sx={{ bgcolor: '#B2DDED', color: '#000', padding: '10px 80px', ":hover": { bgcolor: '#c3e9f7' } }}>Log In</Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Loginas

