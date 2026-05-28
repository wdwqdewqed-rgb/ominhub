function updateRelatedUI(filter) {

    const titleEl = document.getElementById('related-title');
    const tabs = document.querySelectorAll('.filter-tab');

    const map = {
        "related": "Relacionados",
        "same-channel": "Mismo canal",
        "trending": "Tendencia"
    };

    // 🔥 actualizar título SIEMPRE
    if (titleEl) {
        titleEl.textContent = map[filter] || "Relacionados";
    }

    // 🔥 actualizar tabs
    tabs.forEach(tab => {
        const tabFilter = tab.dataset.filter;

        // ocultar el activo
        if (tabFilter === filter) {
            tab.style.display = "none";
        } else {
            tab.style.display = "inline-flex";
            tab.classList.remove('active');
        }
    });
}

export const RelatedUi = {
    updateRelatedUI
}