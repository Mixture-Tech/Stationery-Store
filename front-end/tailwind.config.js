/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {

            fontFamily:{
                nunito: ["NunitoSans", "sans-serif"],
            },
            animation: {
                pulse: "pulse 1.5s infinite",
                'slide-down': 'slideDown 1s ease-out forwards',
                'fade-in': 'fade-in 4s ease-in forwards',
                'fade-in-left': 'fade-in-left 3s ease-in-out',
                'fade-in-right': 'fade-in-right 3s ease-in-out ',
                zoomIn: 'zoom-in 3s ease-out 0.5s 1',
                fadeinbounceleft: 'fade-in-bounce-left 1s ease-in-out 0s 1',
                'gradient-move': 'gradient-move 5s ease-in-out infinite'
            },
            backgroundImage:{
                'custom-gradient': 'linear-gradient(-45deg,#693c8a, #351059, #4D6C91, #7a4d98)',
                'blue-gradient': 'linear-gradient(-45deg, #1E3A8A, #2563EB, #60A5FA, #BFDBFE)',
            },
            keyframes: {
                'gradient-move': {
                    '0%': { 
                        backgroundPosition: '0% 50%',
                        backgroundSize: '200% 200%'
                    },
                    '50%': { 
                        backgroundPosition: '100% 50%',
                        backgroundSize: '200% 200%'
                    },
                    '100%': { 
                        backgroundPosition: '0% 50%',
                        backgroundSize: '200% 200%'
                    }
                },
                "fade-in-right": {
                    "0%": {
                        opacity: 0,
                        transform: "translate3d(100%, 0, 0)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translate3d(0, 0, 0)",
                    },
                },
                'fade-in-left': {
                    "0%": {
                        opacity: 0,
                        transform: "translate3d(-100%, 0, 0)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translate3d(0, 0, 0)",
                    },

                },
                slideDown: {
                    '0%': { transform: 'translateY(-50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                  },
                "fade-in": {
                    "0%": {
                        opacity: 0
                    },
                    "100%": {
                        opacity: 1
                    },
                },
                "zoom-in": {
                    "0%": {
                        opacity: 0,
                        transform: "scale3d(0.3, 0.3, 0.3)",
                    },
                    "80%": {
                        opacity: 0.8,
                        transform: "scale3d(1.1, 1.1, 1.1)",
                    },
                    "100%": {
                        opacity: 1,
                    },
                },
                pulse: {
                    "0%, 100%": { transform: "scale(1)", opacity: "1" },
                    "50%": { transform: "scale(1.1)", opacity: "0.8" },
                },
            },
            colors: {
                "button":{
                    100: "#E6EAF2",
                    200: "#C2CDDF",
                    300: "#9EB1CC",
                    400: "#7A95B8",
                    500: "#19376D", // Base color
                    600: "#142C5B",
                    700: "#0F2249",
                    800: "#0A1937",
                    900: "#060F26"
                  },
                  "blue-gray": {
                    50: "#6699cc",
                    100: "#578fc7",
                    200: "#4985c2",
                    300: "#3e7cb9",
                    400: "#3972ab",
                    500: "#34689c",
                    600: "#2f5e8d",
                    700: "#2d547f",
                    800: "#254b70",
                    900: "#204161",
                    950: "#1b3752",
                },
                'purple': {
                    100: '#8d61a6',
                    200: '#7a4d98',
                    300: '#693c8a',
                    400: '#582a7c',
                    500: '#47186e',
                    600: '#3e1362',
                    700: '#351059',
                    800: '#2c0c4e',
                    900: '#230848',
                },
                'blue': {
                    100: '#A2C4D9',
                    200: '#8CAEC7',
                    300: '#7798B5',
                    400: '#6282A3',
                    500: '#4D6C91',
                    600: '#3E5A7E',
                    700: '#2F486C',
                    800: '#203658',
                    900: '#112646',
                },
                'wine-red': {
                    100: '#F5E1E4', // Rất nhạt
                    200: '#E3B3BC', // Nhạt
                    300: '#D18594', // Nhạt hơn một chút
                    400: '#BE576C', // Gần mức trung bình
                    500: '#9C3D54', // Màu gốc
                    600: '#7D3144', // Đậm hơn
                    700: '#5E2534', // Rất đậm
                    800: '#3F1924', // Tối hơn nữa
                    900: '#200D14', // Gần như đen
                },
                "navy-blue": {
                    "100": "#d6e1f1",
                    "200": "#adc2e3",
                    "300": "#85a3d5",
                    "400": "#5c84c7",
                    "500": "#3365b9",
                    "600": "#274f94",
                    "700": "#1d3b70",
                    "800": "#13274c",
                    "900": "#091327"
                },
                "navy-red": {
                    "100": "#f3d9e1",
                    "200": "#e6b3c3",
                    "300": "#da8da4",
                    "400": "#cd6786",
                    "500": "#c04168",
                    "600": "#9a3353",
                    "700": "#74263e",
                    "800": "#4e192a",
                    "900": "#270d15"
                },
              


            },
            screens: {
                "3xl": "1920px",
            },
        },
    },
    plugins: [],
};