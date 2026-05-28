import { VideoFeatured } from "./services/video/video.featured.js";

function renderHome(main) {
    main.innerHTML = [
        '<section class="section">',
        '  <h1 class="section-title" data-translate="Featured videos">Featured videos</h1>',
        '  <p class="section-subtitle" data-translate="Scroll or change page to explore more.">Scroll or change page to explore more.</p>',
        '  <div id="home-grid" class="video-grid"></div>',
        '  <div id="home-pagination" class="pagination"></div>',
        "</section>",
    ].join("");




    const grid = document.getElementById("home-grid");
    const pag = document.getElementById("home-pagination");

    VideoFeatured.loadFeatured(grid, 1, pag);
}

export const Home = {
    renderHome
}