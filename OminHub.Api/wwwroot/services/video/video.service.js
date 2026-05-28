import { VideoRepository } from "./video.repository.js";
import { VideoMapper } from "../../mappers/video.mapper.js";

async function fetchVideoById(id) {

  const raw = await VideoRepository.fetchVideoById(id);

  console.log("raw", raw);
console.log("Array?", Array.isArray(raw));
console.log("raw[0]", raw[0]);

const video = Array.isArray(raw)
  ? raw[0]
  : raw;

return VideoMapper.mapApiVideoToWatchModel(video);  const videos =
  raw.map(VideoMapper.mapApiVideoToWatchModel);

console.log(
  "[VideoService] videos mapeados:",
  videos
);
}

async function fetchUserVideos(userId) {

  const raw = await VideoRepository.fetchUserVideos(userId);

  return raw;
}

export const VideoService = {
  fetchVideoById,
  fetchUserVideos
};