export function setupPlayerEvents(video, hls) {

  video.addEventListener("play", () => {
    console.log("▶ reproduciendo");
  });

  video.addEventListener("pause", () => {
    console.log("⏸ pausado");
  });

  video.addEventListener("ended", () => {
    console.log("🏁 finalizado");
  });

  video.addEventListener("error", (err) => {
    console.error("Video error:", err);
  });
}