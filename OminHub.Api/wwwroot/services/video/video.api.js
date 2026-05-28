import { Api } from "../api.js";

async function getVideoById(id) {
  return Api.apiFetch(`/api/system/videos/${id}`);
}

async function getUserVideos(userId) {
  return Api.apiFetch(`/api/system/users/${userId}/videos`);
}

export const VideoApi = {
  getVideoById,
  getUserVideos
};