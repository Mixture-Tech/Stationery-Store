import { Box, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

export default function PaymentMethod({ phuongThucThanhToan, setPhuongThucThanhToan }) {
    const handlePayment = async () => {
        try {
            if (phuongThucThanhToan === "MoMo") {
                const response = await axios.post("http://localhost:3001/payment/momo/create", {
                    orderId: `ORDER_${Date.now()}`,
                    amount: 10000, // Số tiền cần thanh toán
                    orderInfo: "Thanh toán đơn hàng từ Stationery Store"
                });

                if (response.data.payUrl) {
                    window.location.href = response.data.payUrl;
                }
            } else {
                toast.info("Phương thức thanh toán này đang được phát triển");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo yêu cầu thanh toán");
            console.error("Payment error:", error);
        }
    };

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
                        value="MoMo"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src="https://static.mservice.io/img/logo-momo.png"
                                    alt="MoMo"
                                    style={{ width: "55px", height: "55px", marginLeft: "10px" }}
                                />
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="PayPal"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img
                                    src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                                    alt="PayPal"
                                    style={{ width: "60px", height: "60px", marginLeft: "10px" }}
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