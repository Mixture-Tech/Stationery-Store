import { Card, CardContent, Typography, Box, Button } from "@mui/material";
export default function OrderSummary() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>Chi tiết đơn hàng</Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
                    <img src="https://sonca.vn/wp-content/uploads/2019/11/acco-sat-sdi-ageless-1-e1628529960803.png" alt="Áo thun" width={50} height={50} />
                    <Typography>Áo thun x1</Typography>
                    <Typography>22.94</Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" my={1}>
                    <img src="https://sonca.vn/wp-content/uploads/2019/11/acco-sat-sdi-ageless-1-e1628529960803.png" alt="Poster" width={50} height={50} />
                    <Typography>Poster x1</Typography>
                    <Typography>69.60</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography>Địa chỉ nhận hàng</Typography>
                    <Typography>80/9 Đường số 5, quận 17...</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography>Phí vận chuyển</Typography>
                    <Typography>4.82</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={2} fontWeight="bold">
                    <Typography>Tổng cộng</Typography>
                    <Typography>97.36</Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth>
                    Tiếp tục thanh toán
                </Button>
                <Button variant="text" color="error" fullWidth>
                    Hủy thanh toán
                </Button>
            </CardContent>
        </Card>
    );
}