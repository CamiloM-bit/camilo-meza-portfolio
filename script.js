document.addEventListener("DOMContentLoaded", () => {
    const btnDarkLight = document.querySelector('.btn-dark-light');
    const darklighticon = document.querySelector('.dark-light-icon');

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        if (darklighticon) darklighticon.classList.add('dark');
    }

    if (btnDarkLight) {
        btnDarkLight.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (darklighticon) {
                darklighticon.classList.toggle('dark');
            }

            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
    }

    let traducciones = {};

    async function cargarIdioma(idioma) {
        const langPath = window.location.pathname.includes('/pages/') ? '../lang/' : 'lang/';
        const res = await fetch(`${langPath}${idioma}.json`);
        traducciones = await res.json();

        traducirPagina();

        localStorage.setItem("idioma", idioma);

        const label = document.querySelector('.IdiomaLabel');
        if (label) label.textContent = idioma.toUpperCase();
    }

    window.cargarIdioma = cargarIdioma;

    function traducirPagina() {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const clave = el.getAttribute("data-i18n");
            el.textContent = traducciones[clave];
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const clave = el.getAttribute("data-i18n-placeholder");
            el.placeholder = traducciones[clave];
        });
    }

    const idiomaGuardado = localStorage.getItem("idioma") || "es";

    cargarIdioma(idiomaGuardado);

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                
                entry.target.classList.add('visible');

                
                if (entry.target.classList.contains('Vector-Retangulo')) {
                    entry.target.classList.add('DespliegueLeft');
                }

                if (entry.target.classList.contains('VectorDocs')) {
                    entry.target.classList.add('DespliegueRight');
                }

                if (entry.target.classList.contains('VectorAboutMe')) {
                    entry.target.classList.add('DespliegueRightv2');
                }

                observer.unobserve(entry.target);
            }

        });

    });
    

    const items = document.querySelectorAll('.sections, .Vector-Retangulo, .VectorDocs, .VectorAboutMe');

    items.forEach(item => {
        observer.observe(item);
    });

});