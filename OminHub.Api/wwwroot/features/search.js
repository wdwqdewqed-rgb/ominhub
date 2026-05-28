  function wire() {
    const form = document.getElementById("top-search-form");
    const input = document.getElementById("top-search-input");
    if (!form || !input) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const term = input.value.trim();
      const searchHref = Router.resolveHref("search");
      if (!searchHref) return;
      const url = searchHref + (term ? "?q=" + encodeURIComponent(term) : "");
      window.location.href = url;
    });
  }

    export const Search = {
    wire
}