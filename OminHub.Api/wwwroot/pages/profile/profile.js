import { Storage } from '../../core/storage.js'
import { Config } from '../../core/config.js';
import { Tabs } from '../../components/tabs.js';
import { VideoService } from '../../services/video/video.service.js';
import { UserService } from '../../services/user/user.service.js';
import { CreatorService } from '../../services/creator/creator.service.js';
import { Dropdown } from '../../components/dropdown.js';
import { ModalCardVideo } from '../../components/modalCardVideo.js';
import { UserPostCard } from '../../components/userPostCard.js';
import { VideoCard } from '../../components/videoCard.js';
import { UploadService } from '../../services/upload/upload.service.js';
import { DemoProfile } from '../../demo/profile.js';
import { Ui } from '../../core/ui.js';
import { Html } from '../../utils/html.js';
import { Api } from '../../services/api.js';
import { VideoMapper } from '../../mappers/video.mapper.js';
import { EnhancedVideoCard } from '../../components/video/enhancedVideoCard.js';
import { Auth } from '../../core/auth.js';

const _colors = ['#2d1b69', '#1b3a4b', '#2d4a1b', '#4a1b2d', '#1b2d4a', '#3a2d1b', '#1b4a3a', '#4a3a1b'];
const _emojis = ['🎬', '🎥', '📹', '🎞️', '🎭', '🎨', '🎮', '🎵'];

window.showVideosTab = function () {
    Tabs.switchTab('videos');
};
window.showAnalyticsTab = function () {
    Tabs.switchTab('analytics');
};
window.showPlaylistsTab = function () {
    Tabs.switchTab('playlists');
};

async function loadUserVideos(userId, isOwner) {

    const container = document.getElementById("videos-grid");
    if (!container) return;

    container.innerHTML = "<div class='loading'>Cargando videos...</div>";

    
    const videos =
      await VideoService.fetchUserVideos(userId);

    if (!videos || !videos.length) {
        container.innerHTML = "<p>No hay videos</p>";
        return;
    }

    setTimeout(() => {
        renderVideoGrid(videos);
        initVideoModal(isOwner);
      }, 600);
}

 function initVideoModal(isOwner) {
      const modal = document.getElementById('video-detail-modal');
      if (!modal || modal._initialized) return;
      modal._initialized = true;

      // Close
      document.getElementById('close-video-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
      });

      // Tab switching
      document.querySelectorAll('.video-modal-tab').forEach(tab => {
        tab.addEventListener('click', () => switchVideoModalTab(tab.dataset.vtab));
      });

      // Save edits
      document.getElementById('vedit-save-btn').addEventListener('click', () => {
        const vid = parseInt(modal.dataset.currentVid);
        const v = _videoStore.find(x => x.id === vid);
        if (!v) return;

        v.title = document.getElementById('vedit-title').value.trim() || v.title;
        v.desc = document.getElementById('vedit-desc').value.trim();
        v.badge = document.getElementById('vedit-badge').value.trim() || v.badge;

        setStored('ominhub_videos', _videoStore);
        renderVideoGrid(_videoStore);

        document.getElementById('video-modal-title').textContent = v.title;
        document.getElementById('vdelete-title-confirm').textContent = '"' + v.title + '"';

        const info = document.getElementById('vedit-info');
        info.textContent = '✅ Guardado';
        info.style.color = '#4ade80';
        setTimeout(() => { info.textContent = ''; }, 2500);

        showNotification('Video actualizado ✅', 'success');
      });

      // Delete
      document.getElementById('vdelete-confirm-btn').addEventListener('click', () => {
        const vid = parseInt(modal.dataset.currentVid);
        _videoStore = _videoStore.filter(x => x.id !== vid);
        setStored('ominhub_videos', _videoStore);
        renderVideoGrid(_videoStore, isOwner);
        modal.style.display = 'none';
        showNotification('Video eliminado', 'info');
      });
    }


