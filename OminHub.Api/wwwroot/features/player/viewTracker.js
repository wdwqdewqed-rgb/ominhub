import { Api } from "../../services/api.js";

export function setupViewTracking(video, videoId) {

  let viewRegistered = false;

  video.addEventListener("timeupdate", async () => {

    if (viewRegistered) return;

    if (video.currentTime >= 8) {

      viewRegistered = true;

      try {

        await Api.apiFetch(
          `/api/system/videos/${videoId}/view`,
          {
            method: "POST"
          }
        );

      } catch (err) {

        console.error(
          "Error registering view",
          err
        );
      }
    }
  });
}