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



    const observerAnimaciones = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');

                    if (entry.target.classList.contains('Vector-Retangulo')) entry.target.classList.add('DespliegueLeft');


                    if (entry.target.classList.contains('VectorDocs')) entry.target.classList.add('DespliegueRight');


                    if (entry.target.classList.contains('VectorAboutMe')) entry.target.classList.add('DespliegueRightv2');

                    
                }, 400);
                observerAnimaciones.unobserve(entry.target);
            }
        });
    });

    const itemsParaAnimar = document.querySelectorAll('.sections, .Vector-Retangulo, .VectorDocs, .VectorAboutMe');
    itemsParaAnimar.forEach(item => observerAnimaciones.observe(item));

    // --- 4. LÓGICA DE MENÚ BURGER ---
    const burgerbtn = document.querySelector('#Burger-btn-container');
    const navContainer = document.querySelector('#NavContainer');

    if (burgerbtn && navContainer) {
        burgerbtn.addEventListener('click', () => {
            burgerbtn.classList.toggle('burger-active');
            navContainer.classList.toggle('burger-active');
        });
    }
    const navLinks = document.querySelectorAll('#NavContainer a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('burger-active')) {
                navContainer.classList.remove('burger-active');
                if (burgerbtn) burgerbtn.classList.remove('burger-active');




            }
        });
    });

    // --- 5. LÓGICA SCROLL SPY (ILUMINAR ENLACES EN BLANCO) ---
    const secciones = document.querySelectorAll('section[id]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Usamos un umbral bajo (0.2) para que detecte secciones cortas como AboutMe
            if (entry.isIntersecting) {
                const idActual = entry.target.getAttribute('id').toLowerCase();
                
                navLinks.forEach(link => {
                    const href = link.getAttribute('href').replace('#', '').toLowerCase();
                    
                    link.classList.remove('active');
                    if (href === idActual) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        threshold: 0.2, // Con que se vea el 20% ya lo activa
        rootMargin: "-15% 0px -60% 0px" // Ajusta el área de detección al centro/superior
    });

    secciones.forEach(seccion => navObserver.observe(seccion));

    // Respaldo para el final de la página (iluminar contacto si es muy corto)
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            navLinks.forEach(l => l.classList.remove('active'));
            const ultimoEnlace = navLinks[navLinks.length - 1];
            if (ultimoEnlace) ultimoEnlace.classList.add('active');
        }
    });

});