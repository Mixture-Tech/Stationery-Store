import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MomoCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const resultCode = searchParams.get('resultCode');
        const orderId = searchParams.get('orderId');
        const message = searchParams.get('message');
        console.log(resultCode, orderId, message);
        if (resultCode === '0') {
            // Thanh toán thành công
            toast.success('Thanh toán thành công!');
            navigate('/thanh-toan/thanh-cong', {
                state: {
                    orderId,
                    message: 'Thanh toán thành công qua MoMo'
                }
            });
        } else {
            // Thanh toán thất bại
            toast.error(message || 'Thanh toán thất bại');
            navigate('/thanh-toan/that-bai', {
                state: {
                    orderId,
                    message: message || 'Thanh toán thất bại'
                }
            });
        }
    }, [searchParams, navigate]);

    return null;
};

export default MomoCallback; 