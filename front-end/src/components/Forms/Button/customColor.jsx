import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

const ColorButton = styled(Button)({
    
    backgroundColor: '#00a9ff',
    '&:hover': {
        backgroundColor: '#0087cc',
    },
});

const ColorButtonGray = styled(Button)({
    backgroundColor: '#d1d5db',
    '&:hover': {
        backgroundColor: '#9ca3af',
    },
});

const ColorButtonLoading = styled(LoadingButton)({
    borderRadius: '10px',
    backgroundColor: '#00a9ff',
    '&:hover': {
        color: '#A2C4D9',
        backgroundColor: '#2F486C',
    },
});

const TransparentButton = styled(Button)({
    backgroundColor: 'transparent', 
    borderRadius: '80px', 
    '&:hover': {
        backgroundColor: 'rgba(209, 213, 219, 0.2)',
        borderColor: '#9ca3af',
    },
});

// Component này để dùng như một button có nền trong suốt
export function CustomTransparentButton({ children, ...props }) {
    return <TransparentButton {...props}>{children}</TransparentButton>;
}

// eslint-disable-next-line react/prop-types
function CustomButton({ children, ...props }) {
    return <ColorButton {...props}>{children}</ColorButton>;
}

export function CustomButtonGray({ children, ...props }) {
    return <ColorButtonGray {...props}>{children}</ColorButtonGray>;
}

// eslint-disable-next-line react/prop-types
export function CustomLoadingButton({ children, ...props }) {
    return <ColorButtonLoading {...props}>{children}</ColorButtonLoading>;
}

export default CustomButton;