function mapApiComment(c, currentUser) {
  return {
    id: c.id,
    text: c.body,

    createdAt: c.createdAt,

    time: new Date(
      c.createdAt
    ).toLocaleString(),

    likes: c.likes,
    dislikes: c.dislikes,

    liked:
      c.currentUserReaction === "like",

    disliked:
      c.currentUserReaction === "dislike",

    authorId: c.authorId,
    authorName: c.authorName,

    authorAvatar: c.authorAvatar,

    authorVerified:
      c.authorVerified,

    isAuthor: currentUser
      ? c.authorId === currentUser.id
      : false,

    replies: (c.replies || []).map((r) =>
      mapApiComment(r, currentUser)
    )
  };
}

export const CommentMapper = {
  mapApiComment
};