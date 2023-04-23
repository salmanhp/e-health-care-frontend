import axios from 'axios';
import { useState } from 'react';

const CheckoutForm = () => {
    const [paymentLink, setPaymentLink] = useState(null);

    const handlePayment = async (event) => {
        event.preventDefault();

        const { data } = await axios.post('/create-payment-order', {
            amount: 1000, // Replace with the actual amount
        });

        const { order } = data;

        setPaymentLink(order.paymentLink);
    };

    if (paymentLink) {
        window.location.href = paymentLink;
    }

    return (
        <form onSubmit={handlePayment}>
            <button type="submit">Pay</button>
        </form>
    );
};

export default CheckoutForm;
