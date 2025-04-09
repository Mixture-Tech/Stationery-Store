import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function OrderSummary({ products, deliveryFee, total }) {
    const navigate = useNavigate();

    const handlePayment = async () => {
        navigate('/thanh-toan/thanh-cong', {state: {products, deliveryFee, total}});
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>Chi tiết đơn hàng</Typography>
                {products.map(product => (
                    <Box key={product.id_product} display="flex" alignItems="center" justifyContent="space-between" my={1}>
                        <img src={product.productImage} alt={product.productName} width={50} height={50} style={{marginRight: '10px'}}/>
                        <Box flexGrow={1}>
                            <Typography>{product.productName}</Typography>
                            <Typography variant="body2" color="text.secondary">SL: {product.quantity || 1}</Typography>
                        </Box>
                        <Typography sx={{minWidth: '80px', textAlign: 'right'}}>{typeof product.total_price === 'number' ? product.total_price.toLocaleString() : 'N/A'}₫</Typography>
                    </Box>
                ))}
                <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography>Địa chỉ nhận hàng</Typography>
                    <Typography>80/9 Đường số 5, quận 17...</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography>Phí vận chuyển</Typography>
                    <Typography>{typeof deliveryFee === 'number' ? deliveryFee.toLocaleString() : 'N/A'}₫</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={2} fontWeight="bold">
                    <Typography>Tổng cộng</Typography>
                    <Typography>{typeof total === 'number' ? total.toLocaleString() : 'N/A'}₫</Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={handlePayment}
                >
                    Tiếp tục thanh toán
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
        id_product: PropTypes.number.isRequired,
        productImage: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        total_price: PropTypes.number
    })).isRequired,
    deliveryFee: PropTypes.number,
    total: PropTypes.number
};