function renderVideoGrid(videos, isOwner) {
      const grid = document.getElementById('videos-grid');
      if (!grid) return;
      if (!videos.length) {
        grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">🎬</div><h3>No hay videos</h3><p>Sube tu primer video.</p></div>';
        return;
      }
      grid.innerHTML = videos.map((v, i) => {
        const ci = i % _colors.length;
        return `
          <div class="video-card-profile" data-video-id="${v.id}">
            <div class="video-thumb">
              <div class="thumb-placeholder" style="background:${_colors[ci]};">
                <span style="font-size:36px;">${_emojis[ci]}</span>
              </div>
              <div class="video-overlay">${v.duration}</div>
              <div class="sample-badge">${v.badge}</div>
              <div class="play-overlay"><div class="play-icon">▶</div></div>
            </div>
            <div class="video-info">
              <div class="video-title">${Html.escapeHtml(v.title)}</div>
              <div class="video-meta">${v.date}</div>
              <div class="video-stats">
                <span>👁️ ${v.views}</span>
                <span>👍 ${v.likes}</span>
                <span>💬 ${v.comments}</span>
              </div>
${isOwner ? `
              <div class="video-actions">
                <button class="btn-video-action btn-open-vstats" data-vid="${v.id}" data-vtab="stats">📊 Estadísticas</button>
                <button class="btn-video-action btn-open-vedit" data-vid="${v.id}" data-vtab="edit">✏️ Editar</button>
              </div>
              ` : ''}
            </div>
          </div>`;
      }).join('');

      // Wire up action buttons
      grid.querySelectorAll('[data-vid]').forEach(btn => {
        btn.addEventListener('click', e => {
          const vid = parseInt(btn.dataset.vid);
          const tab = btn.dataset.vtab || 'stats';
          openVideoModal(vid, tab);
        });
      });
    }


async function reloadProfile(userId) {
    const main = document.getElementById("main-content");

    await renderProfile(main, userId);
}

async function renderPublicUI(userId, isOwner) {
    await loadUserVideos(userId, isOwner);
}

async function renderOwnerUI(userId, isOwner) {
    await loadUserVideos(userId, isOwner);
}

function setupInlineEdit(userId) {
    const btn = document.getElementById("save-inline-profile-btn");
    if (!btn) return;

    btn.onclick = async () => {
        const payload = {
            displayName: document.getElementById("edit-display-name").value,
            bio: document.getElementById("edit-bio-inline").value,
            location: document.getElementById("edit-location-inline").value,
            links: document.getElementById("edit-links-inline").value
        };

        try {
            await Api.apiFetch("/api/system/users/me", {
                method: "PUT",
                body: JSON.stringify(payload)
            });

            Ui.showNotification("Perfil actualizado", "success");
            reloadProfile();

        } catch (err) {
            console.error(err);
            Ui.showNotification("Error al guardar", "error");
        }
    };
}

async function initializeProfile(userId, user, isCreator, isOwner, isViewer, isLogOff) {
    Tabs.initializeTabs();
    Dropdown.initializeDropdownMenu();
    UploadService.initializeImageUpload(user);
    UserPostCard.renderUserPosts(user);

    if (isLogOff) {

    }

    if (isViewer) {

    }
    if (isViewer && isOwner) {

    }

    if (isCreator) {
        initializeCreatorFunctions(user);
    }

    if (isCreator && isOwner) {
        await renderOwnerUI(userId, isOwner);
    }
    else {
        await renderPublicUI(userId, isOwner);
    }
}

function initializeCreatorFunctions(user) {
    const loadMoreBtn = document.getElementById('load-more-videos');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const grid = document.getElementById('videos-grid');
            if (!grid) return;
            loadMoreBtn.textContent = 'Cargando…';
            loadMoreBtn.disabled = true;

            const colors = ['#2d1b69', '#1b3a4b'];
            const extra = [
                { id: 5, title: "Behind the scenes - Mi proceso creativo", duration: "12:30", views: "4.3K", likes: "654", comments: "98", date: "Hace 1 mes", badge: "Exclusivo", desc: "" },
                { id: 6, title: "Colaboración con otro creador", duration: "25:15", views: "7.8K", likes: "1.2K", comments: "267", date: "Hace 1 mes", badge: "Colab", desc: "" },
            ];

            setTimeout(() => {
                extra.forEach(v => {
                    if (!DemoProfile._videoStore.find(x => x.id === v.id)) DemoProfile._videoStore.push(v);
                });
                VideoCard.renderVideoGrid(DemoProfile._videoStore);
                Ui.showNotification('2 videos más cargados', 'success');
                loadMoreBtn.textContent = 'No hay más videos';
            }, 800);
        });
    }

    const sortSelect = document.getElementById('sort-videos');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const labels = { recent: 'Más recientes', popular: 'Más populares', oldest: 'Más antiguos', likes: 'Más gustados' };
            Ui.showNotification(`Ordenado: ${labels[this.value] || this.value}`, 'info');
        });
    }
}

