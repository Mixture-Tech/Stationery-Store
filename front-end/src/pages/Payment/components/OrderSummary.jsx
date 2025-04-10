import { Card, CardContent, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../services/apis/orderApi';
import { getDistricts, getProvinces } from '../../../services/apis/locationApi';
import momoApi from '../../../services/apis/momoApi';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

export default function OrderSummary({ products, total, paymentMethod }) {
    const navigate = useNavigate();
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const isFormValid = address && selectedProvince && selectedDistrict && phone;

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const [districtsData, provincesData] = await Promise.all([
                    getDistricts(),
                    getProvinces()
                ]);
                setDistricts(districtsData);
                setProvinces(provincesData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu địa chỉ");
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    const handleProvinceChange = (e) => {
        const selectedProvinceId = e.target.value;
        setSelectedProvince(selectedProvinceId);

        // Lọc quận dựa trên tỉnh đã chọn
        const relatedDistricts = districts.filter(
            (district) => district.id_province === selectedProvinceId
        );
        setFilteredDistricts(relatedDistricts);
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        setSelectedDistrict(selectedDistrictId);

        districts.map(district => {
            if (district.id_district === selectedDistrictId) {
                setDeliveryFee(district.fee);
            }
        });
    };

    const handlePayment = async () => {
        try {
            if (!isFormValid) {
                toast.error("Vui lòng điền đầy đủ thông tin địa chỉ và số điện thoại");
                return;
            }

            const orderData = {
                products: products.map(product => ({
                    id_product: product.id_product,
                    quantity: product.quantity || 1,
                    price: product.productPrice
                })),
                delivery_fee: deliveryFee,
                total_price: totalPrice,
                id_province: selectedProvince,
                id_district: selectedDistrict,
                area: address,
                phone: phone
            };
            if (paymentMethod === "MoMo") {
                const orderInfo = `Thanh toán đơn hàng từ Stationery Store - Tổng tiền: ${totalPrice}`;
                const response = await momoApi.createPayment(parseInt(totalPrice.replace(/[^\d]/g, '')), orderInfo);
                
                if (response.payUrl) {
                    window.location.href = response.payUrl;
                } else {
                    toast.error('Không thể tạo thanh toán MoMo');
                }
            } else {
                await createOrder(orderData);
                navigate('/thanh-toan/thanh-cong', {
                    state: {
                        products,
                        delivery_fee: deliveryFee,
                        total_price: total,
                        id_province: selectedProvince,
                        id_district: selectedDistrict,
                        area: address,
                        phone: phone
                    }
                });
            }
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra khi tạo đơn hàng");
            console.error("Error creating order:", error);
        }
    };

    useEffect(() => {
        let result = 0;
        products.forEach(product => {
            // Chuyển đổi giá từ chuỗi sang số
            const price = parseInt(product.productPrice.replace(/[^\d]/g, ''));
            result += price * product.quantity;
        });
        result += deliveryFee;
        // Format số thành chuỗi có dấu chấm và đơn vị đ
        const formattedTotal = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ";
        setTotalPrice(formattedTotal);
    }, [deliveryFee, products]);

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
                        <Typography sx={{minWidth: '80px', textAlign: 'right'}}>
                            {product.productPrice}
                        </Typography>
                    </Box>
                ))}

                <Box display="flex" flexDirection="column" gap={2} my={2} alignItems="flex-end">
                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} sx={{width: '99%'}}>
                        <Typography>Địa chỉ</Typography>
                        <TextField 
                            sx={{ width: '90%' }}
                            label="Địa chỉ"
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} sx={{width: '99%'}}>
                        <Typography>Số điện thoại</Typography>
                        <TextField 
                            sx={{ width: '90%' }}
                            label="Số điện thoại"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} sx={{width: '99%'}}>
                        <Typography>Tỉnh</Typography>
                        <FormControl sx={{ width: '15%'}}>
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                label="Tỉnh/Thành phố"
                            >
                                {provinces.map(province => (
                                    <MenuItem key={province.id_province} value={province.id_province}>
                                        {province.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} sx={{width: '99%'}}>
                        <Typography>Quận</Typography>
                        <FormControl sx={{ width: '15%'}}>
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                value={selectedDistrict}
                                // onChange={(e) => setSelectedDistrict(e.target.value)}
                                onChange={handleDistrictChange}
                                label="Quận/Huyện"
                            >
                                {filteredDistricts.map(district => (
                                    <MenuItem key={district.id_district} value={district.id_district}>
                                        {district.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography>Phí vận chuyển</Typography>
                    <Typography>
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(deliveryFee)}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" my={2} fontWeight="bold">
                    <Typography>Tổng cộng</Typography>
                    <Typography>
                        {totalPrice}
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={handlePayment}
                    disabled={!isFormValid}
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
    total: PropTypes.number,
    paymentMethod: PropTypes.string.isRequired
};