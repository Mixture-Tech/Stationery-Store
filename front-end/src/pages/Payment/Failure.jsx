import { Box, Typography, Button, Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Failure = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { message = 'Thanh toán thất bại' } = location.state || {};

    return (
        <Container maxWidth="sm" sx={{ mt: 10, mb: 8, textAlign: 'center' }}>
            <Box sx={{ mb: 4 }}>
                <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
            </Box>
            
            <Typography variant="h5" gutterBottom color="error">
                {message}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Vui lòng thử lại hoặc chọn phương thức thanh toán khác
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/thanh-toan')}
            >
                Quay lại trang thanh toán
            </Button>
        </Container>
    );
};

export default Failure; 