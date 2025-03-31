import { Card, CardContent, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
export default function PaymentMethod({ phuongThucThanhToan, setPhuongThucThanhToan }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Bạn muốn thanh toán bằng phương thức nào?
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup value={phuongThucThanhToan} onChange={(e) => setPhuongThucThanhToan(e.target.value)}>
                        <FormControlLabel value="ZaloPay" control={<Radio />} label="ZaloPay" />
                        <FormControlLabel value="MoMo" control={<Radio />} label="MoMo" />
                        <FormControlLabel value="VNPay" control={<Radio />} label="VNPay" />
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    );
}