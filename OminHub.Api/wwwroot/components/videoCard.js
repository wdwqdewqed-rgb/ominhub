import { Html } from "../utils/html.js";
import { Router } from "../utils/router.js";
import { Storage } from "../core/storage.js";
import { VideoFormatters } from "../utils/videoFormatters.js";
import { Favorites } from "../services/favorites.js";
import { VideoFeatured } from "../services/video/video.featured.js";

const _colors = ['#2d1b69', '#1b3a4b', '#2d4a1b', '#4a1b2d', '#1b2d4a', '#3a2d1b', '#1b4a3a', '#4a3a1b'];
const _emojis = ['🎬', '🎥', '📹', '🎞️', '🎭', '🎨', '🎮', '🎵'];


function renderVideoGrid(videos) {
  const grid = document.getElementById('videos-grid');
  if (!grid) return;
  if (!videos.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">🎬</div><h3>No hay videos</h3><p>Sube tu primer video.</p></div>';
    return;
  }
  grid.innerHTML = videos.map((v, i) => {
    const ci = i % _colors.length;
    return `
          <div class="video-card-profile" data-video-id="${v.id}">
            <div class="video-thumb">
              <div class="thumb-placeholder" style="background:${_colors[ci]};">
                <span style="font-size:36px;">${_emojis[ci]}</span>
              </div>
              <div class="video-overlay">${v.duration}</div>
              <div class="sample-badge">${v.badge}</div>
              <div class="play-overlay"><div class="play-icon">▶</div></div>
            </div>
            <div class="video-info">
              <div class="video-title">${Html.escapeHtml(v.title)}</div>
              <div class="video-meta">${v.date}</div>
              <div class="video-stats">
                <span>👁️ ${v.views}</span>
                <span>👍 ${v.likes}</span>
                <span>💬 ${v.comments}</span>
              </div>
              <div class="video-actions">
                <button class="btn-video-action btn-open-vstats" data-vid="${v.id}" data-vtab="stats">📊 Estadísticas</button>
                <button class="btn-video-action btn-open-vedit" data-vid="${v.id}" data-vtab="edit">✏️ Editar</button>
              </div>
            </div>
          </div>`;
  }).join('');

  // Wire up action buttons
  grid.querySelectorAll('[data-vid]').forEach(btn => {
    btn.addEventListener('click', e => {
      const vid = parseInt(btn.dataset.vid);
      const tab = btn.dataset.vtab || 'stats';
      openVideoModal(vid, tab);
    });
  });
}

function createVideoCard(video, options) {
  const user = Storage.getStored("ominhub_user", null);
  const isLogged = !!user;

  options = options || {};
  const wrapper = document.createElement("article");
  wrapper.className = "video-card";
  const watchHref =
    Router.resolveHref("watch") + "?id=" + encodeURIComponent(video.id);

  wrapper.innerHTML = [
    '<div class="video-thumb-wrapper">',
    '  <img class="video-thumb" src="' +
    video.thumb +
    '" alt="' +
    Html.escapeHtml(video.title) +
    '">',
    '  <div class="video-duration">' + video.duration + "</div>",
    "</div>",
    '<div class="video-body">',
    '  <div class="video-title">' + Html.escapeHtml(video.title) + "</div>",
    '  <div class="video-meta">' +
    VideoFormatters.buildMetaSummary(video.categories, video.views) +
    "</div>",

    '  <div class="video-username">' +
    video.username +
    "</div>",

    '  <div class="video-tags">' +
    VideoFormatters.renderSmartChips(video.tags, 3) +
    "</div>",

    '  <div class="video-actions">',
    '    <button class="btn-pill" type="button">Watch</button>',
    isLogged
      ? '<span class="favorite-indicator" title="Add to favorites">&#9825;</span>'
      : '<span class="favorite-indicator disabled" title="Login to add favorites">&#9825;</span>',

    "  </div>",
    "</div>",
  ].join("");

  wrapper.addEventListener("click", function (e) {
    const isButton =
      e.target.closest("button") ||
      e.target.classList.contains("favorite-indicator");
    if (e.target.classList.contains("favorite-indicator")) {
      e.stopPropagation();

      if (!isLogged) {
        showLoginModal(); // o navigateTo("login")
        return;
      }

      toggleFavorite(video.id, e.target);
      return;
    }
    if (isButton && e.target.classList.contains("btn-pill")) {
      window.location.href = watchHref;
      return;
    }
    window.location.href = watchHref;
  });

  const favEl = wrapper.querySelector(".favorite-indicator");
  if (favEl && Favorites.isFavorite(video.id)) {
    favEl.textContent = "♥";
  }

  return wrapper;
}

function renderPagination(gridEl, pagEl, current, total) {
  pagEl.innerHTML = "";

  if (total <= 1) return;

  const prev = document.createElement("button");
  prev.textContent = "Prev";
  prev.disabled = current === 1;
  prev.onclick = () => VideoFeatured.loadFeatured(gridEl, current - 1, pagEl);
  pagEl.appendChild(prev);

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === current) btn.classList.add("active");
    btn.onclick = () => VideoFeatured.loadFeatured(gridEl, i, pagEl);
    pagEl.appendChild(btn);
  }

  const next = document.createElement("button");
  next.textContent = "Next";
  next.disabled = current === total;
  next.onclick = () => VideoFeatured.loadFeatured(gridEl, current + 1, pagEl);
  pagEl.appendChild(next);
}

export const VideoCard = {
  renderVideoGrid,
  createVideoCard,
  renderPagination,
  _colors,
  _emojis
}