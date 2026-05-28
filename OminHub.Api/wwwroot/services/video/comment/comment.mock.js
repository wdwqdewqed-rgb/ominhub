export const CommentMock = {

  comments: {
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 2,

    items: [
      {
        id: 1,
        authorName: "Ignacio",
        body: "Excelente video",
        likes: 12,
        createdAt: new Date().toISOString()
      },

      {
        id: 2,
        authorName: "Carlos",
        body: "Muy buen contenido",
        likes: 4,
        createdAt: new Date().toISOString()
      }
    ]
  }
};