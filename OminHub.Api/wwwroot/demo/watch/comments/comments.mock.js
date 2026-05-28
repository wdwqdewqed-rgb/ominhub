export const CommentMock = {
  page: 1,
  pageSize: 10,
  totalPages: 1,
  totalCount: 3,

  items: [
    {
      id: 1,
      body: "Excelente video, muy útil.",
      createdAt: "2026-05-26T12:00:00Z",

      userId: 100,
      userName: "Ignacio",

      userAvatar:
        "https://i.pravatar.cc/150?img=1",

      likes: 15,
      dislikes: 0
    },

    {
      id: 2,
      body: "Me gustó mucho la explicación.",
      createdAt: "2026-05-25T12:00:00Z",

      userId: 101,
      userName: "Carlos",

      userAvatar:
        "https://i.pravatar.cc/150?img=2",

      likes: 5,
      dislikes: 0
    },

    {
      id: 3,
      body: "Esperando la segunda parte.",
      createdAt: "2026-05-24T12:00:00Z",

      userId: 102,
      userName: "María",

      userAvatar:
        "https://i.pravatar.cc/150?img=3",

      likes: 9,
      dislikes: 1
    }
  ]
};

console.log(
  "[CommentMock]",
  CommentMock
);
