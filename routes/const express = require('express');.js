const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

// Cấu hình lưu trữ ảnh
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// API lấy danh sách ảnh
router.get('/album', (req, res) => {
    const folder = './public/uploads';
    const images = fs.readdirSync(folder).map(file => ({
        path: `/uploads/${file}`,
    }));
    res.json(images);
});

// API tải ảnh lên
router.post('/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Tải ảnh thành công!', path: `/uploads/${req.file.filename}` });
});

// API lấy danh sách dự án
router.get('/projects', (req, res) => {
    const projects = [
        { name: 'Trồng Cây Xanh', description: 'Trồng 1 triệu cây xanh tại các thành phố lớn.', link: '#' },
        { name: 'Chiến Dịch Làm Sạch Biển', description: 'Dọn sạch 10km bãi biển mỗi tháng.', link: '#' },
        { name: 'Giảm Rác Thải Nhựa', description: 'Sử dụng sản phẩm thân thiện với môi trường.', link: '#' },
    ];
    res.json(projects);
});

// API đăng ký cộng đồng
router.post('/register', (req, res) => {
    const data = req.body;
    fs.appendFile('./community.json', JSON.stringify(data) + '\n', (err) => {
        if (err) return res.status(500).json({ message: 'Lỗi khi lưu thông tin!' });
        res.json({ message: 'Đăng ký thành công!' });
    });
});

module.exports = router;
