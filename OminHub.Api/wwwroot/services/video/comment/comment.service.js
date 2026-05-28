import { CommentRepository } from "./comment.repository.js";

async function fetchComments(
  videoId,
  page,
  pageSize,
  sort,
  signal
) {
  console.log(
    "[CommentService] fetchComments"
  );

  const data = await CommentRepository.fetchComments(
    videoId,
    page,
    pageSize,
    sort,
    signal
  );

  console.log(
  "[CommentService] raw",
  JSON.stringify(data, null, 2)
);

  const normalized = {
    page: data.page ?? data.Page,
    pageSize: data.pageSize ?? data.PageSize,
    totalPages: data.totalPages ?? data.TotalPages,
    totalCount: data.totalCount ?? data.TotalCount,
    items: data.items ?? data.Items
  };

  const source = data.comments ?? data;

  return {
    page: source.page,
    pageSize: source.pageSize,
    totalPages: source.totalPages,
    totalCount: source.totalCount,
    items: source.items
  };
}

async function createComment(videoId, body) {

  return CommentRepository.createComment(videoId, body);
}

export const CommentService = {
  fetchComments,
  createComment
};