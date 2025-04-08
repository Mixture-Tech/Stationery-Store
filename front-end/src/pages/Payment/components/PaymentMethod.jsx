import { Box, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

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