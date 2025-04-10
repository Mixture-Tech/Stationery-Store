import { Box, Radio, RadioGroup, FormControlLabel, FormControl, Typography } from "@mui/material";
import PropTypes from "prop-types";
import VNPay from "../../../assets/img/Icon/VNPAY_id-sVSMjm2_0.png"
export default function PaymentMethod({ phuongThucThanhToan, setPhuongThucThanhToan }) {

    return (
        <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
                Phương thức thanh toán
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    value={phuongThucThanhToan}
                    onChange={(e) => setPhuongThucThanhToan(e.target.value)}
                >
                    <FormControlLabel
                        value="COD"
                        control={<Radio />}
                        label="Thanh toán khi nhận hàng (COD)"
                    />
                    <FormControlLabel
                        value="VNPay"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src={VNPay}
                                    alt="VNPay"
                                    style={{ width: "70px", height: "20px", marginLeft: "10px" }}
                                />
                            </Box>
                        }
                    />
                    
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

PaymentMethod.propTypes = {
    phuongThucThanhToan: PropTypes.string.isRequired,
    setPhuongThucThanhToan: PropTypes.func.isRequired
};