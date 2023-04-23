import { Box, Grid, Typography } from '@mui/material';
import { Vaccines, Duo, Description, MedicationLiquid, LocalHospital } from '@mui/icons-material';
import service24 from "../assets/24x7.jpg";


const Services = () => {
    return (
        <>
            <Box pt={10}>
                <Grid container spacing={10}>
                    <Grid item xs={4}>
                        <Vaccines fontSize='large' sx={{ textAlign: 'center', color: '#2F5BB9' }} />
                        <Typography color="#1B71A1" variant='h5'>Report and Test</Typography>
                        <Typography variant='body1' color="GrayText">Unable to come to the Lab? Don't worry. We will collect your sample from your home.</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalHospital fontSize='large' sx={{ textAlign: 'center', color: '#2F5BB9' }} />
                        <Typography color="#1B71A1" variant='h5'>Appointment with Doctor</Typography>
                        <Typography variant='body1' color="GrayText">
                            Make an Appointment with your favorite Doctor
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <MedicationLiquid fontSize='large' sx={{ textAlign: 'center', color: '#2F5BB9' }} />
                        <Typography color="#1B71A1" variant='h5'>Buy Medicine</Typography>
                        <Typography variant='body1' color="GrayText">
                            No need to go to the Medicine store purchase Medicines from Here
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Duo fontSize='large' color='info' sx={{ textAlign: 'center' }} />
                        <Typography color="#1B71A1" variant='h5'>Video call with doctor</Typography>
                        <Typography variant='body1' color="GrayText">
                            One on One video call Available.
                            You can connect doctor with Video or Audio Call.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Description fontSize='large' sx={{ textAlign: 'center', color: '#2F5BB9' }} />
                        <Typography color="#1B71A1" variant='h5'>Online Prescription</Typography>
                        <Typography variant='body1' color="GrayText">
                            No need to Carry Prescription. Online Prescription is available. Just you need to login and access it.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={service24} alt="24x7" width={40} height={40} />
                        <Typography color="#1B71A1" variant='h5'>24x7 Services</Typography>
                        <Typography variant='body1' color="GrayText">
                            24×7 customer support. Any time you can Connect US
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Services