import { Demo } from "../../demo/demo.js";
import { Carousel } from "../../features/carousel.js";
import { VideoCard } from "../../components/videoCard.js";


function renderHistory(main) {
    const historyRaw = Storage.getStored(Demo.STORE_KEYS.history, []);
    const carouselImages = Storage.getStored(
        Demo.STORE_KEYS.carousel,
        Demo.DEFAULT_CAROUSEL_IMAGES
    );

    main.innerHTML = [
        '<section class="section">',
        '  <h1 class="section-title" data-translate="Watch history">Watch history</h1>',
        '  <p class="section-subtitle" data-translate="This is a local demo history stored only in your browser.">This is a local demo history stored only in your browser.</p>',
        '  <div class="carousel-section">',
        '    <div id="history-carousel"></div>',
        "  </div>",
        '  <div id="hist-grid" class="video-grid"></div>',
        "</section>",
    ].join("");

    // Inicializar carrusel
    const carouselContainer = document.getElementById("history-carousel");
    if (carouselContainer) {
        Carousel.createCarousel(carouselContainer, carouselImages, {
            autoPlay: true,
            interval: 4500,
            showIndicators: true,
            showOverlay: true,
        });
    }

    const grid = document.getElementById("hist-grid");

    if (!historyRaw.length) {
        grid.innerHTML =
            '<div class="empty-state" data-translate="You have not watched any sessions yet. Pick something from Home!">You have not watched any sessions yet. Pick something from Home!</div>';
        return;
    }

    historyRaw.forEach((item) => {
        const v = Demo.getVideoById(item.id);
        if (!v) return;
        const card = VideoCard.createVideoCard(v);
        grid.appendChild(card);
    });
}

export const History = {
    renderHistory
}