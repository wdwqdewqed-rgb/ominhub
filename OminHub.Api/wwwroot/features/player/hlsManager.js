export async function setupHls(video, sourceUrl) {

    if (!sourceUrl) return null;

    // Safari nativo
    if (video.canPlayType("application/vnd.apple.mpegurl")) {

        video.src = sourceUrl;

        return null;
    }

    // HLS.js
    if (window.Hls && Hls.isSupported()) {

        const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true
        });

        hls.loadSource(sourceUrl);

        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS error:", data);
        });

        await new Promise((resolve) => {
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                resolve();
            });
        });

        return hls;
    }

    console.error("HLS no soportado");

    return null;
}