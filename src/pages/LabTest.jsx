import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { ShoppingCart, Delete, Science, Add, Remove } from '@mui/icons-material';
import { useCart } from "react-use-cart";
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from "../components/LoginContext";



const LabTest = () => {
    const { isLogedin, userAfterLogin } = useLogin();
    const navigate = useNavigate();
    const {
        addItem,
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        emptyCart
    } = useCart();


    const products = [
        {
            id: 1,
            name: 'HbA1c (Glycosylated Hemoglobin)',
            price: 399
        },
        {
            id: 2,
            name: 'Blood Group',
            price: 349
        },
        {
            id: 3,
            name: 'Urine test',
            price: 199
        },
        {
            id: 4,
            name: 'Sugar test',
            price: 199
        },
        {
            id: 5,
            name: 'Thyroid test',
            price: 949
        },
        {
            id: 6,
            name: 'Biopsy test',
            price: 4000
        },
        {
            id: 7,
            name: 'Cholesterol test',
            price: 450
        },
        {
            id: 8,
            name: 'CT scan',
            price: 1500
        },
        {
            id: 9,
            name: 'FNAC',
            price: 1200
        },
        {
            id: 10,
            name: 'HIV test',
            price: 1000
        },
        {
            id: 11,
            name: 'Protein test',
            price: 1900
        },
        {
            id: 12,
            name: 'X Ray',
            price: 139
        },
        {
            id: 13,
            name: 'Vitamin test',
            price: 3000
        }
    ];

    const [currentLocation, setCurrentLocation] = useState({});

    useEffect(() => {
        getLocation();
    }, [])

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
        })
    }

    const handleOrder = (value) => {

        if (isLogedin) {
            fetch('https://ehealthcare-7fn3.onrender.com/api/order', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(value)
            })
                .then(res => res.json())
                .then(data => console.log(data))


            emptyCart()
        }
        else {
            navigate("/loginaspatient")
        }
    }




    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ width: '50%' }}>
                <Typography sx={{ marginY: '20px', fontSize: '26px', lineHeight: '33px', fontWeight: '700' }}>Lab Tests</Typography>
                {products?.map((testd) => (
                    <Box key={testd.id} sx={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between', marginBottom: '20px', padding: '20px', border: '1px solid #DFE3E6', borderRadius: '10px', ":hover": { borderColor: 'rgb(178,221,237)' } }}>
                        <Box sx={{ display: 'flex' }}>
                            <Science fontSize='large' sx={{ paddingRight: '9px', color: '#90CAF9' }} />
                            <Box>
                                <Typography sx={{ fontSize: '16px', lineHeight: '21px', fontWeight: '700' }}>{testd.name}</Typography>
                                <Typography sx={{ fontSize: '16px', lineHeight: '21px', fontWeight: '600' }}>₹{testd.price}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Button id="myCheck" onClick={() => addItem(testd)} sx={{ paddingX: '35px', bgcolor: '#1B71A1', ":hover": { bgcolor: '#408db8' } }} variant='contained'>Select</Button>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box sx={{ width: '35%' }}>
                <Typography color='GrayText' sx={{ borderBottom: '1px solid #DFE3E6', paddingY: '20px' }} variant='body1'>Order Summary</Typography>
                <Box sx={{ paddingY: '13px', borderBottom: '1px solid #DFE3E6', display: 'flex', justifyContent: 'space-between' }}>
                    <ShoppingCart />
                    <Typography color='GrayText' variant='body1'>{totalUniqueItems} Item{totalUniqueItems > 1 ? "s" : ""} in Cart</Typography>
                </Box>
                {items?.map((item) => (
                    <Box key={item.id} sx={{ paddingY: '13px', borderBottom: '1px solid #DFE3E6', display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography color='GrayText' variant='body1'>{item.name}</Typography>
                            <Typography color='GrayText' variant='body1'>₹{item.price}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                                <Remove />
                            </IconButton>
                            <Typography>{item.quantity}</Typography>
                            <IconButton
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                                <Add />
                            </IconButton>
                            <IconButton onClick={() => removeItem(item.id)}>
                                <Delete fontSize='large' sx={{ marginLeft: '7px' }} />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
                {isEmpty ? <Typography color='GrayText' sx={{ paddingY: '13px', marginBottom: '5px' }}>Please select a test to proceed</Typography> :
                    <Box sx={{ paddingY: '13px', display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <Typography color='GrayText' variant='body1'>Total</Typography>
                        <Typography color='GrayText' variant='body1'>₹{cartTotal}</Typography>
                    </Box>
                }
                <Link to="/checkout">
                    <Button disabled={isEmpty && true} onClick={() => handleOrder({ items, cartTotal, userAfterLogin, currentLocation })} variant='contained' sx={{ bgcolor: '#1B71A1', ":hover": { bgcolor: '#408db8' } }} fullWidth >Proceed</Button>
                </Link>
            </Box>
        </div>
    )
}

export default LabTest