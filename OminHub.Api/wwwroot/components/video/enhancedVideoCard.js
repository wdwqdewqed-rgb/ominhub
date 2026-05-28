// /components/video/enhancedVideoCard.js

import { Router } from '../../utils/router.js';
import { Html } from '../../utils/html.js';
import { Formatters } from '../../utils/formatters.js';

function createEnhancedVideoCard(video) {
  const duration = video.duration || '0:00';
  const uploadTime = video.uploadDate || 'Hace 2 días';

  return `
    <div class="related-video-card" data-video-id="${video.id}">
      <a href="${Router.resolveHref('watch')}?id=${video.id}" class="video-link">

        <div class="related-video-thumb">
          <img
            src="${video.thumbnail || video.src}"
            alt="${Html.escapeHtml(video.title)}"
            class="related-thumb-image"
          >

          <div class="video-duration">${duration}</div>

          ${video.featured
            ? '<div class="featured-badge">Destacado</div>'
            : ''
          }
        </div>

        <div class="related-video-info">

          <h3
            class="related-video-title"
            title="${Html.escapeHtml(video.title)}"
          >
            ${Html.escapeHtml(
              video.title.length > 50
                ? video.title.substring(0, 50) + '...'
                : video.title
            )}
          </h3>

          <div class="related-channel-info">
            <img
              src="${video.channelAvatar}"
              alt="${Html.escapeHtml(video.channelName)}"
              class="related-channel-avatar"
            >

            <span class="related-channel-name">
              ${Html.escapeHtml(video.channelName)}
            </span>
          </div>

          <div class="related-video-stats">
            <span class="stat">${Formatters.formatViews(video.views)} vistas</span>
            <span class="stat-divider">•</span>
            <span class="stat">${uploadTime}</span>
          </div>

        </div>
      </a>

      <button class="related-video-menu" title="Más opciones">
        <span>⋯</span>
      </button>
    </div>
  `;
}

export const EnhancedVideoCard = {
    createEnhancedVideoCard

}