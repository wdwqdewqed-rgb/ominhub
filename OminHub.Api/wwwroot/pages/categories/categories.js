import { Demo } from "../../demo/demo.js";
import { Pagination } from "../../components/pagination.js";
import { VideoCard } from "../../components/videoCard.js";

function renderCategories(main) {
    main.innerHTML = [
        '<section class="section">',
        '  <h1 class="section-title" data-translate="Browse by category">Browse by category</h1>',
        '  <p class="section-subtitle" data-translate="Click a category to filter the catalog. Use the pagination to move between pages of results.">Click a category to filter the catalog. Use the pagination to move between pages of results.</p>',
        '  <div id="cat-filters" class="chip-filter-row"></div>',
        '  <div id="cat-grid" class="video-grid"></div>',
        '  <div id="cat-pagination" class="pagination"></div>',
        "</section>",
    ].join("");

    const catFilters = document.getElementById("cat-filters");
    const grid = document.getElementById("cat-grid");
    const pag = document.getElementById("cat-pagination");

    const uniqueCats = Array.from(new Set(Demo.VIDEOS.map((v) => v.category)));
    let currentCat = uniqueCats[0] || null;

    uniqueCats.forEach((cat) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.textContent = cat;
        chip.className = "chip-filter" + (cat === currentCat ? " active" : "");
        chip.addEventListener("click", () => {
            currentCat = cat;
            document
                .querySelectorAll(".chip-filter")
                .forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");
            const filtered = Demo.VIDEOS.filter((v) => v.category === currentCat);
            Pagination.setupPagination(grid, pag, filtered, 12, VideoCard.createVideoCard);
        });
        catFilters.appendChild(chip);
    });

    const initial = Demo.VIDEOS.filter((v) => v.category === currentCat);
    Pagination.setupPagination(grid, pag, initial, 12, VideoCard.createVideoCard);
}

export const Categories = {
    renderCategories
}