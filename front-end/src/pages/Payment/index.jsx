import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentMethod from './components/PaymentMethod';
import OrderSummary from './components/OrderSummary';
import momoApi from '../../services/apis/momoApi';
import { toast } from 'react-toastify';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState("COD");

    useEffect(() => {
        if (location.state?.products) {
            setProducts(location.state.products);
        }
    }, [location.state]);

    const calculateTotal = () => {
        return products.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            const total = calculateTotal();
            
            if (phuongThucThanhToan === "MOMO") {
                const orderInfo = `Thanh toán đơn hàng từ Stationery Store - Tổng tiền: ${total.toLocaleString('vi-VN')}đ`;
                const response = await momoApi.createPayment(total, orderInfo);
                
                if (response.payUrl) {
                    window.location.href = response.payUrl;
                } else {
                    toast.error('Không thể tạo thanh toán MoMo');
                }
            } else {
                // Xử lý thanh toán COD ở đây
                toast.success('Đặt hàng thành công!');
                navigate('/');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Có lỗi xảy ra khi thanh toán');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{mt:10, p: 3 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/gio-hang')}
                sx={{ mb: 3 }}
            >
                Quay lại giỏ hàng
            </Button>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <PaymentMethod 
                        phuongThucThanhToan={phuongThucThanhToan} 
                        setPhuongThucThanhToan={setPhuongThucThanhToan} 
                    />
                </Grid>

                <Grid item xs={12} md={9}>
                    <OrderSummary 
                        products={products}
                        total={calculateTotal()}
                        onPayment={handlePayment}
                        loading={loading}
                        paymentMethod={phuongThucThanhToan}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Payment;