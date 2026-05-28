const MockVideos = [
  {
    id: 1,
    title: "Mi setup 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",

    views: 12000,
    likes: 1200,
    comments: 84,

    duration: "12:42",

    createdAt: new Date().toISOString()
  },

  {
    id: 2,
    title: "Cómo edito mis videos",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",

    views: 42000,
    likes: 5400,
    comments: 320,

    duration: "18:20",

    createdAt: new Date().toISOString()
  }
];

const MockVideosForWatch = [
  {
    id: 1,

    title: "Cómo construir una plataforma social moderna con JavaScript Vanilla",

    description: `
En este video exploramos cómo crear una interfaz moderna estilo creator platform
utilizando JavaScript modular, arquitectura escalable y componentes reutilizables.
`.trim(),

    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

    thumbnailUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",

    duration: "18:42",

    views: 184203,

    uploadDate: "2026-05-18T21:30:00Z",

    categories: ["Tecnología"],

    tags: [
      "javascript",
      "frontend",
      "ui",
      "social media"
    ],

    channelId: 7,

    channelName: "Ignacio Dev Studio",

    channelAvatar:
      "https://i.pravatar.cc/300?img=12",

    channelVerified: true,

    subscribers: 48200,

    likes: 15420,

    dislikes: 102,

    userReaction: "like",

    isSubscribed: false
  }
];

export const VideoMock = {
  MockVideos,
  MockVideosForWatch
}