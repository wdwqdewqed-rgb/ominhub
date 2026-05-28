function setupPagination(gridEl, paginationEl, items, perPage) {
    let currentPage = 1;
    const totalPages = Math.max(1, Math.ceil(items.length / perPage));

    function renderPage(page) {
        currentPage = Math.min(Math.max(1, page), totalPages);
        const start = (currentPage - 1) * perPage;
        const currentItems = items.slice(start, start + perPage);

        gridEl.innerHTML = "";
        currentItems.forEach((v) => gridEl.appendChild(createVideoCard(v)));

        paginationEl.innerHTML = "";
        if (totalPages <= 1) return;

        const prev = document.createElement("button");
        prev.textContent = "Prev";
        prev.disabled = currentPage === 1;
        prev.addEventListener("click", () => renderPage(currentPage - 1));
        paginationEl.appendChild(prev);

        for (let p = 1; p <= totalPages; p++) {
            const btn = document.createElement("button");
            btn.textContent = String(p);
            if (p === currentPage) btn.classList.add("active");
            btn.addEventListener("click", () => renderPage(p));
            paginationEl.appendChild(btn);
        }

        const next = document.createElement("button");
        next.textContent = "Next";
        next.disabled = currentPage === totalPages;
        next.addEventListener("click", () => renderPage(currentPage + 1));
        paginationEl.appendChild(next);
    }

    renderPage(1);
}

export const Pagination = {
    setupPagination
}