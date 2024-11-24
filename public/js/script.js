console.log('JavaScript đã được liên kết thành công!');
document.addEventListener("DOMContentLoaded", () => {
    ScrollReveal().reveal('.project-card', {
        duration: 1000,
        distance: '50px',
        origin: 'bottom',
        reset: true,
    });
});
ScrollReveal().reveal('.event-card', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    reset: true,
});
ScrollReveal().reveal('.community-form', {
    duration: 1500,
    distance: '50px',
    origin: 'top',
    reset: true,
});
ScrollReveal().reveal('.project-card', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    reset: true,
});
ScrollReveal().reveal('.home-content', {
    duration: 1000,
    origin: 'bottom',
    distance: '50px',
    reset: true
});
fetch('/api/projects')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.project-container');
        container.innerHTML = data.map(project => `
            <div class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="btn">Tìm hiểu thêm</a>
            </div>
        `).join('');
    });
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('album-gallery');

    // Lấy danh sách ảnh từ backend
    fetch('/api/album')
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = data
                .map(img => `<img src="${img.path}" alt="Uploaded Image">`)
                .join('');
        });

    // Xử lý tải ảnh
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(uploadForm);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                gallery.innerHTML += `<img src="${data.path}" alt="Uploaded Image">`;
            })
            .catch(err => console.error(err));
    });
});
document.addEventListener("DOMContentLoaded", function() {
    ScrollReveal().reveal('.home-content', { 
        duration: 1000, 
        origin: 'bottom', 
        distance: '50px' 
    });

    ScrollReveal().reveal('.testimonials', {
        duration: 1500, 
        origin: 'top', 
        distance: '30px'
    });
});
// Lấy danh sách dự án từ backend
fetch('/api/projects')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.project-container');
        container.innerHTML = data.map(project => `
            <div class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="btn">Tìm hiểu thêm</a>
            </div>
        `).join('');
    });
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('album-gallery');

    fetch('/api/album')
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = data.map(img => `
                <img src="${img.path}" alt="Ảnh tải lên">
            `).join('');
        });

    // Lazy loading
    const images = document.querySelectorAll('.album-gallery img');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
});
<div id="header"></div>
<div id="footer"></div>

<script>
    document.getElementById('header').innerHTML = '<object type="text/html" data="/header.html" ></object>';
    document.getElementById('footer').innerHTML = '<object type="text/html" data="/footer.html" ></object>';

    // Đánh dấu trang hiện tại
    const currentPage = location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href.endsWith(currentPage)) {
            link.classList.add('active');
        }
    });
</script>
