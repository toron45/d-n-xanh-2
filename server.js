const express = require('express');
const path = require('path');

const app = express();

// Cấu hình thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Định nghĩa các route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/album', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'album.html'));
});

app.get('/du-an-xanh', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'du_an_xanh.html'));
});

app.get('/cong-dong', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cong_dong.html'));
});

// Khởi chạy server
const PORT = process.env.PORT || 3000; // Sử dụng PORT từ môi trường hoặc mặc định là 3000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
app.get('/api/projects', (req, res) => {
    const projects = [
        { name: 'Trồng Cây Xanh', description: 'Trồng 1 triệu cây xanh...', link: '#' },
        { name: 'Làm Sạch Biển', description: 'Dọn sạch 10km bãi biển...', link: '#' },
        { name: 'Giảm Nhựa', description: 'Khuyến khích sử dụng sản phẩm xanh...', link: '#' }
    ];
    res.json(projects);
});
app.use(express.static(path.join(__dirname, 'public')));

