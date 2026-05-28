
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.profile-nav-item').forEach(b => b.classList.remove('active'));
    const tab = document.getElementById(tabId + '-tab');
    if (tab) tab.classList.add('active');
    const btn = document.querySelector(`[data-tab="${tabId}"]`);
    if (btn) btn.classList.add('active');
}
  function initializeTabs() {
    const tabButtons = document.querySelectorAll('.profile-nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.dataset.tab;

        // Remover clase activa de todos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activar pestaña seleccionada
        button.classList.add('active');
        const activeTab = document.getElementById(`${tabId}-tab`);
        if (activeTab) {
          activeTab.classList.add('active');
        }
      });
    });
  }

export const Tabs = {
    switchTab,
    initializeTabs
}