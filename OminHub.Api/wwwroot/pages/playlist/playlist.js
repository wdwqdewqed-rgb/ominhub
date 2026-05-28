import { Demo } from "../../demo/demo.js";
import { Carousel } from "../../features/carousel.js";
import { Storage } from "../../core/storage.js";


function renderPlaylist(main) {
    const carouselImages = Storage.getStored(
        Demo.STORE_KEYS.carousel,
        Demo.DEFAULT_CAROUSEL_IMAGES
    );

    main.innerHTML = [
        '<section class="section">',
        '  <h1 class="section-title" data-translate="My playlists">My playlists</h1>',
        '  <p class="section-subtitle" data-translate="Create manual collections of videos. This is a visual demo — backend logic is not implemented.">Create manual collections of videos. This is a visual demo — backend logic is not implemented.</p>',
        '  <div class="carousel-section">',
        '    <div id="playlist-carousel"></div>',
        "  </div>",
        '  <div class="form-card">',
        '    <h1 data-translate="Create a new playlist">Create a new playlist</h1>',
        '    <p data-translate="Give your playlist a name and short description.">Give your playlist a name and short description.</p>',
        '    <div class="form-field">',
        '      <label for="pl-name" data-translate="Name">Name</label>',
        '      <input id="pl-name" type="text" placeholder="Night coding set" />',
        "    </div>",
        '    <div class="form-field">',
        '      <label for="pl-desc" data-translate="Description">Description</label>',
        '      <input id="pl-desc" type="text" placeholder="Deep focus 4K walks for late sessions" />',
        "    </div>",
        '    <button class="nav-button" type="button" id="pl-save-btn" data-translate="Save demo playlist">Save demo playlist</button>',
        '    <div class="form-footer" id="pl-info"></div>',
        "  </div>",
        "</section>",
    ].join("");

    // Inicializar carrusel
    const carouselContainer = document.getElementById("playlist-carousel");
    if (carouselContainer) {
        Carousel.createCarousel(carouselContainer, carouselImages, {
            autoPlay: true,
            interval: 5000,
            showIndicators: true,
            showOverlay: true,
        });
    }

    const btn = document.getElementById("pl-save-btn");
    const info = document.getElementById("pl-info");
    if (btn && info) {
        btn.addEventListener("click", () => {
            info.textContent =
                "Playlist saved locally (demo only, not persisted on server).";
        });
    }
}

export const Playlist = {
    renderPlaylist
}