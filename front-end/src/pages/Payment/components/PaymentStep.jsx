import { Stepper, Step, StepLabel } from "@mui/material";

const buocThanhToan = ["Giỏ hàng", "Chi tiết thanh toán", "Hoàn tất thanh toán"];
export default function PaymentStep({ buocHienTai }) {
    return (
        <Stepper activeStep={buocHienTai} alternativeLabel>
            {buocThanhToan.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}