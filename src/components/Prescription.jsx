import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useLogin } from "../components/LoginContext";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuid } from 'uuid';


const Prescription = ({ selectedPatient }) => {
    const { userAfterLogin } = useLogin();
    const [prescriptionForDoc, setPrescriptionForDoc] = useState([]);

    const unique_id = uuid();

    const onAddPrescription = (e) => {
        e.preventDefault();

        const pname = e.target[0].value;
        const page = e.target[2].value;
        const psex = e.target[4].value;
        const doctor = e.target[6].value;
        const doctorEmail = e.target[8].value;
        const patientEmail = e.target[10].value;
        const mname = e.target[12].value;
        const munit = e.target[14].value;
        const mdos = e.target[16].value;


        const prescriptionValue = {
            patientName: pname,
            patientEmail: patientEmail,
            patientAge: page,
            patientSex: psex,
            doctor: doctor,
            doctorEmail: doctorEmail,
            medicines: [
                {
                    id: unique_id,
                    medicinesName: mname,
                    medicinesUnit: munit,
                    medicinesDos: mdos,
                    date: new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear()
                },
            ]

        }



        fetch('https://ehealthcare-7fn3.onrender.com/api/prescription', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prescriptionValue)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }

    useEffect(() => {
        fetch("https://ehealthcare-7fn3.onrender.com/api/getprescription", { method: "GET" })
            .then(res => res.json())
            .then(prescrData => setPrescriptionForDoc(prescrData.filter(presc => userAfterLogin[0]?.email == presc.doctoremail && selectedPatient.email == presc.patientemail)))

    }, [])

    const deleteMedicine = (id) => {
        console.log(id)
    }



    return (
        <>
            <form onSubmit={onAddPrescription}>
                <Grid container spacing={2} sx={{ mt: '5px', px: '7px' }}>
                    <Grid item xs={4}>
                        <TextField fullWidth type="text" value={selectedPatient.name} color="secondary" focused label="Patient's Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth type="text" value={selectedPatient.age} color="secondary" focused label="Age" variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth type="text" value={selectedPatient.sex} color="secondary" focused label="Gender" variant="outlined" />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField fullWidth type="text" value={selectedPatient.doctor} color="secondary" focused label="Doctor" variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth type="text" value={userAfterLogin[0]?.email} color="secondary" focused label="Doctor Email" variant="outlined" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth type="text" value={selectedPatient.email} color="secondary" focused label="Patient Email" variant="outlined" />
                    </Grid>
                </Grid>


                <Grid container spacing={2} sx={{ mt: '5px', px: '7px' }}>
                    <Grid item xs={3}>
                        <TextField required fullWidth type="text" color="secondary" focused label="Medicine Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField required fullWidth type="text" color="secondary" focused label="Unit (Tablet/Syrup)" variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField required fullWidth type="text" color="secondary" focused label="Dosage(Per Day)" variant="outlined" />
                    </Grid>
                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button fullWidth sx={{ paddingY: '9px' }} variant="contained" type="submit">Add Medicine</Button>
                    </Grid>
                </Grid>

                <TableContainer sx={{ height: '48vh' }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Medicine Name</TableCell>
                                <TableCell align="center">Unit (Tablet/Syrup)</TableCell>
                                <TableCell align="center">Dosage(Per Day)</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflowY: 'scroll' }}>
                            {prescriptionForDoc[0]?.medicine.map((presc, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{presc.medicinesName}</TableCell>
                                    <TableCell align="center">{presc.medicinesUnit}</TableCell>
                                    <TableCell align="center">{presc.medicinesDos}</TableCell>
                                    <TableCell align="center">{presc.date}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => deleteMedicine(presc.id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </form>
        </>
    )
}

export default Prescription