import { Api } from "../../api.js";
import { RelatedVideoMock } from "../../../demo/watch/related-video.mock.js";

function resolveEndpoint(videoId, filter) {

  console.log(
    "[RelatedVideoService] resolveEndpoint()",
    {
      videoId,
      filter
    }
  );

  switch (filter) {
    case "related":
      return `/api/system/videos/${videoId}/related`;

    case "same-channel":
      return `/api/system/videos/${videoId}/samechannel`;

    case "trending":
      return `/api/system/videos/${videoId}/trending`;

    default:
      console.warn(
        "[RelatedVideoService] filtro desconocido:",
        filter
      );

      return null;
  }
}

async function fetchVideos(videoId, filter) {

  console.group(
    "[RelatedVideoService] fetchVideos"
  );

  console.log("videoId:", videoId);
  console.log("filter:", filter);

  try {

    const endpoint =
      resolveEndpoint(videoId, filter);

    console.log(
      "endpoint resuelto:",
      endpoint
    );

    if (!endpoint) {

      console.warn(
        "[RelatedVideoService] endpoint nulo, devolviendo array vacío"
      );

      console.groupEnd();

      return [];
    }

    console.log(
      "[RelatedVideoService] ejecutando Api.apiFetch..."
    );

    const data =
      await Api.apiFetch(endpoint);

    console.log(
      "[RelatedVideoService] respuesta API:",
      data
    );

    if (data) {

      console.log(
        "[RelatedVideoService] usando datos API"
      );

      console.groupEnd();

      return data;
    }

    console.warn(
      "[RelatedVideoService] API devolvió null/undefined, usando MOCK"
    );

    console.log(
      "[RelatedVideoService] mock:",
      RelatedVideoMock.RelatedVideosMock
    );

    console.groupEnd();

    return RelatedVideoMock.RelatedVideosMock;

  } catch (error) {

    console.error(
      "[RelatedVideoService] error consumiendo API",
      error
    );

    console.warn(
      "[RelatedVideoService] usando MOCK por excepción"
    );

    console.log(
      "[RelatedVideoService] mock:",
      RelatedVideoMock.RelatedVideosMock
    );

    console.groupEnd();

    return RelatedVideoMock.RelatedVideosMock;
  }
}

export const RelatedVideoService = {
  fetchVideos
};