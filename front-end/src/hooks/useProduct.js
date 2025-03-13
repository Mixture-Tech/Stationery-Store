const dummyProducts = [
    {
        id: 1,
        imagePath: "https://placehold.co/100x100",
        title: "Sách Python",
        description: "được viết bởi anh Tiến",
        price: 150000,
        quantity: 1,
    },
    {
        id: 2,
        imagePath: "https://placehold.co/100x100",
        title: "Sách Java",
        description: "Được viết bởi ý văn",
        price: 180000,
        quantity: 1,
    },
    {
        id: 3,
        imagePath: "https://placehold.co/100x100",
        title: "Sách C++",
        description: "Được viết bởi Hoan",
        price: 200000,
        quantity: 1,
    },
];


export const useProducts = () => {
    return { popularProducts: dummyProducts };
};

export default useProducts;