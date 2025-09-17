/* ===================================================================
   ARQUIVO JAVASCRIPT UNIFICADO PARA O PROJETO LIVRARIA CLÁSSICA
   =================================================================== */

// Adiciona um listener que espera o conteúdo da página carregar antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Funcionalidade do Carrossel
     * Executa apenas se encontrar o elemento '#hero-carousel' (na index.html)
     */
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-item');
        const nextButton = document.getElementById('carousel-next');
        const prevButton = document.getElementById('carousel-prev');
        const dotsContainer = document.getElementById('carousel-dots');
        let currentSlide = 0;
        let slideInterval;

        if (slides.length > 0) {
            slides[0].classList.add('active');
        }

        function showSlide(index) {
            currentSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        }
        
        slides.forEach((_, i) => {
            const button = document.createElement('button');
            button.addEventListener('click', () => {
                showSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(button);
        });

        if(dotsContainer.firstChild) {
            dotsContainer.firstChild.classList.add('active');
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        }

        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetInterval();
        });
        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetInterval();
        });
        
        resetInterval();
    }


    /**
     * Funcionalidade de Mostrar/Ocultar Senha
     * Executa apenas se encontrar botões com a classe '.password-toggle' (em login.html e register.html)
     */
    const passwordToggles = document.querySelectorAll('.password-toggle');
    if (passwordToggles.length > 0) {
        passwordToggles.forEach(button => {
            button.addEventListener('click', () => {
                const targetInput = document.getElementById(button.dataset.target);
                if (targetInput) {
                    const isPassword = targetInput.type === 'password';
                    targetInput.type = isPassword ? 'text' : 'password';
                    
                    const eyeIcon = button.querySelector('.eye-icon');
                    const eyeOffIcon = button.querySelector('.eye-off-icon');

                    if (eyeIcon && eyeOffIcon) {
                        eyeIcon.style.display = isPassword ? 'none' : 'block';
                        eyeOffIcon.style.display = isPassword ? 'block' : 'none';
                    }
                }
            });
        });
    }


    /**
     * Funcionalidade das Abas (Tabs)
     * Executa apenas se encontrar o elemento '.tabs-container' (na cliente.html)
     */
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
        const tabTriggers = tabsContainer.querySelectorAll('.tabs-trigger');
        const tabContents = tabsContainer.querySelectorAll('.tabs-content');
        
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                tabTriggers.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                trigger.classList.add('active');
                const targetContent = document.getElementById('tab-' + trigger.dataset.tab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

});