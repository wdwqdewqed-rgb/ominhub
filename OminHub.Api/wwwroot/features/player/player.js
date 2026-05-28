import { setupHls } from "./hlsManager.js";
import { setupQualitySelector } from "./qualitySelector.js";
import { setupViewTracking } from "./viewTracker.js";
import { setupPlayerEvents } from "./playerEvents.js";

async function initialize(videoData) {

  const video = document.getElementById("video");

  if (!video || !videoData?.src) {
    return null;
  }

  // Inicializar HLS
  const hls = await setupHls(video, videoData.src);

  // Calidad
  setupQualitySelector(hls);

  // Tracking de views
  setupViewTracking(video, videoData.id);

  // Eventos generales
  setupPlayerEvents(video, hls);

  return {
    video,
    hls
  };
}

export const Player = {
  initialize
};