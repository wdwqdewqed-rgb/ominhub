import { Auth } from "../core/auth.js";
import { Html } from "../utils/html.js";

function renderUserPosts(user) {
    const savedUser = Auth.getSessionUser();
    
    const container = document.getElementById('profile-posts');
    const createBtn = document.getElementById('post-create-btn');
    if (!container) return;

    function displayPosts() {
        const posts = savedUser?.posts || user.posts || [];

        if (!posts.length) {
            container.innerHTML = `
            <div class="empty-state">
              <div class="empty-icon">📝</div>
              <h3>No hay posts aún</h3>
              <p>¡Sé el primero en publicar algo!</p>
            </div>`;
            return;
        }

        container.innerHTML = posts.map(post => `
          <div class="post-card">
            <div class="post-header">
              <div class="post-avatar">
                <img src="${user.avatar || `https://i.pravatar.cc/150?u=${user.userName}`}" alt="avatar">
              </div>
              <div>
                <div class="post-name">${Html.escapeHtml(user.displayName || user.userName)}</div>
                <div class="post-time">${post.time}</div>
              </div>
            </div>
            <div class="post-banner">
              <img src="${post.image}" alt="Post image">
            </div>

            <div class="post-caption">
              ${Html.escapeHtml(post.caption)}
            </div>
            <div class="post-actions">
              <button class="btn-post-action">👍 Me gusta${post.likes ? ' · ' + post.likes : ''}</button>
              <button class="btn-post-action">💬 Comentar${post.comments ? ' · ' + post.comments : ''}</button>
              <button class="btn-post-action">🔄 Compartir</button>
            </div>
          </div>
        `).join('');
    }

    if (createBtn) {
        createBtn.addEventListener('click', () => {
            const textarea = document.getElementById('post-content');
            const content = textarea.value.trim();
            if (!content) { Ui.showNotification('Escribe algo para publicar', 'error'); return; }

            if (!Auth.savedUser.posts) Auth.savedUser.posts = [];
            Auth.savedUser.posts.unshift({ text: content, time: 'Hace unos momentos', likes: 0, comments: 0 });
            user.posts = Auth.savedUser.posts;
            Storage.setStored("ominhub_user", Auth.savedUser);

            displayPosts();
            textarea.value = '';
            Ui.showNotification('Post publicado ✅', 'success');
        });
    }

    displayPosts();
}

export const UserPostCard = {
    renderUserPosts
}