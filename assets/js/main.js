// Load articles from JSON file
function loadArticles() {
    fetch('data/articles.json')
        .then(response => response.json())
        .then(data => {
            if (window.location.pathname.includes('artikel.html')) {
                displayArticles(data);
            } else if (window.location.pathname.includes('detail.html')) {
                displayArticleDetail(data);
            }
        })
        .catch(error => console.error('Error loading articles:', error));
}

// Display articles on artikel.html
function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    if (!container) return;

    container.innerHTML = articles.map(article => `
        <div class="col-md-6 col-lg-4">
            <div class="card article-card h-100 border-0 shadow-sm">
                <img src="${article.image}" class="card-img-top" alt="${article.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text text-muted">${article.content.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${article.author} • ${article.date}</small>
                        <a href="detail.html?id=${article.id}" class="btn btn-sm btn-primary">Baca Selengkapnya</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Display single article on detail.html
function displayArticleDetail(articles) {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));
    const article = articles.find(a => a.id === articleId);
    const container = document.getElementById('article-detail');

    if (!article || !container) {
        window.location.href = 'artikel.html';
        return;
    }

    container.innerHTML = `
        <article>
            <h1 class="display-5 fw-bold mb-4">${article.title}</h1>
            <div class="d-flex align-items-center mb-4">
                <img src="${article.image}" class="img-fluid rounded mb-3" alt="${article.title}">
            </div>
            <div class="d-flex justify-content-between mb-4">
                <span class="text-muted"><i class="bi bi-person-fill me-1"></i> ${article.author}</span>
                <span class="text-muted"><i class="bi bi-calendar me-1"></i> ${article.date}</span>
            </div>
            <div class="article-content">
                ${article.content.split('\n').map(p => `<p>${p}</p>`).join('')}
            </div>
        </article>
    `;
}

// Load gallery from JSON file
function loadGallery() {
    fetch('data/gallery.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                displayGallery(data);
            } else {
                loadLocalGalleryImages(); // fallback
            }
        })
        .catch(error => {
            console.error('Error loading gallery JSON, using local images instead:', error);
            loadLocalGalleryImages(); // fallback
        });
}

// Display gallery from JSON
function displayGallery(gallery) {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    container.innerHTML = gallery.map(item => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="gallery-item">
                <img src="${item.image}" class="img-fluid rounded" alt="${item.title}" 
                     data-bs-toggle="modal" data-bs-target="#galleryModal"
                     onclick="showGalleryModal('${item.image}', '${item.title}', '${item.description}')">
            </div>
        </div>
    `).join('');
}

// ⚡ Fallback: Auto load img1–img19 if no JSON
function loadLocalGalleryImages() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    let output = "";
    const totalImages = 19;

    for (let i = 1; i <= totalImages; i++) {
        const imgPath = `assets/img/img${i}.jpg`;

        output += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="gallery-item shadow-sm" style="cursor:pointer;">
                    <div class="ratio ratio-1x1 overflow-hidden rounded">
                        <img src="${imgPath}" 
                             class="w-100 h-100 object-fit-cover"
                             alt="Foto ${i}"
                             data-bs-toggle="modal"
                             data-bs-target="#galleryModal"
                             onclick="showGalleryModal('${imgPath}', 'Foto ${i}', 'Dokumentasi foto nomor ${i}')">
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = output;
}

// Show gallery modal with clicked image
function showGalleryModal(image, title, description) {
    document.getElementById('galleryModalImage').src = image;
    document.getElementById('galleryModalTitle').textContent = title;
    document.getElementById('galleryModalDescription').textContent = description;
}

// Initialize page based on current URL
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('artikel.html') || 
        window.location.pathname.includes('detail.html')) {
        loadArticles();
    } else if (window.location.pathname.includes('galeri.html')) {
        loadGallery();
    }
});