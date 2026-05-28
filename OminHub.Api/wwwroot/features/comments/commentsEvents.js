import { Auth } from "../../core/auth.js";
import { Router } from "../../utils/router.js";
import { Api } from "../../services/api.js";
import { Ui } from "../../core/ui.js";

function setupCommentEvents() {
    // Botones de like en comentarios
    const currentUser = Auth.getSessionUser(); // 🔥 FIX

    document.querySelectorAll('.comment-like-btn').forEach(btn => {
        btn.addEventListener('click', async function () {
            if (!currentUser) {
                window.location.href = Router.resolveHref('login');
                return;
            }

            const commentId = this.dataset.commentId;

            const data = await Api.apiFetch(
                `/api/viewer/comments/${commentId}/react`,
                {
                    method: "POST",
                    body: JSON.stringify({ type: "like" })
                }
            );

            if (!data) return;

            this.classList.toggle('liked', data.userReaction === "like");
            this.querySelector('.like-count').textContent = data.likes;
        });
    });

    // Menú de comentarios
    document.querySelectorAll('.comment-menu-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            // Aquí mostrarías un menú de opciones (reportar, copiar, etc.)
            Ui.showNotification('Funcionalidad en desarrollo', 'info');
        });
    });
}

export const CommentsEvents = {

    setupCommentEvents
}