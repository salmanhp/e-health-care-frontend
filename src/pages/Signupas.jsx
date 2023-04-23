import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';


const Signupas = () => {
    return (
        <Box sx={{ display: 'flex', height: '87vh' }}>
            <Box sx={{ bgcolor: '#EAF7EE', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '36px', lineHeight: '48px', fontWeight: '300' }}>For <span style={{ color: '#068932' }}>Doctors</span></Typography>
                <Link to="/signupasdoctor" style={{ textDecoration: 'none', margin: '15px 0px' }}>
                    <Button variant='contained' sx={{ padding: '10px 80px', bgcolor: "#068932", ":hover": { bgcolor: '#05ab3d' } }}>Sign Up</Button>
                </Link>
                <Typography sx={{ fontSize: '18px', lineHeight: '24px', fontWeight: '300' }}>Already have account? <Link to="/login">Log In</Link></Typography>
            </Box>
            <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '36px', lineHeight: '48px', fontWeight: '300' }}>For <span style={{ color: '#097bbf' }}>Patients</span></Typography>
                <Link to="/signupaspatient" style={{ textDecoration: 'none', margin: '7px 0px' }}>
                    <Button variant='outlined' sx={{ padding: '10px 80px' }}>Sign Up</Button>
                </Link>
                <Typography sx={{ fontSize: '18px', lineHeight: '24px', fontWeight: '300' }}>Already have account? <Link to="/login">Log In</Link></Typography>
            </Box>
        </Box>
    )
}

export default Signupas

