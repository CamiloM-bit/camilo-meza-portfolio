document.addEventListener("DOMContentLoaded", () => {
    const btnDarkLight = document.querySelector('.btn-dark-light');

    btnDarkLight.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});