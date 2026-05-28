import { VideoFeatured } from "../../services/video/video.featured.js";
import { Router } from "../../utils/router.js";
import { VideoService } from "../../services/video/video.service.js";
import { VideoMapper } from "../../mappers/video.mapper.js";
import { Api } from "../../services/api.js";
import { Ui } from "../../core/ui.js";
import { Auth } from "../../core/auth.js";
import { Html } from "../../utils/html.js";
import { Formatters } from "../../utils/formatters.js";
import { RelatedVideos } from "../../features/watch/relatedVideos.js";
import { CommentMapper } from "../../mappers/comment.mapper.js";
import { CommentsRenderer } from "../../features/comments/commentsRenderer.js";
import { WatchController } from "./watchController.js";
import { History } from "../../features/history/history.js";
import { CommentsLoader } from "../../features/watch/commentsLoader.js";
import { CommentService } from "../../services/video/comment/comment.service.js";

let currentRenderToken = 0;
let globalCommentsAbort = null;

async function renderWatch(main) {

  const state = {
    page: 1,
    pageSize: 10,
    totalPages: 0,
    totalCount: 0,
    items: [],
    loading: false,
    abortController: null
  };

  main.innerHTML = "<div class='loading'>Cargando video...</div>";

  const id = Router.getCurrentVideoIdFromLocation();
  console.log(
  "[WATCH] id:",
  id
);
  if (!id) {
    main.innerHTML = "<div class='empty-state'>Video inválido</div>";
    return;
  }
  if (!/^\d+$/.test(id)) {
    main.innerHTML = "<div class='empty-state'>ID inválido</div>";
    return;
  }

  const token = ++currentRenderToken;

  const video = await VideoService.fetchVideoById(id);

  console.log(
  "[WATCH] resultado fetchVideoById",
  video
);

  if (token !== currentRenderToken) return;

  if (!video) {
    main.innerHTML = "<div class='empty-state'>Video no encontrado</div>";
    return;
  }

  try {
    if (state.abortController) {
      state.abortController.abort();
    }

    state.abortController = new AbortController();

    const data = await CommentService.fetchComments(
      video.id,
      state.page,
      state.pageSize,
      CommentsLoader.sortValue,
      state.abortController.signal
    );

    if (!data || typeof data !== "object") return;

    const normalized = {
      page: data.page ?? data.Page,
      pageSize: data.pageSize ?? data.PageSize,
      totalPages: data.totalPages ?? data.TotalPages,
      totalCount: data.totalCount ?? data.TotalCount,
      items: data.items ?? data.Items
    };

    if (!Array.isArray(normalized.items)) return;

    Object.assign(state, {
      page: Number(normalized.page),
      pageSize: Number(normalized.pageSize),
      totalPages: Number(normalized.totalPages),
      totalCount: Number(normalized.totalCount),
      items: normalized.items,
      loading: false
    });

  } catch (err) {
    if (err.name === "AbortError") return;
    Ui.showNotification("Error cargando comentarios", "error");
  } finally {
    state.loading = false;
  }


  const currentUser = Auth.getSessionUser();

  if (!video) {
    main.innerHTML = `
      <section class="section">
        <div class="empty-state" style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 64px; margin-bottom: 20px; opacity: 0.5;">🎬</div>
          <h2 style="margin: 0 0 15px 0; color: #fff;">Selecciona un video</h2>
          <p style="margin: 0 0 30px 0; color: rgba(255,255,255,0.7); max-width: 500px; margin: 0 auto 30px;">
            Elige un video desde el Inicio, Categorías o Búsqueda para comenzar a ver.
          </p>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="${Router.resolveHref('home')}" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
              <span>🏠</span> Ir al Inicio
            </a>
            <a href="${Router.resolveHref('categories')}" class="btn-outline" style="display: inline-flex; align-items: center; gap: 8px;">
              <span>📂</span> Explorar Categorías
            </a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  History.pushHistory(video.id);

  // Verificar si el usuario ya está suscrito a este canal
  const isSubscribed = video.isSubscribed === true;
  const isAuthorVideo = currentUser ? video.channelId === currentUser.id : false;

  // CORRECCIÓN: Manejar tags de forma segura
  const tagsHtml = (() => {
    if (!video.tags) return '';

    // Si tags es un string
    if (typeof video.tags === 'string') {
      if (!video.tags.trim()) return '';
      return `
        <div class="video-tags">
          ${video.tags.split(',').map(tag => `
            <span class="tag">${Html.escapeHtml(tag.trim())}</span>
          `).join('')}
        </div>
      `;
    }

    // Si tags es un array
    if (Array.isArray(video.tags)) {
      if (video.tags.length === 0) return '';
      return `
        <div class="video-tags">
          ${video.tags.map(tag => `
            <span class="tag">${Html.escapeHtml(typeof tag === 'string' ? tag.trim() : String(tag))}</span>
          `).join('')}
        </div>
      `;
    }

    return '';
  })();

  main.innerHTML = `
    <section class="section watch-layout">
      <!-- Columna principal del video -->
      <div class="watch-main-col">
        <!-- Reproductor de video -->
              <h1 class="watch-title">${Html.escapeHtml(video.title)}</h1>
        <div class="watch-player-wrapper">
<video id="video" controls autoplay playsinline class="watch-player" poster="${video.thumbnail || video.src}">            <source src="${video.src}" type="${video.src.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'}">
            Tu navegador no soporta el elemento de video.
          </video>
          <div class="player-controls-overlay">
            <div class="player-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
              </div>
              <div class="time-display">
                <span class="current-time">0:00</span> / <span class="total-time">${video.duration || '0:00'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Información del video -->
        <div class="video-info-container">
          <div class="container-options">
            <div class="related-video-stats">
              <span class="stat">${Formatters.formatViews(video.views)} vistas</span>
              <span class="stat-divider">•</span>
              <span class="stat">${video.uploadDate || 'Hace 2 días'}</span>
            </div>


            <div class="video-actions-section">
              <div class="like-dislike-container">
                <button class="action-btn like-btn" id="like-btn">
                  <span class="action-icon">👍</span>
                  <span class="action-count" id="like-count">${Formatters.formatViews(video.likes)}</span>
                </button>
                <div class="divider"></div>
                <button class="action-btn dislike-btn" id="dislike-btn">
                  <span class="action-icon">👎</span>
                  <span class="action-count" id="dislike-count">${Formatters.formatViews(video.dislikes || 0)}</span>
                </button>
              </div>
              
             


              <button class="action-btn" id="share-btn" title="Compartir video">
                <span class="action-icon">📤</span>
                <span class="action-text">Compartir</span>
              </button>
              
              <button class="action-btn" id="more-actions-btn" title="Más acciones">
                <span class="action-icon">⋯</span>
              </button>
            </div>
          </div>
          <!-- Barra de acciones -->
          <div class="watch-actions-bar">
            <!-- Información del canal -->
            <div class="channel-info-section">
              <div class="channel-avatar-wrapper" id="go-to-channel-btn" style="cursor: pointer;">
                <img src="${video.channelAvatar}" loading="lazy" alt="${Html.escapeHtml(video.channelName)}" class="channel-avatar">
                ${video.channelVerified ? '<span class="verified-badge" title="Canal verificado">✓</span>' : ''}
              </div>
              <div class="channel-details">
                <div class="channel-name">${Html.escapeHtml(video.channelName)}</div>
                <div class="channel-subs">${Formatters.formatViews(video.subscribers || 0)} suscriptores</div>
              </div>
              
              ${isAuthorVideo === false ? `
              <div class="channel-actions">
                <button class="subscribe-btn ${isSubscribed ? 'subscribed' : ''}" id="subscribe-btn">
                  <span class="subscribe-icon">${isSubscribed ? '✓' : '🔔'}</span>
                  <span class="subscribe-text">${isSubscribed ? 'Suscrito' : 'Suscribirse'}</span>
                </button>
              </div>
              ` : ''}
            </div>

            <!-- Acciones del video -->
            
          </div>

          <!-- Descripción del video -->
          <div class="profile-nav">
            <button class="profile-nav-item active" data-tab="videos">
              <span class="nav-icon">🎬</span>
              <span class="nav-text">Videos</span>
            </button>
            <button class="profile-nav-item" data-tab="description">
              <span class="nav-icon">🎬</span>
              <span class="nav-text">Descripción</span>
            </button>
            <button class="profile-nav-item" data-tab="comments">
              <span class="nav-icon">🎬</span>
              <span class="nav-text">Comentarios</span>
            </button>
          </div>

          <div class="tab-content" id="description-tab">
            <div class="video-description-section">
              <div class="description-header">
                <h3>Descripción</h3>
                <button class="show-more-btn" id="show-description-btn">Mostrar más</button>
              </div>
              <div class="description-content" id="video-description">
                <p>${Html.escapeHtml(video.description || 'No hay descripción disponible para este video.')}</p>
                ${tagsHtml}
              </div>
            </div>
          </div>


          <!-- Sección de videos watch -->
<div class="tab-content" id="videos-tab">
<div id="home-grid" class="video-grid"></div>
<div id="home-pagination" class="pagination"></div>
    </div>  

          <!-- Sección de comentarios -->
          <div class="tab-content" id="comments-tab">
            <div class="comments-section">
              <div class="comments-header">
                <h2>
                  <span class="comments-title">Comentarios</span>
                  <span class="comments-count" id="comment-count">${state.totalCount}</span>
                </h2>
                <div class="sort-comments">
                  <select class="sort-select" id="sort-comments">
                    <option value="newest">Más recientes</option>
                    <option value="top">Más populares</option>
                    <option value="oldest">Más antiguos</option>
                  </select>
                </div>
              </div>

              <!-- Formulario para comentar -->
              ${currentUser ? `
                <div class="comment-form-container">
                  <div class="comment-form-avatar">
                    <img src="${currentUser.avatar || 'https://i.pravatar.cc/40?u=' + currentUser.name}" loading="lazy"
                        alt="Tu avatar" class="user-avatar">
                  </div>
                  <div class="comment-form-content">
                    <textarea id="comment-input" placeholder="Añade un comentario público..." 
                              rows="2"></textarea>
                    <div class="comment-form-actions">
                      <button class="btn-outline" id="cancel-comment">Cancelar</button>
                      <button class="btn-primary" id="comment-btn">Comentar</button>
                    </div>
                  </div>
                </div>
              ` : `
                <div class="login-to-comment">
                  <p>Inicia sesión para comentar</p>
                  <a href="${Router.resolveHref('login')}" class="btn-text">Iniciar sesión</a>
                </div>
              `}

              <!-- Lista de comentarios -->
              <div id="comment-list" class="comment-list">
                <!-- Los comentarios se cargarán aquí -->
              </div>
              <div id="comments-pagination" class="pagination"></div>


            </div>
          </div>

        </div>
      </div>

      <!-- Columna lateral (videos relacionados) -->
     <div class="watch-related-col">
  <div class="related-videos-header">
    <h2 class="aside-heading">
  <button class="refresh-related" id="refresh-related-btn" title="Actualizar sugerencias">
    <span>🔄</span>
  </button>
  <span id="related-title">Relacionados</span>
</h2>

    
  </div>

  <div class="related-videos-filters">
    <div class="filter-tabs">
      <button class="filter-tab active" data-filter="related">Relacionados</button>
      <button class="filter-tab" data-filter="same-channel">Mismo canal</button>
      <button class="filter-tab" data-filter="trending">Tendencia</button>
    </div>
  </div>

  <div class="related-videos-scroll-area"> <!-- NUEVO CONTENEDOR -->
    <div class="related-videos-content"> <!-- CONTENIDO DE VIDEOS -->
      <div id="watch-related" class="related-videos-grid">
        <!-- Los videos relacionados se cargarán aquí -->
      </div>
    </div>
  </div>

  <div class="related-videos-footer">
    <p class="small-text">Sugerencias basadas en tu actividad de visualización</p>
  </div>
</div>
    </section>
  `;



  const grid = document.getElementById("home-grid");
  const pag = document.getElementById("home-pagination");
  VideoFeatured.loadFeatured(grid, 1, pag);
  const commentBtn = document.getElementById('comment-btn');
  const commentInput = document.getElementById('comment-input');
  const commentCountEl = document.getElementById('comment-count');
  const commentList = document.getElementById('comment-list');
  console.log(
  "[WATCH] video completo:",
  video
);

console.log(
  "[WATCH] video.id:",
  video?.id
);
  RelatedVideos.loadVideosByFilter(video, "related");






  if (commentBtn && commentInput) {
    commentBtn.addEventListener('click', async () => {
      const commentText = commentInput.value.trim();
      if (!commentText) {
        Ui.showNotification('Escribe un comentario primero', 'error');
        return;
      }

      const newComment = {
        id: Date.now(),
        author: currentUser.displayName || currentUser.name,
        authorAvatar: currentUser.avatar || `https://i.pravatar.cc/40?u=${currentUser.name}`,
        text: commentText,
        time: "Justo ahora",
        likes: 0,
        isAuthor: true
      };

      try {
        const data = await CommentService.createComment(
          video.id,
          commentText
        );

        if (!data) return;


          const mapped = CommentMapper.mapApiComment(data, currentUser);
          state.items.unshift(mapped);
          state.totalCount++;
          document.getElementById("comment-count").textContent = state.totalCount;
          CommentsRenderer.renderCommentsEnhanced(state.items, document.getElementById("comment-list"));



        commentInput.value = "";
        Ui.showNotification('Comentario publicado', 'success');
      } catch (err) {
        console.error("Error real al publicar comentario:", err);

        if (err?.message) {
          console.error("Mensaje:", err.message);
        }

        if (err?.response) {
          console.error("Response:", err.response);
        }

        Ui.showNotification('Error al publicar comentario', 'error');
      }
    });


    // Permitir Enter para comentar
    commentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        commentBtn.click();
      }
    });
  }







  // Botones de like/dislike
  const likeBtn = document.getElementById('like-btn');
  const dislikeBtn = document.getElementById('dislike-btn');
  const shareBtn = document.getElementById("share-btn");
  const likeCountEl = document.getElementById('like-count');
  const dislikeCountEl = document.getElementById('dislike-count');

  // 🔥 ESTADO INICIAL LIKE/DISLIKE
  if (video.userReaction === 'like') {
    likeBtn?.classList.add('active');
  }

  if (video.userReaction === 'dislike') {
    dislikeBtn?.classList.add('active');
  }

  if (likeBtn) {
    likeBtn.addEventListener('click', async () => {
      try {
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;

        if (!currentUser) {
          window.location.href = Router.resolveHref('login');
          return;
        }

        const data = await Api.apiFetch(`/api/viewer/videos/${video.id}/reaction`, {
          method: "POST",
          body: JSON.stringify({ reaction: "like" })
        });

        if (!data) return;

        video.likes = data.likes;
        video.dislikes = data.dislikes;

        likeCountEl.textContent = Formatters.formatViews(video.likes);
        dislikeCountEl.textContent = Formatters.formatViews(video.dislikes);

        likeBtn.classList.toggle('active', data.userReaction === 'like');
        dislikeBtn.classList.toggle('active', data.userReaction === 'dislike');


        if (data.userReaction === 'like') {
          Ui.showNotification('👍 Te gusta este video', 'info');
        } else if (data.userReaction === null) {
          Ui.showNotification('Reacción eliminada', 'info');
        }
      } finally {
        likeBtn.disabled = false;
        dislikeBtn.disabled = false;
      }
    });
  }

  if (dislikeBtn) {
    dislikeBtn.addEventListener('click', async () => {
      try {
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;

        if (!currentUser) {
          window.location.href = Router.resolveHref('login');
          return;
        }

        const data = await Api.apiFetch(`/api/viewer/videos/${video.id}/reaction`, {
          method: "POST",
          body: JSON.stringify({ reaction: "dislike" })
        });

        if (!data) return;

        video.likes = data.likes;
        video.dislikes = data.dislikes;

        likeCountEl.textContent = Formatters.formatViews(video.likes);
        dislikeCountEl.textContent = Formatters.formatViews(video.dislikes);

        likeBtn.classList.toggle('active', data.userReaction === 'like');
        dislikeBtn.classList.toggle('active', data.userReaction === 'dislike');



        if (data.userReaction === 'dislike') {
          Ui.showNotification('👎 No te gusta este video', 'info');
        } else if (data.userReaction === null) {
          Ui.showNotification('Reacción eliminada', 'info');
        }
      } finally {
        likeBtn.disabled = false;
        dislikeBtn.disabled = false;
      }
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const videoUrl = window.location.href;
      const videoTitle = document.title || "Mira este video";
      try {
        if (navigator.share) {
          await navigator.share({
            title: videoTitle,
            text: "Mira este video:",
            url: videoUrl
          });
        } else {
          await navigator.clipboard.writeText(videoUrl);
          alert("Link del video copiado al portapapeles");
        }
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    });
  }


  // Inicializar funcionalidades
  WatchController.initializeWatchPage(video, currentUser, state, currentRenderToken);
}

export const Watch = {
  renderWatch
}