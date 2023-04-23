import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Box, Container } from "@mui/material"
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Loginas from './pages/Loginas'
import Signupas from './pages/Signupas'
import SignupasDoctor from './pages/SignupasDoctor'
import SignupasPatient from './pages/SignupasPatient'
import LoginasDoctor from './pages/LoginasDoctor'
import LoginasPatient from './pages/LoginasPatient'
import Doctors from './pages/Doctors'
import ContactUs from './pages/ContactUs'
import Services from './pages/Services'
import DashboardD from './components/DashboardD'
import DashboardP from './components/DashboardP'
import { useLogin } from "./components/LoginContext";
import LabTest from './pages/LabTest'
import LoginasAdmin from './pages/LoginasAdmin'
import DashboardAdmin from './components/DashboardAdmin'




function App() {
  const { isLogedin, loginAs } = useLogin();
  const location = useLocation();
  const path = location.pathname;
  return (
    <div>
      <Container maxWidth="xl">
        {(path === '/loginasdoctor' || path === '/loginaspatient' || path === '/loginasadmin' || path === '/signupasdoctor' || path === '/signupaspatient') ? '' : <Navbar />}
        <Box mt={10}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/loginas' element={<Loginas />} />
            <Route path='/signupas' element={<Signupas />} />
            <Route path='/loginasdoctor' element={<LoginasDoctor />} />
            <Route path='/loginaspatient' element={<LoginasPatient />} />
            <Route path='/loginasadmin' element={<LoginasAdmin />} />
            <Route path='/signupasdoctor' element={<SignupasDoctor />} />
            <Route path='/signupaspatient' element={<SignupasPatient />} />
            <Route path='/about' element={<About />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/services' element={<Services />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/lab-test' element={<LabTest />} />
            <Route path={isLogedin ? '/dashboard' : '/'} element={loginAs == "doctor" ? <DashboardD /> : loginAs == "patient" ? <DashboardP /> : loginAs == "admin" ? <DashboardAdmin /> : ''} />
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Container>
    </div>
  )
}

export default App


