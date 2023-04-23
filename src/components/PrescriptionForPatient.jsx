import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from "../assets/medical-logo.png";

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff'
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#B2DDED'
    },
    headerText: {
        fontSize: '22px',
        color: '#1B71A1'
    }
});

const MyDoc = ({ prescriptionForPatient }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View>
                    <Text style={styles.headerText}>E Health Care</Text>
                    <Text>ehealthcare@gmail.com</Text>
                </View>
                <Image style={{ width: '50px' }} src={Logo} />
                <View>
                    <Text style={styles.headerText}>{prescriptionForPatient[0]?.doctor}</Text>
                    <Text>{prescriptionForPatient[0]?.doctoremail}</Text>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ color: '#00684A' }}>Patient Name: {prescriptionForPatient[0]?.patient}</Text>
                <Text style={{ color: '#00684A' }}>Age: {prescriptionForPatient[0]?.age}</Text>
                <Text style={{ color: '#00684A' }}>Sex: {prescriptionForPatient[0]?.sex}</Text>
            </View>
            <View style={{ margin: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#1B71A1' }}>ID</Text>
                    <Text style={{ color: '#1B71A1' }}>Medicine Name</Text>
                    <Text style={{ color: '#1B71A1' }}>Unit (Tablet/Syrup)</Text>
                    <Text style={{ color: '#1B71A1' }}>Dosage(Per Day)</Text>
                </View>
                <View style={{ flexDirection: 'column', marginTop: '15px', fontSize: '14px', fontWeight: '100' }}>
                    {prescriptionForPatient[0]?.medicine.map((presc, index) => (
                        <View key={index} style={{ display: 'flex', flexDirection: 'row' }} >
                            <Text style={{ width: '10%', marginBottom: '10px' }}>{index + 1}</Text>
                            <Text style={{ width: '40%', marginLeft: '40px', marginBottom: '10px' }}>{presc.medicinesName}</Text>
                            <Text style={{ width: '25%', marginLeft: '100px', marginBottom: '10px' }}>{presc.medicinesUnit}</Text>
                            <Text style={{ width: '25%', marginLeft: '100px', marginBottom: '10px' }}>{presc.medicinesDos}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);



const PrescriptionForPatient = ({ selectedDoctor }) => {
    const [prescriptionForPatient, setPrescriptionForPatient] = useState([]);

    useEffect(() => {
        fetch("https://ehealthcare-7fn3.onrender.com/api/getprescription", { method: "GET" })
            .then(res => res.json())
            .then(prescforPat => setPrescriptionForPatient(prescforPat.filter(presc => selectedDoctor.email == presc.patientemail && selectedDoctor.doctorEmail == presc.doctoremail)))
    }, [])


    return (
        <Box>
            <TableContainer sx={{ height: '73vh' }} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Medicine Name</TableCell>
                            <TableCell align="center">Unit (Tablet/Syrup)</TableCell>
                            <TableCell align="center">Dosage(Per Day)</TableCell>
                            <TableCell align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ overflowY: 'scroll' }}>
                        {prescriptionForPatient[0]?.medicine.map((presc, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{presc.medicinesName}</TableCell>
                                <TableCell align="center">{presc.medicinesUnit}</TableCell>
                                <TableCell align="center">{presc.medicinesDos}</TableCell>
                                <TableCell align="center">{presc.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'right', padding: '7px 0px 0px 0px', marginRight: '40px' }}>
                <PDFDownloadLink document={<MyDoc prescriptionForPatient={prescriptionForPatient} />} fileName="prescription.pdf">
                    {({ blob, url, loading, error }) =>
                        <Button sx={{ color: '#1B71A1' }} variant='outlined'>{loading ? 'Loading document...' : 'Download Prescription'}</Button>
                    }
                </PDFDownloadLink>
            </div>
        </Box>
    )
}

export default PrescriptionForPatient;
