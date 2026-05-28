import { Api } from "../../services/api.js";
import { CommentsRenderer } from "../comments/commentsRenderer.js";
import { Ui } from "../../core/ui.js";
import { Auth } from "../../core/auth.js";
import { CommentService } from "../../services/video/comment/comment.service.js";
import { CommentMapper } from "../../mappers/comment.mapper.js";

const sortValue = document.getElementById("sort-comments")?.value || "newest";

async function loadCommentsPage(videoId, state, reset = false) {
    console.log(
    "[CommentsLoader] loadCommentsPage"
    );
    if (state.loading) return;

    state.loading = true;

    if (reset) {
        state.page = 1;
        state.items = [];
        const container = document.getElementById("comment-list");
        if (container) {
            container.innerHTML = "<div class='loading'>Cargando comentarios...</div>";
        }
    }

    try {
        

        if (state.abortController) {
            state.abortController.abort();
        }

        state.abortController = new AbortController();

        const data =
        await CommentService.fetchComments(
            videoId,
            state.page,
            state.pageSize,
            sortValue,
            state.abortController.signal
        );

        console.log(
        "[CommentsLoader] data",
        data
        );

        if (!data || !Array.isArray(data.items)) return;

        state.totalPages = Number(data.totalPages) || 1;
        state.totalCount = Number(data.totalCount) || 0;

        const countEl = document.getElementById("comment-count");
        if (countEl) {
            countEl.textContent = state.totalCount;
        }

        const currentUser = Auth.getSessionUser();
        const mapped = data.items.map(c => CommentMapper.mapApiComment(c, currentUser));

        console.log(
    "[CommentsLoader] mapped",
    mapped
);

        state.items = mapped;



        const commentContainer =
    document.getElementById("comment-list");

console.log(
    "[CommentsLoader] container",
    commentContainer
);

console.log(
    "[CommentsLoader] items",
    state.items
);

CommentsRenderer.renderCommentsEnhanced(
    state.items,
    commentContainer
);

        /*if (loadBtn) {
            loadBtn.style.display =
                state.page >= state.totalPages ? "none" : "inline-flex";
        }*/

        if (countEl) {
            countEl.textContent = state.totalCount;
        }

    } catch (err) {

    console.error(
      "[CommentsLoader] ERROR",
      err
    );

    if (err.name === "AbortError") return;

    Ui.showNotification(
      "Error cargando comentarios",
      "error"
    );
} finally {
        state.loading = false;
    }
}

export const CommentsLoader = {
    loadCommentsPage,
    sortValue
}