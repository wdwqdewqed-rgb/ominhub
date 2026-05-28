import { Demo } from "../../demo/demo.js";
import { Pagination } from "../../components/pagination.js";
import { VideoCard } from "../../components/videoCard.js";

function renderTags(main) {
    main.innerHTML = [
        '<section class="section">',
        '  <h1 class="section-title" data-translate="Popular tags">Popular tags</h1>',
        '  <p class="section-subtitle" data-translate="Select a tag to see all the sessions that use it.">Select a tag to see all the sessions that use it.</p>',
        '  <div id="tag-filters" class="chip-filter-row"></div>',
        '  <div id="tag-grid" class="video-grid"></div>',
        '  <div id="tag-pagination" class="pagination"></div>',
        "</section>",
    ].join("");

    const tagFilters = document.getElementById("tag-filters");
    const grid = document.getElementById("tag-grid");
    const pag = document.getElementById("tag-pagination");

    const uniqueTags = Array.from(new Set(Demo.VIDEOS.flatMap((v) => v.tags)));
    let current = uniqueTags[0] || null;

    uniqueTags.forEach((tag) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.textContent = tag;
        chip.className = "chip-filter" + (tag === current ? " active" : "");
        chip.addEventListener("click", () => {
            current = tag;
            document
                .querySelectorAll(".chip-filter")
                .forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");
            const filtered = Demo.VIDEOS.filter((v) => v.tags.includes(tag));
            Pagination.setupPagination(grid, pag, filtered, 12, VideoCard.createVideoCard);
        });
        tagFilters.appendChild(chip);
    });

    const initial = Demo.VIDEOS.filter((v) => v.tags.includes(current));
    Pagination.setupPagination(grid, pag, initial, 12, VideoCard.createVideoCard);
}

export const Tags = {
    renderTags
}