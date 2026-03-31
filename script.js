document.addEventListener("DOMContentLoaded", () => {


    let traducciones = {};

    async function cargarIdioma(idioma) {
        const langPath = window.location.pathname.includes('/pages/') ? '../lang/' : 'lang/';
        try {
            const res = await fetch(`${langPath}${idioma}.json`);
            traducciones = await res.json();

            traducirPagina();
            localStorage.setItem("idioma", idioma);

            const labels = document.querySelectorAll('.IdiomaLabel');
            labels.forEach(label => {
                label.textContent = idioma.toUpperCase();
            });
        } catch (error) {
            console.error("Error cargando el idioma:", error);
        }
    }

    window.cargarIdioma = cargarIdioma;

    function traducirPagina() {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const clave = el.getAttribute("data-i18n");
            if (traducciones[clave]) el.textContent = traducciones[clave];
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const clave = el.getAttribute("data-i18n-placeholder");
            if (traducciones[clave]) el.placeholder = traducciones[clave];
        });
    }

    const idiomaGuardado = localStorage.getItem("idioma") || "es";
    cargarIdioma(idiomaGuardado);



    const idiomaSelector = document.querySelector('.IdiomaSelector');
    const mediaContainer = document.querySelector('.Media-Container');
    const navUl = document.querySelector('#NavContainer ul');
    const header = document.querySelector('header') || document.body;

    function reubicarElementos() {
        if (!navUl) return;

        if (window.innerWidth <= 768) {

            if (idiomaSelector && !navUl.contains(idiomaSelector)) {
                const liIdioma = document.createElement('li');
                liIdioma.id = "temp-li-idioma";
                liIdioma.appendChild(idiomaSelector);
                navUl.appendChild(liIdioma);
            }


            if (mediaContainer && !navUl.contains(mediaContainer)) {
                const liMedia = document.createElement('li');
                liMedia.id = "temp-li-media";
                liMedia.appendChild(mediaContainer);
                navUl.appendChild(liMedia);
            }
        } else {

            const tempLiIdioma = document.getElementById('temp-li-idioma');
            if (tempLiIdioma) {
                header.appendChild(idiomaSelector);
                tempLiIdioma.remove();
            }


            const tempLiMedia = document.getElementById('temp-li-media');
            if (tempLiMedia) {
                document.body.appendChild(mediaContainer);
                tempLiMedia.remove();
            }
        }
    }

    window.addEventListener('resize', reubicarElementos);
    reubicarElementos();



    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
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
                }, 400);
                observer.unobserve(entry.target);
            }
        });
    });

    const items = document.querySelectorAll('.sections, .Vector-Retangulo, .VectorDocs, .VectorAboutMe');
    // Lógica del Menú Burger con Cambio de Icono 
    const burgerbtn = document.querySelector('#Burger-btn-container');
    const navContainer = document.querySelector('#NavContainer');

    if (burgerbtn && navContainer) {
        burgerbtn.addEventListener('click', () => {
            // Añade/quita la clase al botón para cambiar el SVG 
            burgerbtn.classList.toggle('burger-active');

            // Añade/quita la clase al Nav para que entre desde la derecha (right: 0%)
            navContainer.classList.toggle('burger-active');
        });
    }
    //  Lógica para cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('#NavContainer a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Al hacer clic en cualquier enlace, removemos la clase activa
            if (navContainer.classList.contains('burger-active')) {
                navContainer.classList.toggle('burger-active');

                // También regresamos el icono a su estado original (hamburguesa)
                if (burgerbtn) {
                    burgerbtn.classList.toggle('burger-active');
                }
            }
        });
    });

    items.forEach(item => observer.observe(item));
});