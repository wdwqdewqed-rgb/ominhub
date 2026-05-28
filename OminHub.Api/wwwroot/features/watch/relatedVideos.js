/*import { Api } from "../../services/api.js";
import { VideoMapper } from "../../mappers/video.mapper.js";
import { EnhancedVideoCard } from "../../components/video/enhancedVideoCard.js";

async function loadVideosByFilter(
  video,
  token,
  currentRenderToken,
  filter = "related"
) {
  const relatedContainer =
    document.getElementById("watch-related");

  if (!relatedContainer) return;

  relatedContainer.innerHTML =
    "<div class='loading'>Cargando...</div>";

  const endpoint = resolveFilterEndpoint(video.id, filter);

  if (!endpoint) return;

  const raw = await Api.apiFetch(endpoint);

  if (!raw) return;

  if (token !== currentRenderToken) return;

  const videos =
    raw.map(VideoMapper.mapApiVideoToWatchModel);

  renderRelatedVideos(
    relatedContainer,
    videos
  );
}

function resolveFilterEndpoint(videoId, filter) {
  switch (filter) {
    case "related":
      return `/api/system/videos/${videoId}/related`;

    case "same-channel":
      return `/api/system/videos/${videoId}/samechannel`;

    case "trending":
      return `/api/system/videos/${videoId}/trending`;

    default:
      return null;
  }
}

function renderRelatedVideos(container, videos) {
  if (!videos.length) {
    container.innerHTML = "<p>No hay videos</p>";
    return;
  }

  container.innerHTML = videos
    .map((v) =>
      EnhancedVideoCard.createEnhancedVideoCard(v)
    )
    .join("");
}

export const RelatedVideos = {
  loadVideosByFilter
};*/

import { VideoMapper } from "../../mappers/video.mapper.js";
import { EnhancedVideoCard } from "../../components/video/enhancedVideoCard.js";
import { RelatedVideoService } from "../../services/video/relatedVideo/related-video.service.js";

async function loadVideosByFilter(
  video,
  filter = "related"
) {
  const relatedContainer =
    document.getElementById("watch-related");

  if (!relatedContainer) return;

  relatedContainer.innerHTML =
    "<div class='loading'>Cargando...</div>";

  const raw =
    await RelatedVideoService.fetchVideos(
      video.id,
      filter
    );

  console.log(
    "[RelatedVideos] raw:",
    raw
  );

  if (!raw) return;

  console.log(
    "[RelatedVideos] antes del mapper"
  );

  let videos;

  try {

    videos =
      raw.map(VideoMapper.mapApiVideoToWatchModel);

    console.log(
      "[RelatedVideos] despues del mapper",
      videos
    );

  } catch (err) {

    console.error(
      "[RelatedVideos] ERROR mapper",
      err
    );

    return;
  }

  console.log(
  "[RelatedVideos] container",
  relatedContainer
);

console.log(
  "[RelatedVideos] cantidad videos",
  videos.length
);
  try {

  renderRelatedVideos(
    relatedContainer,
    videos
  );

} catch (err) {

  console.error(
    "[RelatedVideos] ERROR render",
    err
  );
}
}

function renderRelatedVideos(container, videos) {

  console.log(
    "[RelatedVideos] renderRelatedVideos()",
    videos
  );

  if (!videos.length) {
    container.innerHTML = "<p>No hay videos</p>";
    return;
  }

  container.innerHTML = videos
    .map(v =>
      EnhancedVideoCard.createEnhancedVideoCard(v)
    )
    .join("");

  console.log(
    "[RelatedVideos] html generado:",
    container.innerHTML
  );
}

export const RelatedVideos = {
  loadVideosByFilter
};