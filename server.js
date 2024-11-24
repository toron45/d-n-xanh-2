const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const multer = require('multer');

// Cấu hình thư mục public cho các tài nguyên tĩnh
app.use(express.static(path.join(__dirname, 'views')));

// Cấu hình API trả về các dự án
app.get('/api/projects', (req, res) => {
    const projects = [
        { id: 1, name: "Trồng Cây Xanh", description: "Trồng cây để giảm thiểu ô nhiễm.", link: "/du-an-xanh/1" },
        { id: 2, name: "Làm Sạch Biển", description: "Chiến dịch dọn sạch biển mỗi tháng.", link: "/du-an-xanh/2" },
        { id: 3, name: "Giảm Rác Thải Nhựa", description: "Giảm lượng nhựa thải ra môi trường.", link: "/du-an-xanh/3" },
    ];
    res.json(projects);
});

// Cấu hình API cho album ảnh
app.get('/api/album', (req, res) => {
    const images = [
        { path: '/images/image1.jpg' },
        { path: '/images/image2.jpg' },
        { path: '/images/image3.jpg' },
    ];
    res.json(images);
});

// Trả về trang chính (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});

// API Cache cho các dự án
app.get('/api/projects', (req, res) => {
    let projectsCache = cache.get('projects');
    if (!projectsCache) {
        const projects = [
            { id: 1, name: "Trồng Cây Xanh", description: "Trồng cây để giảm thiểu ô nhiễm.", link: "/du-an-xanh/1" },
            { id: 2, name: "Làm Sạch Biển", description: "Chiến dịch dọn sạch biển mỗi tháng.", link: "/du-an-xanh/2" },
            { id: 3, name: "Giảm Rác Thải Nhựa", description: "Giảm lượng nhựa thải ra môi trường.", link: "/du-an-xanh/3" },
        ];
        cache.put('projects', projects, 60000);  // Cache cho 1 phút
        projectsCache = projects;
    }
    res.json(projectsCache);
});
app.use(express.static(path.join(__dirname, 'views'), {
    maxAge: '1d',  // Cache tài nguyên trong 1 ngày
}));
// Cấu hình lưu trữ ảnh
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// API lấy danh sách ảnh
app.get('/api/album', (req, res) => {
    const fs = require('fs');
    const folder = './public/uploads';
    const images = fs.readdirSync(folder).map(file => ({
        path: `/uploads/${file}`,
    }));
    res.json(images);
});

// API tải ảnh lên
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Tải ảnh thành công!', path: `/uploads/${req.file.filename}` });
});
// Static files
app.use(express.static(path.join(__dirname, 'views')));

// Trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Album
app.get('/album', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'album.html'));
});

// Dự Án Xanh
app.get('/du-an-xanh', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'du_anx_anh.html'));
});

// Cộng Đồng
app.get('/cong-dong', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cong_dong.html'));
});

// API Routes
app.use('/api', require('./routes/api'));


