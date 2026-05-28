import { Config } from "../../core/config.js";
import { CommentsEvents } from "./commentsEvents.js";
import { Html } from "../../utils/html.js";

function renderCommentsEnhanced(
  comments,
  container
) {
  if (!container) return;

  container.innerHTML = "";

  if (!comments?.length) {
    renderEmptyComments(container);
    return;
  }

  comments.forEach((comment) => {
    const commentEl =
      createCommentElement(comment);

    container.appendChild(commentEl);
  });

  CommentsEvents.setupCommentEvents();
}

function renderEmptyComments(container) {
  container.innerHTML = `
    <div class="no-comments">
      <div class="no-comments-icon">💬</div>
      <h3>No hay comentarios aún</h3>
      <p>Sé el primero en comentar este video</p>
    </div>
  `;
}

function createCommentElement(comment) {
  console.log(
    "[CommentsRenderer] comment",
    comment
  );

  const safeAvatar =
    resolveSafeAvatar(comment);

    console.log(
    "[CommentsRenderer] avatar",
    safeAvatar
  );
  const commentEl =
    document.createElement("div");

  commentEl.className =
    "comment-item-enhanced";

  commentEl.innerHTML =
    buildCommentHTML(
      comment,
      safeAvatar
    );

  return commentEl;
}

function resolveSafeAvatar(comment) {
  if (
    typeof comment.authorAvatar === "string"
  ) {
    if (
      comment.authorAvatar.startsWith("http")
    ) {
      return comment.authorAvatar;
    }

    if (
      comment.authorAvatar.startsWith("/")
    ) {
      return (
        Config.API_BASE +
        comment.authorAvatar
      );
    }
  }

  return (
    Config.BASE_PATH +
    "/assets/default-avatar.png"
  );
}

function buildCommentHTML(
  comment,
  safeAvatar
) {
  return `
      <div class="comment-avatar">
        <img src="${safeAvatar}" alt="${Html.escapeHtml(comment.author)}" loading="lazy">
        ${comment.isAuthor ? '<span class="comment-author-badge" title="Autor del video">🎬</span>' : ''}
      </div>
      <div class="comment-content">
        <div class="comment-header">
          <div class="comment-author-info">
            <span class="comment-author-name">${Html.escapeHtml(comment.authorName)}</span>
            ${comment.authorVerified ? '<span class="verified-badge">✓</span>' : ''}
            <span class="comment-time">${comment.time}</span>
          </div>
          <button class="comment-menu-btn" title="Más opciones">
            <span>⋯</span>
          </button>
        </div>
        <div class="comment-text">${Html.escapeHtml(comment.text)}</div>
        <div class="comment-actions">
          <button class="comment-like-btn ${comment.liked ? 'liked' : ''}" data-comment-id="${comment.id}">
            <span class="like-icon">👍</span>
            <span class="like-count">${comment.likes || 0}</span>
          </button>



        </div>
        ${comment.replies && comment.replies.length > 0 ? `
          <div class="comment-replies">
            <button class="show-replies-btn">
              <span class="reply-icon">↪️</span>
              <span>Ver ${comment.replies.length} respuestas</span>
            </button>
          </div>
        ` : ''}
      </div>
    `;
}

export const CommentsRenderer = {
  renderCommentsEnhanced
};