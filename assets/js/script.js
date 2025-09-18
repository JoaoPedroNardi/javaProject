document.addEventListener('DOMContentLoaded', () => {

    /**
     * Funcionalidade do Carrossel (para index.html e home-logado.html)
     */
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
        const carouselContent = carousel.querySelector('.carousel-content');
        const slides = Array.from(carousel.querySelectorAll('.carousel-item'));
        const nextButton = document.getElementById('carousel-next');
        const prevButton = document.getElementById('carousel-prev');
        const dotsContainer = document.getElementById('carousel-dots');
        let currentSlide = 0;
        let slideInterval;

        function updateCarousel() {
            if (carouselContent && slides.length > 0) {
                carouselContent.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('button');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
        }

        function showNextSlide() {
            currentSlide = (currentSlide + 1) % (slides.length || 1);
            updateCarousel();
        }

        if (dotsContainer) {
            slides.forEach((_, i) => {
                const button = document.createElement('button');
                button.addEventListener('click', () => {
                    currentSlide = i;
                    updateCarousel();
                    resetInterval();
                });
                dotsContainer.appendChild(button);
            });
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(showNextSlide, 5000);
        }

        nextButton?.addEventListener('click', () => {
            showNextSlide();
            resetInterval();
        });
        prevButton?.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
            resetInterval();
        });
        
        updateCarousel();
        resetInterval();
    }

    /**
     * Funcionalidade de Busca (para home-logado.html)
     */
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const allBooksData = document.getElementById('all-books-data');
        if (allBooksData) {
            const allBooks = JSON.parse(allBooksData.textContent);
            const resultsGrid = document.getElementById('search-results-grid');
            const resultsCount = document.getElementById('search-results-count');
            const noResultsMessage = document.getElementById('no-results-message');

            function renderBooks(books) {
                resultsGrid.innerHTML = '';
                noResultsMessage.style.display = (books.length === 0 && searchInput.value) ? 'block' : 'none';
                books.forEach(book => {
                    const originalPriceHtml = book.originalPrice ? `<span style="text-decoration: line-through; color: var(--muted-foreground); font-size: 0.85rem;">${book.originalPrice}</span>` : '';
                    resultsGrid.insertAdjacentHTML('beforeend', `
                        <div class="card book-card">
                            <div class="image-container"><img src="${book.image}" alt="${book.title}"></div>
                            <div class="content">
                                <h3>${book.title}</h3>
                                <p class="subtext">${book.author}</p>
                                <div style="display: flex; align-items: baseline; gap: 0.5rem; margin: 0.5rem 0;">
                                    <span style="font-weight: 700; color: var(--gold); font-size: 1.1rem;">${book.price}</span>
                                    ${originalPriceHtml}
                                </div>
                                <button class="btn btn-gold" style="width: 100%;">Ver Mais</button>
                            </div>
                        </div>`);
                });
            }

            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (!searchTerm) {
                    renderBooks(allBooks);
                    resultsCount.textContent = `${allBooks.length} livros disponíveis`;
                    return;
                }
                const filteredBooks = allBooks.filter(book =>
                    book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
                );
                renderBooks(filteredBooks);
                resultsCount.textContent = `${filteredBooks.length} livro(s) encontrado(s) para "${e.target.value}"`;
            });
            renderBooks(allBooks);
        }
    }

    /**
     * Funcionalidade das Abas (Tabs) para Painéis
     */
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
        const tabTriggers = tabsContainer.querySelectorAll('.tabs-trigger');
        const tabContents = tabsContainer.querySelectorAll('.tabs-content');
        
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetTabId = 'tab-' + trigger.dataset.tab;
                tabTriggers.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                trigger.classList.add('active');
                document.getElementById(targetTabId)?.classList.add('active');
            });
        });
    }

    /**
     * Funcionalidade de Mostrar/Ocultar Senha
     */
    const passwordToggles = document.querySelectorAll('.password-toggle');
    if (passwordToggles.length > 0) {
        passwordToggles.forEach(button => {
            const targetInputId = button.dataset.target;
            const targetInput = document.getElementById(targetInputId);
            if(targetInput) {
                button.addEventListener('click', () => {
                    const isPassword = targetInput.type === 'password';
                    targetInput.type = isPassword ? 'text' : 'password';
                });
            }
        });
    }

    /**
     * NOVO: Funcionalidade do Dropdown do Usuário (para home-logado.html)
     */
    const avatarBtn = document.getElementById('avatar-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (avatarBtn && dropdownMenu) {
        avatarBtn.addEventListener('click', (event) => {
            // Impede que o clique no botão feche o menu imediatamente
            event.stopPropagation(); 
            dropdownMenu.classList.toggle('active');
        });

        // Fecha o dropdown se o usuário clicar em qualquer outro lugar da página
        document.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('active')) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

});