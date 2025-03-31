import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";
import PaymentStep from "./components/PaymentStep";
import PaymentMethod from "./components/PaymentMethod";
import OrderSummary from "./components/OrderSummary";

export default function Payment() {
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState("PayPal");
    const [buocHienTai, setBuocHienTai] = useState(1);
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 12 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Cửa Hàng Của Tôi
            </Typography>
            <Button variant="text" color="primary" sx={{ mb: 2 }} onClick={() => navigate("/gio-hang")}>
                ← Quay lại giỏ hàng
            </Button>

            <PaymentStep buocHienTai={buocHienTai} />

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <PaymentMethod phuongThucThanhToan={phuongThucThanhToan} setPhuongThucThanhToan={setPhuongThucThanhToan} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <OrderSummary />
                </Grid>
            </Grid>
        </Container>
    );
}