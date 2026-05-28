function setupPagination({
  gridEl,
  paginationEl,
  items,
  perPage = 12,
  renderItem
}) {

  let currentPage = 1;

  const totalPages =
    Math.max(
      1,
      Math.ceil(items.length / perPage)
    );

  function renderPage(page) {

    currentPage =
      Math.min(
        Math.max(1, page),
        totalPages
      );

    const start =
      (currentPage - 1) * perPage;

    const currentItems =
      items.slice(start, start + perPage);

    // Render items
    gridEl.innerHTML = "";

    currentItems.forEach((item) => {

      const element =
        renderItem(item);

      if (element) {
        gridEl.appendChild(element);
      }
    });

    renderControls();
  }

  function renderControls() {

    paginationEl.innerHTML = "";

    if (totalPages <= 1) return;

    // Prev
    const prev =
      createControlButton(
        "Prev",
        currentPage === 1,
        () => renderPage(currentPage - 1)
      );

    paginationEl.appendChild(prev);

    // Pages
    for (let p = 1; p <= totalPages; p++) {

      const btn =
        createPageButton(p);

      paginationEl.appendChild(btn);
    }

    // Next
    const next =
      createControlButton(
        "Next",
        currentPage === totalPages,
        () => renderPage(currentPage + 1)
      );

    paginationEl.appendChild(next);
  }

  function createPageButton(page) {

    const btn =
      document.createElement("button");

    btn.textContent = String(page);

    if (page === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      renderPage(page);
    });

    return btn;
  }

  function createControlButton(
    text,
    disabled,
    onClick
  ) {

    const btn =
      document.createElement("button");

    btn.textContent = text;

    btn.disabled = disabled;

    btn.addEventListener("click", onClick);

    return btn;
  }

  renderPage(1);

  return {
    next: () => renderPage(currentPage + 1),
    prev: () => renderPage(currentPage - 1),
    goTo: (page) => renderPage(page),
    getCurrentPage: () => currentPage,
    getTotalPages: () => totalPages
  };
}

export const Pagination = {
  setupPagination
};