import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Divider, Container, Button, Tabs, Tab } from '@mui/material';
import { orderApi } from '../../services/apis/orderApi';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderApi.getOrderHistory();
                setOrders(response);
            } catch (error) {
                console.error('Lỗi khi lấy lịch sử đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatCurrency = (amount) => {
        if (typeof amount !== 'number') {
            return 'N/A';
        }
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đã giao hàng':
                return 'success.main';
            case 'Đang giao hàng':
                return 'warning.main';
            case 'Đã hủy':
                return 'error.main';
            default:
                return 'text.primary';
        }
    };

    const handleViewDetail = (order) => {
        navigate('/thanh-toan/thanh-cong', { state: order });
    };

    const filteredOrders = orders.filter(order => {
        switch (tabValue) {
            case 0: // Tất cả
                return true;
            case 1: // Đang giao hàng
                return order.status === 'Đang giao hàng';
            case 2: // Đã giao hàng
                return order.status === 'Đã giao hàng';
            case 3: // Đã hủy
                return order.status === 'Đã hủy';
            default:
                return true;
        }
    });

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ my: 10 }}>
                <Typography variant="h5" gutterBottom>Đang tải lịch sử đơn hàng...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ my: 10 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2245b9' }}>
                Lịch sử đơn hàng
            </Typography>

            <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{ mb: 3 }}
            >
                <Tab label="Tất cả" />
                <Tab label="Đang giao hàng" />
                <Tab label="Đã giao hàng" />
                <Tab label="Đã hủy" />
            </Tabs>

            {filteredOrders.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                    Không có đơn hàng nào
                </Typography>
            ) : (
                filteredOrders.map((order) => (
                    <Card key={order.id_order} sx={{ mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                        Mã đơn hàng: {order.id_order}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ngày đặt: {formatDate(order.order_date)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: getStatusColor(order.status) }}
                                    >
                                        {order.status}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="body2" color="text.secondary">
                                        {order.products.length} sản phẩm
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                        Tổng tiền: {formatCurrency(order.total)}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleViewDetail(order)}
                                >
                                    Xem chi tiết
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default OrderHistory; 