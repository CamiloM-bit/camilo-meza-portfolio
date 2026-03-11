document.addEventListener("DOMContentLoaded", () => {
    const btnDarkLight = document.querySelector('.btn-dark-light');
    const darklighticon = document.querySelector('.dark-light-icon');

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darklighticon.classList.add('dark')
    }
  
    btnDarkLight.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darklighticon.classList.toggle('dark')
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
});