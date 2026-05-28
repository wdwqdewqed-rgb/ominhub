import { Html } from './html.js';
import { Formatters } from './formatters.js';

function buildMetaSummary(categories, views) {

  if (!categories?.length) {
    return `${Formatters.formatViews(views)} views`;
  }

  const visible = categories.slice(0, 2);
  const hidden = categories.length - visible.length;

  let html = visible
    .map(Html.escapeHtml)
    .join(" · ");

  if (hidden > 0) {

    const rest = categories
      .slice(2)
      .map(Html.escapeHtml)
      .join("<br>");

    html += `
      · <span
          class="meta-more"
          data-tooltip="${rest}">
          +${hidden} categories
        </span>
    `;
  }

  html += ` · ${Formatters.formatViews(views)} views`;

  return html;
}
  function renderSmartChips(list, maxVisible = 3) {
    const visible = list.slice(0, maxVisible);
    const hidden = list.length - visible.length;

    const chips = visible
      .map(t => `<span class="video-tag">${Html.escapeHtml(t)}</span>`)
      .join("");

    if (hidden > 0) {
      const rest = list.slice(maxVisible).map(Html.escapeHtml).join("<br>");
      return chips +
        `<span class="video-tag more" data-tooltip="${rest}">+${hidden}</span>`;
    }

    return chips;
  }

export const VideoFormatters = {
  buildMetaSummary,
  renderSmartChips
};