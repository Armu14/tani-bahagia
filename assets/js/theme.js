// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-bs-theme', currentTheme);
    if (darkModeToggle) {
        darkModeToggle.checked = currentTheme === 'dark';
    }
    
    // Toggle theme
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});