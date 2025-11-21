// Admin CRUD Operations
document.addEventListener('DOMContentLoaded', function() {
    if (!window.location.pathname.includes('admin-artikel.html')) return;

    // Load articles from localStorage or initialize with default data
    let articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // Display articles in table
    function displayArticlesTable() {
        const tableBody = document.getElementById('articles-table');
        if (!tableBody) return;
        
        tableBody.innerHTML = articles.map((article, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${article.title}</td>
                <td>${article.date}</td>
                <td>${article.author}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editArticle(${article.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="showDeleteModal(${article.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    // Save new article
    document.getElementById('saveArticleBtn')?.addEventListener('click', function() {
        const title = document.getElementById('articleTitle').value;
        const author = document.getElementById('articleAuthor').value;
        const date = document.getElementById('articleDate').value;
        const image = document.getElementById('articleImage').value;
        const content = document.getElementById('articleContent').value;
        
        if (!title || !author || !date || !image || !content) {
            alert('Harap isi semua field!');
            return;
        }
        
        const newArticle = {
            id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
            title,
            author,
            date: new Date(date).toLocaleDateString('id-ID'),
            image,
            content
        };
        
        articles.push(newArticle);
        localStorage.setItem('articles', JSON.stringify(articles));
        
        // Reset form and close modal
        document.getElementById('addArticleForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('addArticleModal')).hide();
        
        // Refresh table
        displayArticlesTable();
    });
    
    // Edit article
    window.editArticle = function(id) {
        const article = articles.find(a => a.id === id);
        if (!article) return;
        
        document.getElementById('editArticleId').value = article.id;
        document.getElementById('editArticleTitle').value = article.title;
        document.getElementById('editArticleAuthor').value = article.author;
        document.getElementById('editArticleDate').value = new Date(article.date).toISOString().split('T')[0];
        document.getElementById('editArticleImage').value = article.image;
        document.getElementById('editArticleContent').value = article.content;
        
        new bootstrap.Modal(document.getElementById('editArticleModal')).show();
    };
    
    // Update article
    document.getElementById('updateArticleBtn')?.addEventListener('click', function() {
        const id = parseInt(document.getElementById('editArticleId').value);
        const title = document.getElementById('editArticleTitle').value;
        const author = document.getElementById('editArticleAuthor').value;
        const date = document.getElementById('editArticleDate').value;
        const image = document.getElementById('editArticleImage').value;
        const content = document.getElementById('editArticleContent').value;
        
        const index = articles.findIndex(a => a.id === id);
        if (index === -1) return;
        
        articles[index] = {
            id,
            title,
            author,
            date: new Date(date).toLocaleDateString('id-ID'),
            image,
            content
        };
        
        localStorage.setItem('articles', JSON.stringify(articles));
        bootstrap.Modal.getInstance(document.getElementById('editArticleModal')).hide();
        displayArticlesTable();
    });
    
    // Show delete confirmation modal
    window.showDeleteModal = function(id) {
        document.getElementById('deleteArticleId').value = id;
        new bootstrap.Modal(document.getElementById('deleteArticleModal')).show();
    };
    
    // Delete article
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', function() {
        const id = parseInt(document.getElementById('deleteArticleId').value);
        articles = articles.filter(a => a.id !== id);
        localStorage.setItem('articles', JSON.stringify(articles));
        bootstrap.Modal.getInstance(document.getElementById('deleteArticleModal')).hide();
        displayArticlesTable();
    });
    
    // Initial display
    displayArticlesTable();
});