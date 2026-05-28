import { Demo } from "../../demo/demo.js";
import { Carousel } from "../../features/carousel.js";
import { Pagination } from "../../features/pagination.js";

function renderFavorites(main) {
    const favIds = Storage.getStored(Demo.STORE_KEYS.favorites, []);
    const carouselImages = Storage.getStored(
        Demo.STORE_KEYS.carousel,
        Demo.DEFAULT_CAROUSEL_IMAGES
    );

    main.innerHTML = [
        '<section class="section">',
        '  <h1 class="section-title" data-translate="Favorites">Favorites</h1>',
        '  <p class="section-subtitle" data-translate="All the videos you have marked with the heart will appear here.">All the videos you have marked with the heart will appear here.</p>',
        '  <div class="carousel-section">',
        '    <div id="favorites-carousel"></div>',
        "  </div>",
        '  <div id="fav-grid" class="video-grid"></div>',
        '  <div id="fav-pagination" class="pagination"></div>',
        "</section>",
    ].join("");

    // Inicializar carrusel
    const carouselContainer = document.getElementById("favorites-carousel");
    if (carouselContainer) {
        Carousel.createCarousel(carouselContainer, carouselImages, {
            autoPlay: true,
            interval: 4000,
            showIndicators: true,
            showOverlay: true,
        });
    }

    const grid = document.getElementById("fav-grid");
    const pag = document.getElementById("fav-pagination");

    const favVideos = favIds.map((id) => Demo.getVideoById(id)).filter(Boolean);

    if (!favVideos.length) {
        grid.innerHTML =
            '<div class="empty-state" data-translate="You have no favorites yet. Click the heart on any video to add it.">You have no favorites yet. Click the heart on any video to add it.</div>';
        pag.innerHTML = "";
        return;
    }

    Pagination.setupPagination(grid, pag, favVideos, 12);
}

export const Favorites = {
    renderFavorites
}