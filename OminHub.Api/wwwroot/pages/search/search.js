import { Demo } from "../../demo/demo.js";
import { Pagination } from "../../components/pagination.js";
import { VideoCard } from "../../components/videoCard.js";
import { Html } from "../../utils/html.js";
import { Router } from "../../utils/router.js";

function renderSearch(main) {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || "").trim();
    main.innerHTML = [
        '<section class="section">',
        '  <h1 class="section-title" data-translate="Search">Search</h1>',
        '  <p class="section-subtitle" data-translate="Type a keyword and press Enter to filter videos by title, category or tags.">Type a keyword and press Enter to filter videos by title, category or tags.</p>',
        '  <form class="search-bar" id="page-search-form" style="max-width:480px;margin-bottom:14px;">',
        '    <input type="text" id="page-search-input" placeholder="Search in OMINHUB..." value="' +
        Html.escapeHtml(q) +
        '" />',
        '    <button type="submit">Search</button>',
        "  </form>",
        '  <div id="search-grid" class="video-grid"></div>',
        '  <div id="search-pagination" class="pagination"></div>',
        "</section>",
    ].join("");

    const form = document.getElementById("page-search-form");
    const input = document.getElementById("page-search-input");
    const grid = document.getElementById("search-grid");
    const pag = document.getElementById("search-pagination");

    function perform(term) {
        const t = term.toLowerCase();
        const filtered = !t
            ? Demo.VIDEOS
            : Demo.VIDEOS.filter(
                (v) =>
                    v.title.toLowerCase().includes(t) ||
                    v.category.toLowerCase().includes(t) ||
                    v.tags.some((tag) => tag.toLowerCase().includes(t))
            );
        if (!filtered.length) {
            grid.innerHTML =
                '<div class="empty-state">No results found. Try another keyword.</div>';
            pag.innerHTML = "";
            return;
        }
        Pagination.setupPagination(grid, pag, filtered, 12);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const value = input.value.trim();
        const searchHref = Router.resolveHref("search");
        const url = searchHref + (value ? "?q=" + encodeURIComponent(value) : "");
        window.location.href = url;
    });

    perform(q);
}

export const Search = {
    renderSearch
}