async function renderProfile(main) {

    if (!main) {
        console.error("No existe #main-content");
        return;
    }

    const userId = 1;
    const res = await UserService.fetchUserProfile(userId);
    if (!res) return;

    const { profile, isOwner } = res;

    const user = {
        userName: profile.username || "usuario",
        displayName: profile.displayName || profile.username || "Usuario",

        avatar: profile.avatarUrl || null,
        cover: profile.coverUrl || null,

        bio: profile.bio || "",
        location: profile.location || "",
        links: profile.links || "",

        role: profile.role || "creator"
    };

    if (!user.posts) {
        user.posts = [
            {
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
                caption: "Nuevo setup terminado 🔥",
                time: "Hace 2 horas",
                likes: 142,
                comments: 18
            },
            {
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
                caption: "Trabajando en nuevas funcionalidades para OMINHUB.",
                time: "Hace 5 horas",
                likes: 287,
                comments: 41
            },
            {
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
                caption: "Próximamente nuevas herramientas para creators.",
                time: "Ayer",
                likes: 512,
                comments: 63
            }
        ];
    }

    const isCreator = user.role === 'creator';
    const isViewer = user.role === 'viewer';

    const analytics = await CreatorService.fetchCreatorAnalytics(userId);

    const stats = analytics
        ? {
            videos: analytics.totalVideos ?? 0,
            subscribers: analytics.subscribers ?? "—",
            views: analytics.totalViews ?? 0,
            likes: analytics.totalLikes ?? 0,
            engagement: "—"
        }
        : {
            videos: "—",
            subscribers: "—",
            views: "—",
            likes: "—",
            engagement: "—"
        };

    const defaultBannerStyle = user.cover
        ? `background-image: url('${user.cover}'); background-size: cover; background-position: center;`
        : `background: linear-gradient(135deg, #1a0a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%);`;

    const defaultAvatar = user.avatar || `https://i.pravatar.cc/300?u=${user.userName}`;

    main.innerHTML = `
        <section class="section">

          <!-- BANNER + AVATAR (avatar fuera del overflow del banner) -->
          <div class="profile-header">
            <!-- Solo la imagen del banner, con overflow:hidden propio -->
            <div class="banner-image" id="profile-banner-image" style="${defaultBannerStyle}">
              <div class="banner-overlay">
                <button class="btn-banner-edit" id="edit-banner-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Cambiar banner
                </button>
              </div>
            </div>

            <!-- Avatar FUERA del banner-image para que no se corte -->
            <div class="profile-avatar-section">
              <div class="avatar-container" id="profile-avatar-container">
                <img src="${defaultAvatar}" alt="Avatar" class="profile-avatar" id="profile-avatar">
                <div class="avatar-edit-overlay">
                  <button class="btn-avatar-edit" id="edit-avatar-btn">📷</button>
                </div>
                <div class="online-status"></div>
              </div>

              <div class="profile-basic-info">
                <h1 class="profile-display-name" id="profile-display-name">${Html.escapeHtml(user.displayName)}</h1>
                <p class="profile-username">@${Html.escapeHtml(user.userName)}</p>
                <div class="profile-badges" id="profile-badges">
                  ${Auth.getStoredVerification()?.state === 'approved' ? '<span class="badge badge-verified">✓ Verificado</span>' : ''}
                  ${isCreator ? '<span class="badge badge-creator">🎬 Creador</span>' : ''}
                </div>
                <div class="profile-actions">
                  <div class="more-options-container">
                    <button class="btn-icon" id="more-options-btn" title="Más opciones">⋯</button>
                    <div class="dropdown-menu" id="dropdown-menu">
                      <button class="dropdown-item" data-action="share"><span>📤</span> Compartir perfil</button>
                      ${!isOwner ? `
                      <button class="dropdown-item" data-action="report"><span>🚨</span> Reportar usuario</button>
                     ` : ''}
                      ${isOwner ? `
  <button class="dropdown-item" data-action="settings"><span>⚙️</span> Configuración</button>
  ` : ''}
  ${isOwner && isCreator ? `
  <button class="dropdown-item" data-action="analytics"><span>📊</span> Ver analíticas</button>
` : ''}
${isOwner ? `
                      <button class="dropdown-item" data-action="logout"><span>🚪</span> Cerrar sesión</button>
                    ` : ''}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- STATS -->
          <div class="profile-stats">
            <div class="stat-item" onclick="showVideosTab()">
              <div class="stat-value">${stats.videos}</div>
              <div class="stat-label">Videos</div>
            </div>
            <div class="stat-item" onclick="showAnalyticsTab()">
              <div class="stat-value">${stats.subscribers}</div>
              <div class="stat-label">Suscriptores</div>
            </div>
            <div class="stat-item" onclick="showAnalyticsTab()">
              <div class="stat-value">${stats.views}</div>
              <div class="stat-label">Vistas</div>
            </div>
            <div class="stat-item" onclick="showAnalyticsTab()">
              <div class="stat-value">${stats.likes}</div>
              <div class="stat-label">Me gusta</div>
            </div>
            <div class="stat-item" onclick="showAnalyticsTab()">
              <div class="stat-value">${stats.engagement}</div>
              <div class="stat-label">Engagement</div>
            </div>
          </div>

          <!-- NAV -->
          <nav class="profile-nav">
          ${isCreator? `
              <button class="profile-nav-item active" data-tab="videos">
                <span class="nav-icon">🎬</span><span class="nav-text">Videos</span>
              </button>
            <button class="profile-nav-item" data-tab="posts">
              <span class="nav-icon">📝</span><span class="nav-text">Posts</span>
            </button>
            ` : ''}
            <button class="profile-nav-item ${!isCreator ? ' active' : ''}" data-tab="about">
              <span class="nav-icon">ℹ️</span><span class="nav-text">Acerca de</span>
            </button>
            ${isOwner && isCreator? `
              <button class="profile-nav-item" data-tab="analytics">
                <span class="nav-icon">📊</span><span class="nav-text">Analíticas</span>
              </button>
              <button class="profile-nav-item" data-tab="edit">
                <span class="nav-icon">⚙️</span><span class="nav-text">Editar perfil</span>
              </button>
            ` : ''}
          </nav>

          <!-- CONTENT -->
          <div class="profile-content">

            <!-- VIDEOS TAB -->
            ${isCreator ? `
              <div class="tab-content active" id="videos-tab">
                <div class="tab-header">
                  <h2>Mis Videos</h2>
                  <select class="form-select" id="sort-videos">
                    <option value="recent">Más recientes</option>
                    <option value="popular">Más populares</option>
                    <option value="oldest">Más antiguos</option>
                    <option value="likes">Más gustados</option>
                  </select>
                </div>
                <div class="videos-grid" id="videos-grid">
                  ${[1, 2, 3, 4].map(() => `
                    <div class="video-card-profile video-skeleton">
                      <div class="video-thumb skeleton"></div>
                      <div class="title-skeleton skeleton"></div>
                      <div class="meta-skeleton skeleton"></div>
                    </div>
                  `).join('')}
                </div>
                <div class="load-more-container">
                  <button class="btn-outline" id="load-more-videos">Cargar más videos</button>
                </div>
              </div>
            ` : `
              <div class="tab-content" id="videos-tab">
                <div class="empty-state">
                  <div class="empty-icon">🎬</div>
                  <h3>Explora contenido</h3>
                  <p>Como viewer, disfruta todo el contenido disponible en OMINHUB.</p>
                </div>
              </div>
            `}

            <!-- POSTS TAB -->
            <div class="tab-content" id="posts-tab">
              <div class="posts-container">

                <!-- ───────────────── CREATE POST STUDIO ───────────────── -->
                ${isOwner ? `
<div class="post-studio">

  <!-- HEADER -->
  <div class="post-studio-header">

    <div>
      <p class="post-studio-label">CREADOR</p>
      <h2>Diseñar publicación</h2>
    </div>

    <div class="post-studio-header-actions">

      <button class="studio-icon-btn">
        <i class="fas fa-save"></i>
      </button>

      <button class="studio-icon-btn">
        <i class="fas fa-eye"></i>
      </button>

    </div>

  </div>

  <!-- BODY -->
  <div class="post-studio-body">

    <!-- LEFT SIDE -->
    <div class="post-studio-editor">

      <!-- IMAGE PREVIEW -->
      <div class="studio-preview">

        <img
          id="post-preview-image"
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop"
          alt="Preview"
        >

        <div class="studio-preview-overlay">
          <button class="studio-change-image-btn">
            <i class="fas fa-camera"></i>
            Cambiar portada
          </button>
        </div>

      </div>

      <!-- INPUTS -->
      <div class="studio-fields">

        <div class="studio-field">
          <label>Título</label>

          <input
            type="text"
            class="studio-input"
            placeholder="Escribe un título atractivo..."
          >
        </div>

        <div class="studio-field">
          <label>Descripción</label>

          <textarea
            class="studio-textarea"
            placeholder="Describe tu publicación..."
          ></textarea>
        </div>

      </div>

      <!-- TAGS -->
      <div class="studio-tags">

        <button class="studio-tag active">Gaming</button>
        <button class="studio-tag">Tutorial</button>
        <button class="studio-tag">Tech</button>
        <button class="studio-tag">Premium</button>

      </div>

      <!-- ACTIONS -->
      <div class="studio-actions">

        <div class="studio-upload-actions">

          <button class="secondary-btn">
            <i class="fas fa-image"></i>
            Subir imagen
          </button>

          <button class="secondary-btn">
            <i class="fas fa-video"></i>
            Video
          </button>

        </div>

        <button class="btn-primary">
          <i class="fas fa-paper-plane"></i>
          Publicar
        </button>

      </div>

    </div>

    <!-- RIGHT SIDE -->
    <div class="post-studio-sidebar">

      <!-- VISIBILITY -->
      <div class="studio-side-card">

        <h3>Visibilidad</h3>

        <div class="studio-radio-group">

          <label class="studio-radio">
            <input type="radio" name="visibility" checked>
            <span>Público</span>
          </label>

          <label class="studio-radio">
            <input type="radio" name="visibility">
            <span>Solo seguidores</span>
          </label>

          <label class="studio-radio">
            <input type="radio" name="visibility">
            <span>Premium</span>
          </label>

        </div>

      </div>

      <!-- SETTINGS -->
      <div class="studio-side-card">

        <h3>Opciones</h3>

        <div class="studio-switches">

          <label class="studio-switch">
            <span>Permitir comentarios</span>
            <input type="checkbox" checked>
          </label>

          <label class="studio-switch">
            <span>Destacar publicación</span>
            <input type="checkbox">
          </label>

          <label class="studio-switch">
            <span>Notificar seguidores</span>
            <input type="checkbox" checked>
          </label>

        </div>

      </div>

      <!-- STATS -->
      <div class="studio-side-card">

        <h3>Vista rápida</h3>

        <div class="studio-stats">

          <div class="studio-stat">
            <span>Imágenes</span>
            <strong>1</strong>
          </div>

          <div class="studio-stat">
            <span>Etiquetas</span>
            <strong>4</strong>
          </div>

          <div class="studio-stat">
            <span>Estado</span>
            <strong>Borrador</strong>
          </div>

        </div>

      </div>

    </div>

  </div>

</div>
` : ''}
                <div id="profile-posts"></div>
              </div>
            </div>

            <!-- ABOUT TAB -->
            <div class="tab-content${!isCreator ? ' active' : ''}" id="about-tab">
              <div class="about-container">
                <div class="about-card">
                  <h3>Acerca de mí</h3>
                  <div class="bio-content" id="profile-bio">
                    <p>${Html.escapeHtml(user.bio || "Esta es la biografía del usuario. Aquí puedes compartir tu historia, intereses y el contenido que creas.")}</p>
                  </div>
                  ${isCreator && isOwner ? `
                    <div class="edit-bio-container" style="display:none;" id="edit-bio-wrap">
                      <textarea class="form-textarea" id="edit-bio-textarea" rows="4" placeholder="Cuéntanos sobre ti...">${Html.escapeHtml(user.bio || '')}</textarea>
                      <div class="edit-actions">
                        <button class="btn-primary" id="save-bio-btn">Guardar</button>
                        <button class="btn-outline" id="cancel-edit-bio">Cancelar</button>
                      </div>
                    </div>
                    <div style="margin-top:16px;">
                      <button class="btn-text" id="edit-bio-btn">✏️ Editar biografía</button>
                    </div>
                  ` : ''}
                </div>

                ${isCreator || isOwner ? `
                <div class="about-details">
${isOwner && isCreator ? `
                  <div class="detail-section">
                    <h4>📅 Se unió en</h4>
                    <p>${new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div class="detail-section">
                    <h4>📍 Ubicación</h4>
                    <p id="location-info">${Html.escapeHtml(user.location || "No especificada")}</p>
                  </div>
                  <div class="detail-section">
                    <h4>🔗 Enlaces</h4>
                    <div class="social-links" id="social-links">
                      ${user.links
            ? user.links.split(',').map(l => `<a href="${l.trim()}" target="_blank" rel="noopener" class="social-link">🔗 ${Html.escapeHtml(l.trim())}</a>`).join('')
            : '<span style="font-size:13px;color:var(--text-muted)">No hay enlaces aún</span>'}
                    </div>
                    ${isCreator && isOwner ? `<button class="btn-text" style="margin-top:8px;" id="add-social-link">+ Agregar enlace</button>` : ''}
                  </div>
                  <div class="detail-section">
                    <h4>🏆 Logros</h4>
                    <div class="achievements-grid">
                      <div class="achievement"><span>👤</span><span>Usuario activo</span></div>
                      <div class="achievement"><span>🌟</span><span>Primer post</span></div>
                      <div class="achievement"><span>💬</span><span>Comunidad</span></div>
                      ${isCreator ? '<div class="achievement"><span>🎬</span><span>Creador</span></div>' : ''}
                    </div>
                  </div>
                  ` : ''}
                  ${isOwner && !isCreator ? `
                  <div class="verification-required-card">

      <div class="verification-required-icon">
        <i class="fas fa-shield-check"></i>
      </div>

      <div class="verification-required-content">

        <span class="verification-required-badge">
          ACCESO RESTRINGIDO
        </span>

        <h3>Verificación requerida</h3>

        <p>
          Debes verificar tu cuenta de creador para completar esta sección del perfil,
          agregar enlaces, ubicación y desbloquear funciones avanzadas.
        </p>

        <button class="btn-primary verification-required-btn">
          <i class="fas fa-badge-check"></i>
          Verificar cuenta
        </button>

      </div>

    </div>
    ` : ''}
                </div>
                ` : ''}


              </div>
            </div>

            <!-- ANALYTICS TAB -->
            ${isCreator ? `
              <div class="tab-content" id="analytics-tab">
                <div class="analytics-container">
                  <div class="analytics-header">
                    <h2>📊 Analíticas del canal</h2>
                    <select class="form-select" id="analytics-range">
                      <option value="7d">Últimos 7 días</option>
                      <option value="30d" selected>Últimos 30 días</option>
                      <option value="90d">Últimos 90 días</option>
                      <option value="1y">Último año</option>
                    </select>
                  </div>
                  <div class="analytics-grid">
                    <div class="analytics-card card-wide">
                      <h4>📈 Crecimiento de suscriptores</h4>
                      <div class="chart-bar-container">
                        ${[65, 72, 58, 81, 74, 88, 95].map((h, i) => `
                          <div class="chart-bar" style="height:${h}%;" title="Semana ${i + 1}: ${Math.round(h * 12)} subs"></div>
                        `).join('')}
                      </div>
                    </div>
                    <div class="analytics-card">
                      <h4>👁️ Visualizaciones</h4>
                      <div class="stat-large">125.4K</div>
                      <div class="trend-indicator"><span>↗️</span><span class="trend-text">+12%</span></div>
                    </div>
                    <div class="analytics-card">
                      <h4>👍 Me gusta</h4>
                      <div class="stat-large">8.5K</div>
                      <div class="trend-indicator"><span>↗️</span><span class="trend-text">+8%</span></div>
                    </div>
                    <div class="analytics-card">
                      <h4>💬 Comentarios</h4>
                      <div class="stat-large">342</div>
                      <div class="trend-indicator"><span>↗️</span><span class="trend-text">+5%</span></div>
                    </div>
                    <div class="analytics-card">
                      <h4>⏱️ Tiempo promedio</h4>
                      <div class="stat-large">4:32</div>
                      <div class="trend-indicator"><span>↗️</span><span class="trend-text">+3%</span></div>
                    </div>
                    <div class="analytics-card card-wide">
                      <h4>🎯 Top Videos</h4>
                      <div class="top-videos-list">
                        ${[
                { n: 'Mi primer video en OMINHUB', v: '12.4K', l: '2.3K', c: '456' },
                { n: 'Tutorial completo de edición', v: '8.7K', l: '1.5K', c: '234' },
                { n: 'Review de equipo de grabación', v: '6.2K', l: '987', c: '123' },
            ].map((v, i) => `
                          <div class="top-video-item">
                            <div class="top-video-rank">${i + 1}</div>
                            <div style="flex:1;">
                              <div class="top-video-title">${v.n}</div>
                              <div class="top-video-stats">
                                <span>👁️ ${v.v}</span>
                                <span>👍 ${v.l}</span>
                                <span>💬 ${v.c}</span>
                              </div>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- EDIT PROFILE TAB -->
            ${isCreator ? `
              <div class="tab-content" id="edit-tab">
                <div class="edit-profile-container">
                  <h2>⚙️ Editar perfil</h2>
                  <div class="form-group">
                    <label for="edit-display-name">Nombre para mostrar</label>
                    <input type="text" class="form-input" id="edit-display-name" placeholder="Tu nombre público" value="${Html.escapeHtml(user.displayName || '')}">
                  </div>
                  <div class="form-group">
                    <label for="edit-bio-inline">Biografía</label>
                    <textarea class="form-textarea" id="edit-bio-inline" rows="4" placeholder="Cuéntanos sobre ti...">${Html.escapeHtml(user.bio || '')}</textarea>
                    <div class="tiny">Máximo 160 caracteres recomendado</div>
                  </div>
                  <div class="form-group">
                    <label for="edit-location-inline">Ubicación</label>
                    <input type="text" class="form-input" id="edit-location-inline" placeholder="Ciudad, País" value="${Html.escapeHtml(user.location || '')}">
                  </div>
                  <div class="form-group">
                    <label for="edit-links-inline">Enlaces (separados por coma)</label>
                    <input type="text" class="form-input" id="edit-links-inline" placeholder="twitter.com/tu_usuario, youtube.com/tu_canal" value="${Html.escapeHtml(user.links || '')}">
                    <div class="tiny">Separar múltiples enlaces con coma</div>
                  </div>
                  <div style="display:flex;gap:10px;align-items:center;margin-top:8px;">
                    <button class="btn-primary" id="save-inline-profile-btn">💾 Guardar cambios</button>
                    <div id="inline-save-info" style="font-size:13px;color:var(--text-muted);"></div>
                  </div>
                </div>
              </div>
            ` : ''}

          </div>

          <!-- UPLOAD MODAL -->
          <div class="modal-overlay" id="upload-image-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h3>📸 Subir imagen</h3>
                <button class="modal-close" id="close-upload-modal">&times;</button>
              </div>
              <div class="modal-body">
                <div class="upload-options" id="upload-options-list">
                  <div class="upload-option" id="upload-avatar-option">
                    <div class="upload-icon">👤</div>
                    <div class="upload-text">
                      <h4>Foto de perfil</h4>
                      <p>Recomendado: 500×500 px · Máx 5 MB</p>
                    </div>
                    <input type="file" id="upload-avatar-input" accept="image/*" style="display:none;">
                  </div>
                  <div class="upload-option" id="upload-banner-option">
                    <div class="upload-icon">🖼️</div>
                    <div class="upload-text">
                      <h4>Banner</h4>
                      <p>Recomendado: 1500×500 px · Máx 5 MB</p>
                    </div>
                    <input type="file" id="upload-banner-input" accept="image/*" style="display:none;">
                  </div>
                </div>
                <div class="image-preview-container" id="image-preview-container" style="display:none;">
                  <div class="image-preview">
                    <img id="preview-image" src="" alt="Vista previa">
                  </div>
                  <div class="preview-actions">
                    <button class="btn-primary" id="confirm-upload">✅ Confirmar</button>
                    <button class="btn-outline" id="cancel-upload">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- VIDEO STATS/EDIT MODAL -->
          <div class="modal-overlay" id="video-detail-modal">
            <div class="modal-content" style="max-width:520px;">
              <div class="modal-header">
                <h3 id="video-modal-title">Video</h3>
                <button class="modal-close" id="close-video-modal">&times;</button>
              </div>
              <div class="modal-body">
                <div class="video-modal-thumb" id="video-modal-thumb">🎬</div>
                <div class="video-modal-tabs">
                  <button class="video-modal-tab active" data-vtab="stats">📊 Estadísticas</button>
                  <button class="video-modal-tab" data-vtab="edit">✏️ Editar</button>
                  <button class="video-modal-tab" data-vtab="delete">🗑️ Eliminar</button>
                </div>

                <!-- STATS PANEL -->
                <div class="video-modal-panel active" id="vtab-stats">
                  <div class="stat-row">
                    <div class="stat-row-label">👁️ Visualizaciones</div>
                    <div class="stat-row-value" id="vstat-views">—</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-row-label">👍 Me gusta</div>
                    <div class="stat-row-value" id="vstat-likes">—</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-row-label">💬 Comentarios</div>
                    <div class="stat-row-value" id="vstat-comments">—</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-row-label">⏱️ Duración</div>
                    <div class="stat-row-value" id="vstat-duration">—</div>
                  </div>
                  <div class="stat-row">
                    <div class="stat-row-label">📅 Publicado</div>
                    <div class="stat-row-value" id="vstat-date" style="font-size:0.85rem;font-family:'DM Sans',sans-serif;font-weight:500;">—</div>
                  </div>
                </div>

                <!-- EDIT PANEL -->
                <div class="video-modal-panel" id="vtab-edit">
                  <div class="form-group">
                    <label for="vedit-title">Título del video</label>
                    <input type="text" class="form-input" id="vedit-title" placeholder="Escribe el título...">
                  </div>
                  <div class="form-group">
                    <label for="vedit-desc">Descripción</label>
                    <textarea class="form-textarea" id="vedit-desc" rows="4" placeholder="Descripción del video..."></textarea>
                  </div>
                  <div class="form-group">
                    <label for="vedit-badge">Etiqueta / Badge</label>
                    <input type="text" class="form-input" id="vedit-badge" placeholder="Ej: Nuevo, Popular, Exclusivo...">
                  </div>
                  <div style="display:flex;gap:10px;margin-top:4px;">
                    <button class="btn-primary" id="vedit-save-btn">💾 Guardar cambios</button>
                    <div id="vedit-info" style="font-size:12px;color:var(--text-muted);align-self:center;"></div>
                  </div>
                </div>

                <!-- DELETE PANEL -->
                <div class="video-modal-panel" id="vtab-delete">
                  <div class="delete-zone">
                    <p>¿Estás seguro de que quieres eliminar <strong id="vdelete-title-confirm">"este video"</strong>? Esta acción no se puede deshacer.</p>
                    <button class="btn-danger" id="vdelete-confirm-btn">🗑️ Sí, eliminar video</button>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </section>
      `;

    // Initialize
    //Debo darle valor
    
    await initializeProfile(userId, user, isCreator, isOwner, isViewer);
}

export const Profile = {
    renderProfile
}