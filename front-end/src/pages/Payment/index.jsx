import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Grid, Paper, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentMethod from './components/PaymentMethod';
import OrderSummary from './components/OrderSummary';
import paymentApi from '../../services/apis/paymentApi';
import { toast } from 'react-toastify';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.products) {
            setProducts(location.state.products);
        }
    }, [location.state]);

    const calculateTotal = () => {
        return products.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/cart')}
                sx={{ mb: 3 }}
            >
                Quay lại giỏ hàng
            </Button>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <PaymentMethod />
                </Grid>

                <Grid item xs={12} md={9}>
                    <OrderSummary 
                            products={products}
                            total={calculateTotal()}
                        />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Payment;