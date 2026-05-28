import { VideoApi } from "./video.api.js";
import { VideoMock } from "../../demo/profile/video.mock.js";
import { DemoController } from "../../core/demo_controller.js";


const USE_MOCKS = DemoController.USE_MOCK;

async function fetchVideoById(id) {

  if (USE_MOCKS) {
    const data = structuredClone(VideoMock.MockVideosForWatch);

    console.log('[VideoRepository] Mock original:', VideoMock.MockVideosForWatch);
    console.log('[VideoRepository] Mock clonado:', data);

    return data;
}


  try {

    const data = await VideoApi.getVideoById(id);

    return data;

  } catch (err) {

    console.error("API ERROR:", err);

    return structuredClone(VideoMock.MockVideosForWatch);
  }
}

async function fetchUserVideos(userId) {

  if (USE_MOCKS) {
    console.log('[VideoRepository] USE_MOCKS activo');
    console.log('[VideoRepository] VideoMock:', VideoMock.MockVideos);

    return structuredClone(VideoMock.MockVideos);
}

  try {

    const data = await VideoApi.getUserVideos(userId);

    return data;

  } catch (err) {

    console.error("API ERROR:", err);

    return structuredClone(VideoMock.MockVideos);
  }
}

export const VideoRepository = {
  fetchVideoById,
  fetchUserVideos
};