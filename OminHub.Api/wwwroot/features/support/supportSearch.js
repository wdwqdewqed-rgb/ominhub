function setupSupportSearch() {

    const searchButton =
        document.getElementById('search-support');

    const searchInput =
        document.getElementById('support-search');

    if (!searchButton || !searchInput) return;

    function performSearch() {

        const query = searchInput.value.trim();

        if (!query) {
            alert('Please enter a search term.');
            return;
        }

        alert(`Searching for: "${query}"`);
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function (e) {

        if (e.key === 'Enter') {
            performSearch();
        }

    });
}

export const SupportSearch = {
    setupSupportSearch
};