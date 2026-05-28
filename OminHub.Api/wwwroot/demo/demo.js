import { Config } from "../core/config.js";

const VIDEO_SRC = Config.BASE_PATH + "/assets/videos/sample.mp4";

const CATEGORIES = [
    "Recommended",
    "Trending",
    "Gaming",
    "Music",
    "Tech",
    "Lifestyle",
];
const TAGS = [
    "4K",
    "60fps",
    "Atmospheric",
    "Study",
    "Relax",
    "Deep Focus",
    "Loop",
];

const STORE_KEYS = {
    favorites: "ominhub_favorites_v1",
    history: "ominhub_history_v1",
    uploaded: "ominhub_uploaded_v1",
    carousel: "ominhub_carousel_v1",
};
// Imágenes por defecto para el carrusel
const DEFAULT_CAROUSEL_IMAGES = [
    Config.BASE_PATH + "/assets/thumbs/t1.jpg",
    Config.BASE_PATH + "/assets/thumbs/t2.jpg",
    Config.BASE_PATH + "/assets/thumbs/t3.jpg",
    Config.BASE_PATH + "/assets/thumbs/t4.jpg",
    Config.BASE_PATH + "/assets/thumbs/t5.jpg",
    Config.BASE_PATH + "/assets/thumbs/t6.jpg",
];

const VIDEOS = (function buildVideos() {
    const list = [];
    let idCounter = 1;
    for (let c = 0; c < CATEGORIES.length; c++) {
        const cat = CATEGORIES[c];
        for (let i = 1; i <= 12; i++) {
            const thumb =
                DEFAULT_CAROUSEL_IMAGES[
                (idCounter - 1) % DEFAULT_CAROUSEL_IMAGES.length
                ];
            const durationMin = 8 + ((i * (c + 1)) % 25);
            const durationSec = (i * 7) % 60;
            const views = 4200 * idCounter + 13500;
            list.push({
                id: String(idCounter),
                title: cat + " session #" + i,
                category: cat,
                duration: durationMin + ":" + String(durationSec).padStart(2, "0"),
                views: views,
                thumb: thumb,
                src: VIDEO_SRC,
                tags: [TAGS[(i + c) % TAGS.length], TAGS[(i + c + 2) % TAGS.length]],
                channelName: "Channel " + c,
                channelAvatar: "https://i.pravatar.cc/40?u=" + idCounter,
                subscribers: 1000 * c + 2500,
                likes: Math.floor(views / 100),
                dislikes: Math.floor(views / 1000),
                comments: [
                    {
                        author: "User1",
                        text: "Great video!",
                        avatar: "https://i.pravatar.cc/40?u=101",
                    },
                    {
                        author: "User2",
                        text: "I love this channel.",
                        avatar: "https://i.pravatar.cc/40?u=102",
                    },
                ],
            });
            idCounter++;
        }
    }
    return list;
})();

        const DEMO_VIDEOS = Array.from({ length: 17 }, (_, i) => ({
            id: i + 1,
            username: "@Username",
            title: "Demo Video #" + (i + 1),
            thumbnailUrl: "/uploads/test.jpg",
            duration: (8 + i) + ":" + String((i * 7) % 60).padStart(2, "0"),
            views: 10000 + i * 3211,
            categories: [
                "Category " + ((i % 5) + 1),
                "Extra Cat A",
                "Extra Cat B",
                "Extra Cat C",
                "Extra Cat D"
            ],
            tags: [
                "tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"
            ]
        }));

  function getVideoById(id) {
    return Demo.VIDEOS.find((v) => v.id === String(id));
  }

export const Demo = {
    STORE_KEYS,
    DEFAULT_CAROUSEL_IMAGES,
    VIDEOS,
    CATEGORIES,
    TAGS,
    VIDEO_SRC,
    getVideoById,
    DEMO_VIDEOS
}