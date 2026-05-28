// CARRUSEL PROFESIONAL
import { Demo } from "../demo/demo.js";
import { Router } from "../utils/router.js";

function createCarousel(container, images, options = {}) {
    const {
        autoPlay = true,
        interval = 5000,
        showIndicators = true,
        showOverlay = true,
    } = options;

    let currentIndex = 0;
    let intervalId = null;

    // Obtener imágenes del localStorage o usar las predeterminadas
    const carouselImages = images.length > 0 ? images : Demo.DEFAULT_CAROUSEL_IMAGES;

    // Crear estructura del carrusel
    const carouselHTML = `
      <div class="carousel-container">
        ${carouselImages
            .map(
                (img, index) => `
          <div class="carousel-slide ${index === 0 ? "active" : ""}">
            <img src="${img}" alt="Featured content ${index + 1
                    }" class="carousel-image">
            ${showOverlay
                        ? `
              <div class="carousel-overlay">
                <h2 class="carousel-title">Discover Amazing Content</h2>
                <p class="carousel-subtitle">Explore our curated collection of premium videos</p>
                <a href="${Router.resolveHref(
                            "home"
                        )}" class="carousel-cta">Start Watching</a>
              </div>
            `
                        : ""
                    }
          </div>
        `
            )
            .join("")}
        ${showIndicators
            ? `
          <div class="carousel-indicators">
            ${carouselImages
                .map(
                    (_, index) => `
              <div class="carousel-indicator ${index === 0 ? "active" : ""
                        }" data-index="${index}"></div>
            `
                )
                .join("")}
          </div>
        `
            : ""
        }
      </div>
    `;

    container.innerHTML = carouselHTML;

    const slides = container.querySelectorAll(".carousel-slide");
    const indicators = container.querySelectorAll(".carousel-indicator");

    function goToSlide(index) {
        // Remover clases activas
        slides.forEach((slide) =>
            slide.classList.remove("active", "prev", "next")
        );
        indicators.forEach((indicator) => indicator.classList.remove("active"));

        // Actualizar índice
        currentIndex = index;

        // Aplicar clases
        slides[currentIndex].classList.add("active");
        if (indicators.length > 0) {
            indicators[currentIndex].classList.add("active");
        }

        // Aplicar clases prev/next para transiciones
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        const nextIndex = (currentIndex + 1) % slides.length;

        slides[prevIndex].classList.add("prev");
        slides[nextIndex].classList.add("next");
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    // Event listeners para indicadores
    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => {
            const index = parseInt(indicator.getAttribute("data-index"));
            goToSlide(index);
            resetAutoPlay();
        });
    });

    // Auto-play
    function startAutoPlay() {
        if (autoPlay) {
            intervalId = setInterval(nextSlide, interval);
        }
    }

    function stopAutoPlay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Iniciar auto-play
    startAutoPlay();

    // Pausar auto-play al interactuar
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);

    // Navegación con teclado
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
    });

    return {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        stop: stopAutoPlay,
        start: startAutoPlay,
    };
}

export const Carousel = {
    createCarousel
}