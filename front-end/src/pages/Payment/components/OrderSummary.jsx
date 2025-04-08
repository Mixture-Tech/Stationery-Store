import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import payementApi from "../../../services/apis/paymentApi";

export default function OrderSummary({ products, deliveryFee, total }) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            const orderData = {
                amount: total,
                orderId: `ORDER_${Date.now()}`,
                orderInfo: `Thanh toán đơn hàng từ Stationery Store - ${products.length} sản phẩm`
            };
            await payementApi.createMomoPayment(orderData);
        } catch (error) {
            console.error('Payment failed:', error);
            // TODO: Hiển thị thông báo lỗi cho người dùng
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>Chi tiết đơn hàng</Typography>
                {products.map(product => (
                    <Box key={product.id_product} display="flex" alignItems="center" justifyContent="space-between" my={1}>
                        <img src={product.productImage} alt="Áo thun" width={50} height={50} />
                        <Typography>{product.productName}</Typography>
                        <Typography>{product.total_price.toLocaleString()}₫</Typography>
                    </Box>
                ))}
                <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography>Địa chỉ nhận hàng</Typography>
                    <Typography>80/9 Đường số 5, quận 17...</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography>Phí vận chuyển</Typography>
                    <Typography>{deliveryFee}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={2} fontWeight="bold">
                    <Typography>Tổng cộng</Typography>
                    <Typography>{total}</Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={handlePayment}
                    disabled={isLoading}
                >
                    {isLoading ? 'Đang xử lý...' : 'Tiếp tục thanh toán'}
                </Button>
                <Button variant="text" color="error" fullWidth>
                    Hủy thanh toán
                </Button>
            </CardContent>
        </Card>
    );
}

OrderSummary.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id_product: PropTypes.string.isRequired,
        productImage: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        total_price: PropTypes.number.isRequired
    })).isRequired,
    deliveryFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};