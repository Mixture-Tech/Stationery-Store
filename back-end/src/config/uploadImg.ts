import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// Định nghĩa đường dẫn lưu ảnh
const uploadPath = path.join(__dirname, '../assets/img/Products/');

// Khởi tạo thư mục lưu ảnh nếu chưa tồn tại
const initializeUploadDirectory = (): void => {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log(`Đã tạo thư mục: ${uploadPath}`);
    }
};

// Cấu hình storage cho multer
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        console.log(`Đường dẫn lưu ảnh: ${uploadPath}`);
        cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
        console.log(`Tên file: ${fileName}`);
        cb(null, fileName);
    },
});

// Cấu hình multer với storage, file filter và limits
const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif') as any, false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file (5MB)
});

// Khởi tạo thư mục ngay khi file được import
initializeUploadDirectory();

// Export các thành phần cần thiết
export const uploadConfig = {
    uploadPath,
    uploadMiddleware: upload.single('image'),
};