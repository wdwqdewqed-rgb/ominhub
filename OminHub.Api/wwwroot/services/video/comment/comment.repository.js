import { CommentApi } from "./comment.api.js";
import { CommentMock } from "./comment.mock.js";
import { DemoController } from "../../../core/demo_controller.js";

const USE_MOCKS = DemoController.USE_MOCK;

async function fetchComments(
  videoId,
  page,
  pageSize,
  sort,
  signal
) {

  console.log(
    "[CommentRepository] fetchComments",
    {
      videoId,
      page,
      pageSize,
      sort,
      USE_MOCKS
    }
  );

  if (USE_MOCKS) {

    console.log(
      "[CommentRepository] devolviendo MOCK"
    );

    console.log(
      CommentMock
    );

    return structuredClone(
      CommentMock
    );
    console.log(
  "[CommentRepository] devolviendo MOCK",
  structuredClone(CommentMock)
);
  }

  try {

    const data =
      await CommentApi.getComments(
        videoId,
        page,
        pageSize,
        sort,
        signal
      );

    console.log(
      "[CommentRepository] respuesta API",
      data
    );

    return data;

  } catch (err) {

    console.error(
      "[CommentRepository] ERROR",
      err
    );

    return structuredClone(
      CommentMock
    );
    console.log(
  "[CommentRepository] devolviendo MOCK",
  structuredClone(CommentMock)
);
  }
}

async function createComment(videoId, body) {

  if (USE_MOCKS) {

    return {
      id: Date.now(),
      body,
      createdAt: new Date().toISOString()
    };
  }

  return CommentApi.createComment(videoId, body);
}

export const CommentRepository = {
  fetchComments,
  createComment
};