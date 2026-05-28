
import { Api } from "../../api.js";

async function getComments(videoId, page, pageSize, sort, signal) {

  return Api.apiFetch(
    `/api/system/${videoId}/comments?page=${page}&pageSize=${pageSize}&sort=${sort}`,
    { signal }
  );
}

async function createComment(videoId, body) {

  return Api.apiFetch(
    `/api/viewer/${videoId}/comments`,
    {
      method: "POST",
      body: JSON.stringify({ body })
    }
  );
}

export const CommentApi = {
  getComments,
  createComment
};