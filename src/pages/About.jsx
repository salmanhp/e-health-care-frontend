import { Box, Typography } from "@mui/material"
import aboutImg from '../assets/about_img.webp'

const About = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingTop: '40px' }}>
            <Box sx={{ width: '500px' }}>
                <img src={aboutImg} alt="aboutus_img" />
            </Box>
            <Box sx={{ width: '500px' }}>
                <Typography sx={{ fontSize: '42px', lineHeight: '50px', fontWeight: '600', color: '#242429' }}>Our Patients Are at the Centre of Everything We Do</Typography>
                <Typography sx={{ fontSize: '14px', lineHeight: '27px', fontWeight: '400', color: '#888888' }}>
                    Kind lesser bring said midst they're created signs made the beginni years created Beast upon whales herb seas evening she'd day green dominion evening in moved have fifth in won't in darkness fruitful god behold whos without bring created creature.
                </Typography>
            </Box>
        </Box>
    )
}

export default About

