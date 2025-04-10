import { Box, Typography, Card, CardContent, Grid, Divider, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');
    const message = searchParams.get('message');

    useEffect(() => {
        console.log(success, message);
        // if (success === 'false') {
        //     toast.error(message || 'Thanh toán thất bại');
        //     navigate('/thanh-toan/that-bai');
        //     return;
        // }

        // const pendingOrder = localStorage.getItem('pendingOrder');
        // if (!pendingOrder) {
        //     toast.error('Không tìm thấy thông tin đơn hàng');
        //     navigate('/thanh-toan/that-bai');
        //     return;
        // }

        // // Xóa thông tin đơn hàng đã lưu
        // localStorage.removeItem('pendingOrder');
    }, [success, message, navigate]);

    const orderData = JSON.parse(localStorage.getItem('pendingOrder') || '{}');
    const { products = [], delivery_fee = 0, total_price = 0 } = orderData;

    const formatCurrency = (amount) => {
        if (isNaN(amount) || amount === 0) {
            return '0 ₫';
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        }).format(amount);
    };

    const numericTotal = typeof total_price === 'number' ? total_price : 0;
    const numericDeliveryFee = typeof delivery_fee === 'number' ? delivery_fee : 0;
    const totalPaid = numericTotal + numericDeliveryFee;

    const customerName = "Bạn";
    const receiptVoucher = "";

    if (success === 'false') {
        return null;
    }

    return (
        <Container maxWidth="md" sx={{ my: 10 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2245b9' }}>
                Cảm ơn {customerName} đã đặt hàng!
            </Typography>

            <Card sx={{ mt: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#2245b9', fontWeight: 'medium' }}>
                            Biên nhận
                        </Typography>
                        {receiptVoucher && (
                            <Typography variant="body2" color="text.secondary">
                                Mã biên nhận : {receiptVoucher}
                            </Typography>
                        )}
                    </Box>

                    {products.length > 0 ? products.map((item) => (
                        <Card key={item.id_product} variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={2}>
                                        <img src={item.productImage} alt={item.productName} style={{ width: '100%', maxWidth: '80px', height: 'auto', borderRadius: '4px' }} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{item.productName}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <Typography variant="body2" color="text.secondary">SL: {item.quantity || 1}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={4} sx={{ textAlign: 'right' }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{formatCurrency(item.productPrice)}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )) : (
                        <Typography>Không có thông tin sản phẩm.</Typography>
                    )}

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                                Chi tiết đơn hàng
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: { xs: 2, md: 0 } }}>
                                <Typography variant="body2" color="text.secondary">Tổng tiền hàng</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{formatCurrency(numericTotal)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Phí vận chuyển</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{formatCurrency(numericDeliveryFee)}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Box sx={{
                mt: 3,
                p: 2,
                backgroundColor: '#2245b9',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'right' 
            }}>
                <Typography variant="h6">
                    TỔNG THANH TOÁN: <span style={{ fontWeight: 'bold' }}>{formatCurrency(totalPaid)}</span>
                </Typography>
            </Box>
        </Container>
    );
};

export default Success;
