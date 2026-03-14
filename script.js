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

                observer.unobserve(entry.target);
            }

        });

    });
    

    const items = document.querySelectorAll('.sections, .Vector-Retangulo, .VectorDocs');

    items.forEach(item => {
        observer.observe(item);
    });

});