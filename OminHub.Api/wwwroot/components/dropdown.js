function initializeDropdownMenu() {
    const btn = document.getElementById('more-options-btn');
    const menu = document.getElementById('dropdown-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', e => {
        e.stopPropagation();
        menu.classList.toggle('show');
    });

    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('show');
        }
    });

    menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            menu.classList.remove('show');
            handleDropdownAction(action);
        });
    });
}

function handleDropdownAction(action) {
    if (action === 'share') {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => Ui.showNotification('Enlace copiado al portapapeles', 'success'));
        } else {
            Ui.showNotification('Comparte: ' + url, 'info');
        }
    } else if (action === 'report') {
        Ui.showNotification('Funcionalidad de reporte en desarrollo', 'info');
    } else if (action === 'analytics') {
        Tabs.switchTab('analytics');
    } else if (action === 'settings') {
        Tabs.switchTab('edit');
    } else if (action === 'logout') {
        Ui.showNotification('Sesión cerrada', 'info');
    }
}


export const Dropdown = {
    initializeDropdownMenu,
    handleDropdownAction
}