let tooltipEl = null;

function createTooltip() {

  if (tooltipEl) return tooltipEl;

  tooltipEl = document.createElement("div");

  tooltipEl.className = "smart-tooltip";

  document.body.appendChild(tooltipEl);

  return tooltipEl;
}

function showTooltip(target, html) {

  const tooltip = createTooltip();

  tooltip.innerHTML = html;

  const rect = target.getBoundingClientRect();

  tooltip.style.left = rect.left + "px";

  tooltip.style.top =
    rect.bottom + 8 + "px";

  tooltip.classList.add("visible");
}

function hideTooltip() {

  if (!tooltipEl) return;

  tooltipEl.classList.remove("visible");
}

export const Tooltip = {
  showTooltip,
  hideTooltip
};