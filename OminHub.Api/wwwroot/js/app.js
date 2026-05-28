import { Auth } from '../core/auth.js';
import { Storage } from '../core/storage.js'
import { Api } from '../services/api.js';
import { Config } from '../core/config.js';
import { Device } from '../core/device.js';
import { Ui } from '../core/ui.js';
import { Router } from '../utils/router.js';
import { Html } from '../utils/html.js';
import { Tabs } from '../components/tabs.js';
import { VideoMapper } from '../mappers/video.mapper.js';
import { EnhancedVideoCard } from '../components/video/enhancedVideoCard.js';
import { Formatters } from '../utils/formatters.js';
import { VideoFeatured } from '../services/video/video.featured.js';
import { I18n } from '../features/i18n.js';
import { Sidebar } from '../components/sidebar.js';
import { RelatedVideos } from '../features/watch/relatedVideos.js';
import { CommentMapper } from '../mappers/comment.mapper.js';
import { CommentsRenderer } from '../features/comments/commentsRenderer.js';
import { CreatorGuard } from '../features/creators/creatorGuard.js';
import { Tooltip } from '../components/ui/tooltip.js';


import { BuildShell } from '../elements/buildshell/buildShell.js';
import { Home } from '../home.js';
import { Terms } from '../pages/terms/terms.js';
import { About } from '../pages/about/about.js';
import { Creators } from '../pages/creators/creators.js';
import { Studio } from '../pages/studio/studio.js';
import { Privacy } from '../pages/privacy/privacy.js';
import { Cookies } from '../pages/cookies/cookies.js';
import { Support } from '../pages/support/support.js';
import { Safety } from '../pages/safety/safety.js';
import { CreatorStateService } from '../services/creator/creator-state.service.js';

import { Login } from '../pages/login/login.js';
import { Register } from '../pages/register/register.js';


import { Admin } from '../pages/admin/admin.js';
import { Profile } from '../pages/profile/profile.js';
import { Watch } from '../pages/watch/watch.js';
import { CreatorMonetization } from '../pages/creator-monetization/creatorMonetization.js';


import { History } from '../pages/history/history.js';
import { Favorites } from '../services/favorites.js';
import { Playlist } from '../pages/playlist/playlist.js';
import { Categories } from '../pages/categories/categories.js';
import { Tags } from '../pages/tags/tags.js';
import { Search } from '../pages/search/search.js';


import { CreatorRenderer } from '../features/creators/creatorRenderer.js'; 


import { Demo } from '../demo/demo.js';


(function () {
  //<script src="/js/hls.js"></script>

  window.addEventListener("click", Auth.resetInactivityTimer);
  window.addEventListener("mousemove", Auth.resetInactivityTimer);
  window.addEventListener("keydown", Auth.resetInactivityTimer);
  window.addEventListener("scroll", Auth.resetInactivityTimer);

  Auth.resetInactivityTimer();

  async function loadCategoriesAndTags() {
    const [categories, tags] = await Promise.all([
      Api.apiFetch("/api/catalog/categories", { method: "GET" }),
      Api.apiFetch("/api/catalog/tags", { method: "GET" }),
    ]);

    return {
      categories: categories || [],
      tags: tags || [],
    };
  }

  function updateUserActions() {
    const user = Auth.getSessionUser(); // ahora usamos la sesión real
    const userActions = document.getElementById("user-actions");

    if (!userActions) return;

    if (user) {
      // soporta diferentes formas de la propiedad enviada por la API
      const displayName =
        (user.Username && user.Username.trim()) ||
        (user.username && user.username.trim()) ||
        (user.Email && user.Email.split && user.Email.split("@")[0]) ||
        (user.email && user.email.split && user.email.split("@")[0]) ||
        (user.Name && user.Name.trim()) ||
        "User";

      userActions.innerHTML = `
            <span class="nav-link">Welcome</span>, ${Html.escapeHtml(displayName)}
            <button class="nav-button" id="logout-btn">Log out</button>
        `;

      const logoutBtn = document.getElementById("logout-btn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
          await Auth.logout();
        });
      }
    } else {
      // Si no hay sesión, mostrar botones de login/registro
      userActions.innerHTML = `
            <button class="nav-button" data-nav="login">Log in</button>
            <button class="nav-button nav-button-outline" data-nav="register">Sign up</button>
        `;
    }

    // mantener funciones existentes
    Router.wireNavigation();
    I18n.translateUI(Storage.getStored("ominhub_lang", "en"));
    Sidebar.updateCreatorSection();
  }









  // Función para actualizar contenido específico de página
  function updatePageSpecificContent(lang) {
    const currentPage = Router.getCurrentPageKey();
    const main = document.getElementById("main-content");

    if (!main) return;

    // Para páginas con contenido dinámico, podemos recargar secciones específicas
    switch (currentPage) {
      case "about":
        // Actualizar textos dinámicos en About
        updateAboutDynamicTexts(lang);
        break;
      // Agregar más casos según necesites
    }
  }

  // Función específica para About
  function updateAboutDynamicTexts(lang) {

    // Actualizar el año en el footer de About
    const finalLegal = document.querySelector('.about-final-message .final-legal');
    if (finalLegal) {
      const currentYear = new Date().getFullYear();
      if (lang === "es") {
        finalLegal.querySelector('p:last-child').textContent =
          `© ${currentYear} OMINHUB. Todos los derechos reservados. Plataforma destinada a adultos mayores de 18 años.`;
      } else {
        finalLegal.querySelector('p:last-child').textContent =
          `© ${currentYear} OMINHUB. All rights reserved. Platform intended for adults 18+.`;
      }
    }
  }

  // ==================== NUEVA FUNCIÓN PARA ACTUALIZAR CONTENIDO DE PÁGINA ====================
  // Función para recargar páginas dinámicas
  async function reloadDynamicPage(pageKey, lang) {
    const main = document.getElementById("main-content");
    if (!main) return;

    console.log(`🔄 Reloading page: ${pageKey} in ${lang}`);

    switch (pageKey) {
      case "creators":
        Creators.renderCreators(main);
        I18n.translateUI(lang);
        break;
      case "about":
        About.renderAbout(main);
        I18n.translateUI(lang);
        break;
      case "studio":
        Studio.renderStudio(main);
        I18n.translateUI(lang);
        break;
      case "privacy":
        Privacy.renderPrivacy(main);
        I18n.translateUI(lang);
        break;
      case "cookies":
        Cookies.renderCookies(main);
        I18n.translateUI(lang);
        break;
      case "support":
        Support.renderSupport(main);
        I18n.translateUI(lang);
        break;
      case "safety":  // ← NUEVO CASO AGREGADO
        Safety.renderSafety(main);
        I18n.translateUI(lang);
        break;
      default:
        I18n.translateUI(lang);
        break;
    }
  }

    function renderCommentsPagination(videoId, state) {
    const container = document.getElementById("comments-pagination");
    if (!container) return;

    container.innerHTML = "";

    if (state.totalPages <= 1) return;

    // PREV
    const prev = document.createElement("button");
    prev.textContent = "Prev";
    prev.disabled = state.page === 1;
    prev.addEventListener("click", () => {
      loadCommentsPage(videoId, state, state.page - 1);
    });
    container.appendChild(prev);

    // PÁGINAS
    for (let p = 1; p <= state.totalPages; p++) {
      const btn = document.createElement("button");
      btn.textContent = p;

      if (p === state.page) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", () => {
        loadCommentsPage(videoId, state, p);
      });

      container.appendChild(btn);
    }

    // NEXT
    const next = document.createElement("button");
    next.textContent = "Next";
    next.disabled = state.page === state.totalPages;
    next.addEventListener("click", () => {
      loadCommentsPage(videoId, state, state.page + 1);
    });
    container.appendChild(next);
  }












  

  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest("[data-tooltip]");
    if (!el) return;

    Tooltip.showTooltip(el, el.dataset.tooltip);
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("[data-tooltip]")) {
      Tooltip.hideTooltip();
    }
  });

  function renderCreatorStudio(main, user, catalog) {
    const uploadLayout = `
    <section class="section upload-block">
    <h1 class="section-title">Creator studio · Upload</h1>
    <p class="section-subtitle">
      Upload new content, choose visibility and categorize your videos.
    </p>

    <div class="creator-grid">
      <div class="form-card creator-main-card">
        <div class="creator-card-header">
          <div>
            <div class="badge badge-live">Creator workspace</div>
            <h1>Upload a new video</h1>
            <p>
              Provide clear titles and descriptions. Select categories and tags.
            </p>
          </div>

          <div class="creator-meta-chip">
            <span class="creator-avatar-initial">${user.username ? user.username.charAt(0).toUpperCase() : "C"
      }</span>
            <div>
              <div class="creator-meta-label">Signed in as</div>
              <div class="creator-meta-value">${user.username}</div>
            </div>
          </div>
        </div>

        <div class="creator-two-col">
          <div class="creator-two-col-main">
            <div class="form-field">
              <label for="up-title">Title</label>
              <input id="up-title" type="text" placeholder="Forest walk in 4K" />
            </div>

            <div class="form-field">
              <label for="up-description">Description</label>
              <textarea id="up-description" class="textarea"
                placeholder="A relaxing walk through a forest..."></textarea>
            </div>

            <div class="form-field">
              <label>Categories <span id="cat-count">(0/30)</span></label>
              <div id="cat-selector"></div>
            </div>

            <div class="form-field">
              <label>Tags <span id="tag-count">(0/30)</span></label>
              <div id="tag-selector"></div>
            </div>

            <div class="form-field">
              <label for="up-collab">Visibility</label>
              <select id="up-visibility">
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
              <div class="cover-upload-help">
                Choose who can access this video. Public videos are visible to everyone on the platform.
                Unlisted videos are only accessible to users with the direct link.
                Private videos are restricted to you and explicitly authorized collaborators.
              </div>


            </div>

          </div>

          <div class="creator-two-col-side">
            <div class="form-field">
              <label for="up-video">Video file</label>

              <div class="custom-file-wrapper">
                <input id="up-video" type="file" accept="video/*" />
                <label for="up-video" class="custom-file-label">Select video file</label>
                <span id="up-video-name" class="custom-file-name">No file selected</span>
              </div>

            </div>

            <div class="form-field">
              <label>Cover images <span class="hint">(up to 5)</span></label>

              <div class="cover-upload-block">
                <div class="cover-upload-grid" id="cover-grid">
                  <div class="cover-slot empty" data-index="0">1</div>
                  <div class="cover-slot empty" data-index="1">2</div>
                  <div class="cover-slot empty" data-index="2">3</div>
                  <div class="cover-slot empty" data-index="3">4</div>
                  <div class="cover-slot empty" data-index="4">5</div>
                </div>


                <div class="cover-upload-help">
                  Upload up to 5 images to be used as video covers or thumbnails.
                  <br />
                  The platform may periodically rotate these images to identify which performs best.
                  <br />
                  Recommended size: 1280×720 (16:9)
                </div>

              </div>
            </div>


            <div class="form-field">
              <label>Collaborators</label>

              <div class="collab-selector">
                <select id="up-collab">
                  <option value="" disabled selected>Select a collaborator</option>
                </select>

                <div id="collab-chips" class="chip-container"></div>
              </div>

              <div class="cover-upload-help">
                All individuals who appear in this video, whether partially or fully, must be listed as collaborators.
                Failure to disclose all participants may result in content review delays or removal.
              </div>
            </div>


            <button class="nav-button" type="button" id="add-collab-btn">
              Add another collaborator
            </button>
          </div>
        </div>

        <div class="form-field terms-field">
          <label class="checkbox-label">
            <input type="checkbox" id="up-terms" />
            <span class="terms-text">
              I accept the
              <a href="#" class="terms-link">terms and conditions</a>
              and
              <a href="#" class="terms-link">declare all information provided is true</a>.
            </span>
          </label>
        </div>

        <div class="creator-actions-row">
          <button class="nav-button" type="button" id="up-btn">Upload video</button>
        </div>

        <div class="form-footer" id="up-info"></div>
      </div>
    </div>

    <h2 class="section-title">My videos</h2>

    <div id="my-videos" class="creator-video-list"></div>

  </section>
  `;

    main.innerHTML = uploadLayout;
    initializeCreatorUploadLogic(main, user, catalog);
  }

  async function renderCreatorUpload(main) {
    const user = CreatorGuard.ensureCreatorUser(main);
    let verification = Auth.getStoredVerification();

    CreatorStateService.resolveCreatorAccess(main, user);

    if (verification.state === "approved") {
      const catalog = await loadCategoriesAndTags();
      renderCreatorStudio(main, user, catalog);
      return;
    }

    // Fallback seguro
    CreatorRenderer.renderInviteToBecomeCreator(main, user);
  }

  function initializeCreatorUploadLogic(main, user, catalog) {

    const MAX_COVERS = 5;
    let coverImages = []; // { file, url }

    const coverGrid = document.getElementById("cover-grid");
    const coverSlots = [...coverGrid.querySelectorAll(".cover-slot")];

    const filePicker = document.createElement("input");
    filePicker.type = "file";
    filePicker.accept = "image/*";
    filePicker.multiple = true;

    let draggedIndex = null;

    function renderCovers() {
      coverSlots.forEach((slot, i) => {
        slot.innerHTML = "";
        slot.classList.toggle("empty", !coverImages[i]);

        if (!coverImages[i]) {
          slot.textContent = i + 1;
          return;
        }

        const img = document.createElement("img");
        img.src = coverImages[i].previewUrl;
        img.draggable = true;

        img.addEventListener("dragstart", (e) => {
          draggedIndex = i;

          // 👇 OBLIGATORIO para que el navegador permita el drop
          e.dataTransfer.setData("text/plain", i);
        });


        img.addEventListener("dragend", () => {
          draggedIndex = null;
        });



        const del = document.createElement("button");
        del.className = "cover-remove-btn";
        del.textContent = "×";
        del.onclick = (e) => {
          e.stopPropagation();   // ← CLAVE
          e.preventDefault();
          removeCover(i);
        };


        slot.append(img, del);
      });
    }


    function addFiles(files) {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        if (coverImages.length >= MAX_COVERS) break;

        coverImages.push({
          file,
          previewUrl: URL.createObjectURL(file),
          tempUrl: null
        });

      }
      renderCovers();
    }



    function removeCover(index) {
      coverImages.splice(index, 1);
      renderCovers();
    }


    coverSlots.forEach((slot, index) => {

      slot.addEventListener("click", (e) => {
        if (e.target.closest(".cover-remove-btn")) return;
        if (!coverImages[index]) {
          filePicker.click();
        }
      });


      slot.addEventListener("dragover", e => {
        e.preventDefault(); // Habilita drop (obligatorio)
      });

      slot.addEventListener("drop", e => {
        e.preventDefault();

        if (draggedIndex === null) return;

        const from = draggedIndex;
        const to = index;

        // ==============================
        // CASO 1: DROP SOBRE OTRA IMAGEN → SWAP
        // ==============================
        if (coverImages[from] && coverImages[to]) {
          if (from !== to) {
            [coverImages[from], coverImages[to]] =
              [coverImages[to], coverImages[from]];
          }

          draggedIndex = null;
          renderCovers();
          return;
        }

        // ==============================
        // CASO 2: DROP EN SLOT VACÍO → MOVE + REALIGN
        // ==============================
        if (coverImages[from] && !coverImages[to]) {
          const [moved] = coverImages.splice(from, 1);
          coverImages.splice(to, 0, moved);

          draggedIndex = null;
          renderCovers();
          return;
        }

        draggedIndex = null;
      });





    });


    filePicker.addEventListener("change", e => {
      addFiles(e.target.files);
      filePicker.value = "";
    });


    const fileInput = main.querySelector("#up-video");
    const fileNameSpan = main.querySelector("#up-video-name");

    if (fileInput) {
      fileInput.addEventListener("change", () => {
        fileNameSpan.textContent = fileInput.files.length
          ? fileInput.files[0].name
          : "No file selected";
      });
    }

    async function loadCollaboratorsIntoSelect(main) {
      if (!user) return;

      const creatorId = user.id;
      const select = document.getElementById("up-collab");
      if (!select) return;

      // Reset
      select.innerHTML = `<option value="" disabled selected>Select a collaborator</option>`;

      try {
        const data = await Api.apiFetch(
          "/api/collaborators/by-creator/" + encodeURIComponent(creatorId),
          {
            method: "GET",
            credentials: "include"
          }
        );

        if (!data) return;

        data.forEach(c => {
          const opt = document.createElement("option");
          opt.value = c.id;

          let label = c.name;

          if (c.requestState !== "approved") {
            label += ` (${c.requestState})`;
            opt.disabled = true;
            opt.classList.add("collab-option-disabled");
          }

          opt.textContent = label;
          select.appendChild(opt);
        });

      } catch (err) {
        console.error("Failed loading collaborators", err);
      }
    }

    loadCollaboratorsIntoSelect(main);


    const selectedCollaborators = [];

    function setupCollaboratorMultiSelect() {
      const select = document.getElementById("up-collab");
      const chipContainer = document.getElementById("collab-chips");

      if (!select || !chipContainer) return;

      select.addEventListener("change", () => {
        const selectedOption = select.options[select.selectedIndex];
        const id = Number(selectedOption.value);

        if (!id || selectedCollaborators.some(c => c.id === id)) {
          select.value = "";
          return;
        }

        const collaborator = {
          id,
          name: selectedOption.textContent.replace(/\s\(.+\)$/, "")
        };

        selectedCollaborators.push(collaborator);
        selectedOption.disabled = true;
        renderCollaboratorChips();
        select.value = "";

      });

      function renderCollaboratorChips() {
        chipContainer.innerHTML = "";

        selectedCollaborators.forEach((c, index) => {
          const chip = document.createElement("div");
          chip.className = "chip";

          chip.innerHTML = `
        <span>${c.name}</span>
        <button type="button">×</button>
      `;

          chip.querySelector("button").onclick = () => {
            selectedCollaborators.splice(index, 1);

            // Rehabilitar opción en el select
            const opt = [...select.options].find(o => Number(o.value) === c.id);
            if (opt) opt.disabled = false;

            renderCollaboratorChips();
          };


          chipContainer.appendChild(chip);
        });
      }

      // Exponemos para uso futuro (upload)
      return {
        getSelected: () => selectedCollaborators
      };
    }

    const collaboratorSelector = setupCollaboratorMultiSelect();



    function createChipSelector(rootId, sourceList, counterEl) {
      console.log("sourceList for", rootId, sourceList);

      const root = document.getElementById(rootId);

      const wrapper = document.createElement("div");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Start typing...";
      input.autocomplete = "off";

      const suggest = document.createElement("div");

      wrapper.className = "chip-input";
      suggest.className = "suggest-box";
      suggest.style.display = "none";

      wrapper.appendChild(input);
      wrapper.appendChild(suggest);
      root.appendChild(wrapper);


      const selected = [];
      const MAX = 30;

      function refreshCounter() {
        counterEl.textContent = `(${selected.length}/${MAX})`;
      }

      function renderChips() {
        wrapper.querySelectorAll(".chip").forEach((c) => c.remove());
        selected.forEach((v) => {
          const chip = document.createElement("div");
          chip.className = "chip";
          chip.innerHTML = `<span>${v.name}</span><button type="button">×</button>`;

          chip.querySelector("button").onclick = () => {
            const idx = selected.findIndex((s) => s.id === v.id);

            if (idx > -1) selected.splice(idx, 1);
            renderChips();
          };
          wrapper.insertBefore(chip, input);
        });
        refreshCounter();
      }

      function addValue(obj) {
        if (!obj || !obj.id) return;
        if (selected.some((s) => s.id === obj.id)) return;
        if (selected.length >= MAX) return;

        selected.push(obj);
        input.value = "";
        suggest.style.display = "none";
        renderChips();
      }

      function filterList(q) {
        const lq = q.toLowerCase();

        return sourceList.filter(
          (x) =>
            x.name &&
            x.name.toLowerCase().includes(lq) &&
            !selected.some((s) => s.id === x.id)
        );
      }

      input.addEventListener("input", () => {
        const q = input.value.trim();

        if (!q) {
          suggest.style.display = "none";
          return;
        }

        const result = filterList(q);
        if (!result.length) {
          suggest.style.display = "none";
          return;
        }

        suggest.innerHTML = result
          .map(
            (r) => `<div class="suggest-item" data-id="${r.id}">${r.name}</div>`
          )
          .join("");

        suggest.style.display = "block";

        suggest.querySelectorAll(".suggest-item").forEach((el) => {
          el.onclick = () => {
            const id = Number(el.dataset.id);
            const obj = sourceList.find((x) => x.id === id);
            addValue(obj);
          };
        });
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === ",") {
          e.preventDefault();

          const v = input.value.trim();
          if (!v) return;

          const obj = sourceList.find(
            (x) =>
              x &&
              typeof x.name === "string" &&
              x.name.toLowerCase() === v.toLowerCase()
          );

          if (obj) addValue(obj);
        }

        if (e.key === "Backspace" && input.value === "" && selected.length) {
          selected.splice(selected.length - 1, 1);
          renderChips();
        }
      });

      wrapper.addEventListener("click", () => input.focus());

      return { getValues: () => selected };
    }

    const catCount = document.getElementById("cat-count");
    const tagCount = document.getElementById("tag-count");

    const catSelector = createChipSelector(
      "cat-selector",
      catalog.categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      })),

      catCount
    );

    const tagSelector = createChipSelector(
      "tag-selector",
      catalog.tags.map((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
      })),
      tagCount
    );

    const myVideosContainer = document.getElementById("my-videos");

    async function renderMyVideos() {
      const container = document.getElementById("my-videos");
      container.innerHTML = "<div class='loading'>Loading videos...</div>";

      try {
        const videos = await Api.apiFetch(
          "/api/creator/mine",
          {
            method: "GET",
            credentials: "include"
          }
        );

        // Si apiFetch devolvió null, ya mostró notificación
        if (!videos) {
          container.innerHTML =
            `<div class="error">Failed to load your videos.</div>`;
          return;
        }

        container.innerHTML = "";

        if (!Array.isArray(videos) || videos.length === 0) {
          container.innerHTML =
            `<div class="empty-state">You haven't uploaded any videos yet.</div>`;
          return;
        }

        videos.forEach(v => {
          const el = document.createElement("div");
          el.className = "creator-video-row";

          el.innerHTML = `
  <div class="video-main">
    <div class="video-title">${Html.escapeHtml(v.title)}</div>

    <div class="video-meta">
      <span class="badge visibility ${v.visibility}">
        ${v.visibility}
      </span>

      <span class="badge status ${v.status}">
        ${v.status}
      </span>

      <span class="badge processing ${v.processingStatus}">
        ${v.processingStatus}
      </span>
    </div>
  </div>

  <div class="video-stats">
    <span>👁 ${v.viewCount}</span>
    <span>👍 ${v.likeCount}</span>
    <span>💬 ${v.commentsCount}</span>
  </div>

  <div class="video-dates">
    <div>Created: ${new Date(v.createdAt).toLocaleDateString()}</div>
    ${v.publishedAt
              ? `<div>Published: ${new Date(v.publishedAt).toLocaleDateString()}</div>`
              : `<div class="muted">Not published</div>`
            }
  </div>

  <div class="video-actions">
    <button class="btn-action edit" data-id="${v.id}">Edit</button>
    <button class="btn-action analytics" data-id="${v.id}">Analytics</button>
    <button class="btn-action delete" data-id="${v.id}">Delete</button>
  </div>
`;

          container.appendChild(el);
        });

      } catch (err) {
        console.error(err);
        container.innerHTML =
          `<div class="error">Failed to load your videos.</div>`;
      }
    }


    const btn = document.getElementById("up-btn");
    const info = document.getElementById("up-info");























    /*el.querySelector(".edit").onclick = () => {
  window.location.href = `/creator/videos/${v.id}/edit`;
};

el.querySelector(".analytics").onclick = () => {
  window.location.href = `/creator/videos/${v.id}/analytics`;
};

el.querySelector(".delete").onclick = async () => {
  if (!confirm("Are you sure you want to delete this video?")) return;

  try {
    await authFetch(
      Config.API_BASE + `/api/creator/videos/${v.id}`,
      {
        method: "DELETE",
        headers: {
          "X-Device-ID": Device.getOrCreateDeviceId()
        },
        credentials: "include"
      }
    );

    renderMyVideos(); // 🔄 refresh inmediato
  } catch (err) {
    alert("Failed to delete video");
  }
};*/




















    async function createVideo(payload) {
      const data = await Api.apiFetch(
        "/api/creator/create",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            title: payload.title,
            description: payload.description,
            visibility: payload.visibility,
            categoryId: null,
            isSensitive: false,
            allowComments: true,
            requiresApproval: true
          })
        }
      );

      if (!data) throw new Error("Failed to create video");

      return data; // { id }
    }

    async function uploadVideoFile(videoId, file) {
      const fd = new FormData();
      fd.append("file", file);

      const result = await Api.apiFetch(
        `/api/creator/videos/${videoId}/file`,
        {
          method: "POST",
          credentials: "include",
          body: fd
        }
      );

      if (!result) throw new Error("Video upload failed");
    }

    async function uploadThumbnails(videoId, covers) {
      const fd = new FormData();

      covers.forEach(file => {
        fd.append("files", file);
      });

      const result = await Api.apiFetch(
        `/api/creator/videos/${videoId}/thumbnails`,
        {
          method: "POST",
          credentials: "include",
          body: fd
        }
      );

      if (!result) throw new Error("Thumbnail upload failed");
    }

    async function addCategories(videoId, categories) {
      const result = await Api.apiFetch(
        `/api/creator/videos/${videoId}/categories`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(categories)
        }
      );

      if (!result) throw new Error("Failed to add categories");
    }

    async function addTags(videoId, tags) {
      const result = await Api.apiFetch(
        `/api/creator/videos/${videoId}/tags`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(tags)
        }
      );

      if (!result) throw new Error("Failed to add tags");
    }

    async function syncCollaborators(videoId, collaborators) {
      const result = await Api.apiFetch(
        `/api/creator/videos/${videoId}/collaborators`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(collaborators)
        }
      );

      if (!result) throw new Error("Failed to sync collaborators");
    }

    const token = localStorage.getItem("ominhub_access");

    async function uploadTempThumbnails(files) {
      const fd = new FormData();

      files.forEach(f => fd.append("files", f));

      const data = await Api.apiFetch(
        "/api/creator/temp",
        {
          method: "POST",
          credentials: "include",
          body: fd
        }
      );

      if (!data) throw new Error("Temp thumbnail upload failed");

      return data;
    }


    // =====================================================
    // POLLING DE PROCESAMIENTO DE VIDEO
    // =====================================================
    let processingIndicatorEl = null;
    let processingIntervalId = null;

    function showSessionExpiredDuringProcessing() {
      showProcessingIndicator(
        "Tu sesión expiró. El video ya fue subido y continúa procesándose en segundo plano.",
        "warning"
      );

      setTimeout(() => {
        removeProcessingIndicator();

        alert(
          "Tu sesión expiró mientras el video se procesaba.\n\n" +
          "El video NO se perdió.\n" +
          "Vuelve a iniciar sesión y revisa el estado en 'Mis Videos'."
        );
      }, 2000);
    }


    function showProcessingIndicator(text, state = "processing") {
      if (!processingIndicatorEl) {
        processingIndicatorEl = document.createElement("div");
        processingIndicatorEl.className = "processing-indicator processing";

        processingIndicatorEl.innerHTML = `
      <span class="processing-dot"></span>
      <span class="processing-text"></span>
    `;

        document.body.appendChild(processingIndicatorEl);
      }

      processingIndicatorEl.className = `processing-indicator ${state}`;
      processingIndicatorEl.querySelector(".processing-text").textContent = text;
    }

    function removeProcessingIndicator() {
      if (processingIndicatorEl) {
        processingIndicatorEl.remove();
        processingIndicatorEl = null;
      }

      if (processingIntervalId) {
        clearInterval(processingIntervalId);
        processingIntervalId = null;
      }
    }

    function showProcessingContinuesInBackground() {
      showProcessingIndicator(
        "El video sigue procesándose en segundo plano.",
        "info"
      );

      setTimeout(() => {
        removeProcessingIndicator();

        alert(
          "El procesamiento del video está tardando más de lo esperado.\n\n" +
          "No te preocupes:\n" +
          "• El video ya fue subido correctamente\n" +
          "• El procesamiento continúa en el servidor\n\n" +
          "Puedes cerrar esta página y revisar el estado más tarde en 'Mis Videos'."
        );
      }, 2000);
    }


    let pollingAttempts = 0;
    const MAX_POLLING_ATTEMPTS = 120; // 10 minutos (cada 5s)

    async function pollProcessingStatus(videoId) {
      pollingAttempts = 0;
      console.log("📡 [Polling] Start processing status");
      showProcessingIndicator("Processing video...", "processing");

      processingIntervalId = setInterval(async () => {
        pollingAttempts++;

        console.log(`🔁 [Polling tick ${pollingAttempts}] Checking status`);

        if (pollingAttempts > MAX_POLLING_ATTEMPTS) {
          console.warn("⏹ Polling timeout reached");
          clearInterval(processingIntervalId);
          showProcessingContinuesInBackground();
          return;
        }

        try {
          const data = await Api.apiFetch(
            `/api/creator/videos/${videoId}/processing-status`,
            {
              method: "GET",
              credentials: "include"
            }
          );

          // 🔴 Si es null, apiFetch ya manejó error (401, 403, etc)
          if (!data) {
            console.warn("❌ Polling request failed");
            return;
          }

          console.log("📦 Response payload:", data);

          const status = data.processingStatus;
          console.log("📊 Parsed processingStatus:", status);

          if (status === "uploaded" || status === "transcoding") {
            console.log("⏳ Video still processing");
            return;
          }

          if (status === "ready") {
            console.log("✅ Video ready");
            clearInterval(processingIntervalId);

            showProcessingIndicator("Video ready 🎉", "ready");

            setTimeout(() => {
              removeProcessingIndicator();
              renderMyVideos();
            }, 3000);

            return;
          }

          if (status === "failed") {
            console.error("❌ Video processing failed");
            clearInterval(processingIntervalId);

            showProcessingIndicator("Processing failed ❌", "failed");

            setTimeout(() => {
              removeProcessingIndicator();
            }, 5000);

            return;
          }

        } catch (err) {
          console.error("💥 Polling exception", err);
        }

      }, 5000);
    }





    if (btn && info) {
      btn.addEventListener("click", async () => {
        info.textContent = "";

        // =========================
        // RECOLECCIÓN DE DATOS
        // =========================
        const title = document.getElementById("up-title").value.trim();
        const description = document.getElementById("up-description").value.trim();
        const visibility = document.getElementById("up-visibility").value;
        const videoFile = document.getElementById("up-video").files[0];
        const termsAccepted = document.getElementById("up-terms").checked;

        const selectedCategories = catSelector.getValues();
        const selectedTags = tagSelector.getValues();
        const selectedCollaborators = collaboratorSelector?.getSelected() || [];
        const coverCount = coverImages.length;

        // =========================
        // VALIDACIONES (ALINEADAS AL BACKEND)
        // =========================
        if (!title) {
          alert("Please enter a title for the video.");
          return;
        }

        if (!visibility) {
          alert("Please select the visibility of the video.");
          return;
        }

        if (!videoFile) {
          alert("Please select a video file to upload.");
          return;
        }

        if (selectedCategories.length < 1) {
          alert("Please select at least one category.");
          return;
        }

        if (selectedTags.length < 1) {
          alert("Please add at least one tag.");
          return;
        }

        if (coverCount < 1) {
          alert("Please upload at least one cover image.");
          return;
        }

        if (!termsAccepted) {
          alert("You must accept the terms and conditions to proceed.");
          return;
        }

        try {
          // =========================
          // SUBIDA TEMPORAL DE THUMBNAILS
          // =========================
          info.textContent = "Uploading cover images...";

          const tempResult = await uploadTempThumbnails(
            coverImages.map(c => c.file)
          );

          tempResult.items.forEach((item, i) => {
            coverImages[i].tempUrl = item.url;
          });

          // =========================
          // ORQUESTADOR
          // =========================
          info.textContent = "Creating video...";

          const fd = new FormData();

          // ===== PROPIEDADES BÁSICAS =====
          fd.append("Title", title);
          fd.append("Description", description);
          fd.append("Visibility", visibility);

          fd.append("IsSensitive", "false");
          fd.append("AllowComments", "true");
          fd.append("RequiresApproval", "true");

          // ===== VIDEO =====
          fd.append("VideoFile", videoFile);

          // ===== RELACIONES (FORM-STYLE) =====
          selectedCategories.forEach(c => {
            fd.append("CategoryIds", c.id);
          });

          selectedTags.forEach(t => {
            fd.append("TagIds", t.id);
          });

          selectedCollaborators.forEach(c => {
            fd.append("CollaboratorIds", c.id);
          });

          // ===== THUMBNAILS =====
          coverImages.forEach((c, i) => {
            fd.append(`Thumbnails[${i}].FilePath`, c.tempUrl);
            fd.append(`Thumbnails[${i}].OrderIndex`, i.toString());
            fd.append(`Thumbnails[${i}].IsPrimary`, (i === 0).toString());
          });

          const result = await Api.apiFetch(
            "/api/creator/videos/orchestrate",
            {
              method: "POST",
              credentials: "include",
              body: fd
            }
          );

          if (!result) {
            throw new Error("Orchestrator failed");
          }

          // 👇 AQUÍ ARRANCA EL POLLING
          pollProcessingStatus(result.videoId);

          info.textContent = "✅ Video published and processing started.";

        } catch (err) {
          console.error(err);
          info.textContent = "❌ Upload failed. Please try again.";
        }
      });
    }



    renderMyVideos();
  }

  async function renderCreatorIdentity(main) {
    const user = CreatorGuard.ensureCreatorUser(main);

    // Usuario no logueado
    if (!user) {
      CreatorRenderer.renderPublicCreatorJoin(main);
      return;
    }

    // Garantiza que el estado exista
    let verification = Auth.getStoredVerification();

    if (!verification) {
      verification = await Auth.checkAndStoreVerificationStatus();
      Sidebar.updateCreatorSection();
    }

    if (!verification || verification.state === "none") {
      CreatorRenderer.renderInviteToBecomeCreator(main, user);
      return;
    }

    if (
      verification.state === "pending" ||
      verification.state === "rejected" ||
      verification.state === "approved"
    ) {
      renderIdentityVerification(main, user);
      return;
    }

    // Fallback seguro
    CreatorRenderer.renderInviteToBecomeCreator(main, user);
  }

  async function renderIdentityVerification(main, user) {
    // Initial skeleton (keeps your exact markup and classes)
    main.innerHTML = `
    <section class="section">
      <h1 class="section-title">Identity verification</h1>
      <p class="section-subtitle">
        To publish and monetize content that includes yourself or other people, you must verify your identity.
      </p>

      <div class="form-card creator-side-card">
        <div class="badge badge-outline">Step 1</div>
        <h2>Verify your identity to publish</h2>
        <p class="small">
          Upload a valid government ID, a selfie and confirm that you are at least 18 years old.
        </p>

        <div class="verification-steps">

          <div class="verification-step" id="step-front">
            <span class="step-badge">1</span>
            <div>
              <div class="step-title">Official ID document - Front</div>
              <p class="step-text">Upload a photo or scan of your ID, passport or driving license in the front layer.</p>

              <div class="custom-file-wrapper">
                <input id="official-id-document-front" type="file" accept="image/*" />
                <label for="official-id-document-front" class="custom-file-label">Select image file</label>
                <span id="official-id-document-front-name" class="custom-file-name">No file selected</span>
                <div id="official-id-document-front-status" class="file-status"></div>
              </div>

            </div>
          </div>

          <div class="verification-step" id="step-back">
            <span class="step-badge">2</span>
            <div>
              <div class="step-title">Official ID document - Back</div>
              <p class="step-text">Upload a photo or scan of your ID, passport or driving license in the back layer.</p>

              <div class="custom-file-wrapper">
                <input id="official-id-document-back" type="file" accept="image/*" />
                <label for="official-id-document-back" class="custom-file-label">Select image file</label>
                <span id="official-id-document-back-name" class="custom-file-name">No file selected</span>
                <div id="official-id-document-back-status" class="file-status"></div>
              </div>

            </div>
          </div>

          <div class="verification-step" id="step-selfie">
            <span class="step-badge">3</span>
            <div>
              <div class="step-title">Selfie</div>
              <p class="step-text">Take or upload a selfie so we can compare it with your document.</p>

              <div class="custom-file-wrapper">
                <input id="selfie" type="file" accept="image/*" />
                <label for="selfie" class="custom-file-label">Select image file</label>
                <span id="selfie-name" class="custom-file-name">No file selected</span>
                <div id="selfie-status" class="file-status"></div>
              </div>

            </div>
          </div>

          <div class="verification-step" id="step-age">
            <span class="step-badge">4</span>
            <div>
              <div class="step-title">Age confirmation</div>
              <p class="step-text">You must be at least 18 years old to publish content.</p>
              <label class="checkbox-inline">
                <input type="checkbox" id="terms-confirm" />
                <span class="terms-text">
                  I accept the
                  <a href="#" class="terms-link">terms and conditions</a>,
                  declare that all information provided is true,
                  and confirm that I am at least 18 years old.
                </span>
              </label>
            </div>
          </div>

        </div>

        <div class="verification-status" id="verification-status">
          Status: <span id="status-pill" class="status-pill status-pill-pending">Loading...</span>
        </div>

        <div style="margin-top:12px" class="form-footer tiny" id="verification-hint">
          Loading verification request...
        </div>

        <button class="nav-button" type="button" id="submit-verification">Submit verification</button>
        <div class="form-footer tiny">
          In a real platform, your documents would be reviewed manually or with automated KYC tools.
        </div>
      </div>
    </section>
  `;



    // wire helpers
    Router.wireNavigation();

    // DOM refs
    const frontInput = document.getElementById("official-id-document-front");
    const backInput = document.getElementById("official-id-document-back");
    const selfieInput = document.getElementById("selfie");
    const frontName = document.getElementById(
      "official-id-document-front-name"
    );
    const backName = document.getElementById("official-id-document-back-name");
    const selfieName = document.getElementById("selfie-name");
    const frontStatus = document.getElementById(
      "official-id-document-front-status"
    );
    const backStatus = document.getElementById(
      "official-id-document-back-status"
    );
    const selfieStatus = document.getElementById("selfie-status");
    const statusPill = document.getElementById("status-pill");
    const verificationHint = document.getElementById("verification-hint");
    const submitBtn = document.getElementById("submit-verification");
    const termsCheckbox = document.getElementById("terms-confirm");

    // local state
    let requestId = null;
    const uploadedDocs = { Front: null, Back: null, Selfie: null };

    // show status helpers
    function setPillPending(text = "Pending") {
      statusPill.className = "status-pill status-pill-pending";
      statusPill.textContent = text;
    }
    function setPillOk(text = "Verified") {
      statusPill.className = "status-pill status-pill-ok";
      statusPill.textContent = text;
    }
    function setPillError(text = "Missing information") {
      statusPill.className = "status-pill status-pill-error";
      statusPill.textContent = text;
    }

    // Fetch the user's current verification request (if any)
    async function loadRequest() {
      console.log("🔵 [loadRequest] Iniciando carga de solicitud...");

      verificationHint.textContent = "Loading verification request...";
      setPillPending("Loading...");

      try {
        console.log("📡 [loadRequest] GET /api/verification/me");

        const req = await Api.apiFetch(
          "/api/verification/me",
          {
            method: "GET",
            credentials: "include"
          }
        );

        console.log("📥 [loadRequest] Response:", req);

        // Si apiFetch devuelve null puede ser:
        // - No hay request
        // - Refresh falló (logout ya ejecutado)
        // - 403
        // - Error de red

        if (!req) {
          verificationHint.textContent =
            "No verification request found for your account.";
          setPillPending("No request");
          return;
        }

        handleVerificationResponse(req);

      } catch (err) {
        console.error("🔴 [loadRequest] Error:", err);
        verificationHint.textContent = "Failed to load verification request.";
        setPillError("Error");
      }
    }

    // Upload helper (automatic on select)
    async function uploadFile(file, type, statusEl, nameEl) {
      if (!requestId) {
        // No request on backend — cannot upload.
        verificationHint.textContent =
          "No verification request exists for your account. Please request Creator/Studio role first.";
        setPillError("No request");
        return false;
      }

      if (!file) return false;

      nameEl.textContent = file.name;
      statusEl.textContent = "Uploading...";

      try {
        const fd = new FormData();
        fd.append("File", file);
        fd.append("Type", type); // server expects Type = Front|Back|Selfie

        const j = await Api.apiFetch(
          "/api/verification/" +
          encodeURIComponent(requestId) +
          "/upload",
          {
            method: "POST",
            credentials: "include",
            body: fd
          }
        );

        if (!j) {
          statusEl.textContent = "Upload failed";
          setPillError("Upload failed");
          return false;
        }

        // On success, server returns document info
        const doc = j.document || j.Document || j.document;
        if (!doc) {
          statusEl.textContent = "Uploaded (no doc info)";
        } else {
          statusEl.innerHTML = `<a target="_blank" href="${Html.escapeHtml(
            doc.url || doc.Url || doc.Url
          )}">View</a>`;
        }

        // update local state
        if (type === "Front") uploadedDocs.Front = doc;
        if (type === "Back") uploadedDocs.Back = doc;
        if (type === "Selfie") uploadedDocs.Selfie = doc;

        // update overall status
        const haveAll =
          uploadedDocs.Front &&
          uploadedDocs.Back &&
          uploadedDocs.Selfie &&
          termsCheckbox.checked;
        if (haveAll) {
          setPillPending("Pending review");
          verificationHint.textContent =
            "All files uploaded. Waiting for review.";
        } else {
          setPillPending("Incomplete");
        }

        return true;
      } catch (err) {
        console.error("Upload error", err);
        statusEl.textContent = "Upload error";
        setPillError("Upload error");
        return false;
      }
    }

    // safe JSON parse
    async function safeJson(res) {
      try {
        return await res.json();
      } catch {
        return null;
      }
    }

    // wire automatic uploads on file select
    if (frontInput) {
      frontInput.addEventListener("change", async (e) => {
        const f = e.target.files && e.target.files[0];
        await uploadFile(f, "Front", frontStatus, frontName);
      });
    }
    if (backInput) {
      backInput.addEventListener("change", async (e) => {
        const f = e.target.files && e.target.files[0];
        await uploadFile(f, "Back", backStatus, backName);
      });
    }
    if (selfieInput) {
      selfieInput.addEventListener("change", async (e) => {
        const f = e.target.files && e.target.files[0];
        await uploadFile(f, "Selfie", selfieStatus, selfieName);
      });
    }

    function handleVerificationResponse(req) {
      console.log("🟣 [handleVerificationResponse] Procesando respuesta...");
      console.log("🟣 [handleVerificationResponse] req:", req);

      requestId = req.id || req.Id;
      console.log("🟣 [handleVerificationResponse] requestId:", requestId);

      const docs = req.documents || req.Documents || [];
      console.log("🟣 [handleVerificationResponse] documentos:", docs);

      docs.forEach((d) => {
        console.log("📄 [handleVerificationResponse] Documento:", d);
        if (!d || !d.type) return;

        const type = (d.type || d.Type).toLowerCase();
        console.log("📌 Documento tipo:", type);

        const createViewButton = (doc, statusEl, nameEl, storeKey) => {
          uploadedDocs[storeKey] = doc;
          nameEl.textContent = doc.url || doc.Url;

          const fileUrl = doc.url || doc.Url;

          statusEl.innerHTML = `
    <a 
      href="${Html.escapeHtml(fileUrl)}"
      target="_blank"
      rel="noopener noreferrer"
      class="view-btn"
    >
      View
    </a>
  `;
        };

        if (type === "front") {
          createViewButton(d, frontStatus, frontName, "Front");
        } else if (type === "back") {
          createViewButton(d, backStatus, backName, "Back");
        } else if (type === "selfie") {
          createViewButton(d, selfieStatus, selfieName, "Selfie");
        }
      });

      const state = (req.state || req.State || "").toLowerCase();
      console.log("🟣 [handleVerificationResponse] Estado:", state);

      if (state === "approved" || state === "verified" || state === "ok") {
        console.log("🟢 Estado aprobado");
        setPillOk("Verified");
        verificationHint.textContent = "Your identity has been verified.";
      } else if (state === "rejected" || state === "denied") {
        console.log("🔴 Estado rechazado");
        setPillError("Rejected");
        verificationHint.textContent =
          "Your verification request was rejected. Check notes or re-submit.";
      } else {
        console.log("🟡 Estado pendiente/incompleto");

        const haveAll =
          uploadedDocs.Front && uploadedDocs.Back && uploadedDocs.Selfie;

        console.log("🟣 Archivos completos:", haveAll);

        if (haveAll) {
          setPillPending("Pending review");
          verificationHint.textContent =
            "All files uploaded. Waiting for review.";
        } else {
          setPillPending("Incomplete");
          verificationHint.textContent =
            "Upload the missing documents. Files are uploaded automatically on selection.";
        }
      }
    }

    // Submit button: just verifies that files are present and age checkbox checked.
    submitBtn.addEventListener("click", async () => {
      // simple client-side checks: age checkbox + at least one file
      if (!termsCheckbox.checked) {
        verificationHint.textContent =
          "You must confirm you are at least 18 years old.";
        setPillError("Age not confirmed");
        return;
      }

      // If there is no request, we can't create one from here (API doesn't expose create endpoint).
      if (!requestId) {
        verificationHint.textContent =
          "No verification request exists. Request role upgrade to Creator/Studio from your profile first.";
        setPillError("No request");
        return;
      }

      // If not all files uploaded, warn user
      if (!(uploadedDocs.Front && uploadedDocs.Back && uploadedDocs.Selfie)) {
        verificationHint.textContent =
          "Please upload all three files (front, back, selfie). Files upload automatically when selected.";
        setPillError("Incomplete");
        return;
      }

      // At this point, everything is uploaded — client just shows message, server will review.
      verificationHint.textContent =
        "All files uploaded. Your request will be reviewed by the team.";
      setPillPending("Pending review");
    });

    // Initial load
    await loadRequest();
  }

  async function renderCreatorPeople(main) {
    const user = CreatorGuard.ensureCreatorUser(main);
    if (!user) {
      Login.renderLogin(main);
      return;
    }

    // Garantiza que el estado exista
    let verification = Auth.getStoredVerification();

    if (!verification) {
      verification = await Auth.checkAndStoreVerificationStatus();
      Sidebar.updateCreatorSection();
    }

    if (!verification || verification.state === "none") {
      CreatorRenderer.renderInviteToBecomeCreator(main, user);
      return;
    }

    if (verification.state === "pending" || verification.state === "rejected") {
      CreatorRenderer.renderVerificationRequired(main, user, verification.raw);
      return;
    }

    if (verification.state === "approved") {
      renderCollaborators(main, user);
      return;
    }

    // Fallback seguro
    CreatorRenderer.renderInviteToBecomeCreator(main, user);
  }

  // Layout: People
  function renderCollaborators(main, user) {
    const PeopleLayout = `
      <section class="section people-block">
    <h1 class="section-title">People appearing in your content</h1>
    <p class="section-subtitle">
      Keep track of collaborators, actors and other people that appear in your videos.
      For each person you must store proof of consent.
    </p>
    <div class="collab-contract-actions">
      <a href="/pages/contracts/collaboration-agreement.pdf" class="nav-button" target="_blank"
        rel="noopener noreferrer" download>
        Download Collaboration Agreement
      </a>

      <button type="button" class="nav-button nav-button-secondary" id="sign-collaboration-agreement">
        Start a Collaboration (Only between verified accounts)
      </button>
    </div>



    <div class="form-card creator-main-card">
      <div class="collab-form-row">
        <div class="form-field">
          <label for="collab-name">Name</label>
          <input id="collab-name" type="text" placeholder="Full legal name" />
        </div>
        <div class="form-field">
          <label for="collab-doc">Document ID</label>
          <input id="collab-doc" type="text" placeholder="ID / passport number" />
        </div>
        <div class="form-field">
          <label for="collab-role">Relationship</label>
          <select id="collab-role">
            <option value="performer">Performer</option>
            <option value="partner">Partner</option>
            <option value="guest">Guest</option>
            <option value="producer">Producer</option>
          </select>
        </div>
        <div class="form-field consent-field">
          <label for="collab-consent-file">Consent file</label>

          <div class="consent-input-row">
            <input id="collab-consent-file" type="file" accept="image/*,.pdf" />

            <button type="button" class="consent-link-btn" id="digital-sign-btn">
              Sign digitally
            </button>
          </div>
        </div>


        <div class="form-field">
          <label>&nbsp;</label>
          <button class="nav-button" type="button" id="add-collab-btn">Add collaborator</button>
        </div>
      </div>

      <h2 class="section-title">Collaborators already added</h2>

      <table class="collab-table" id="collab-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Document</th>
            <th>Relationship</th>
            <th>Consent file</th>
            <th>State</th>
          </tr>
        </thead>

        <tbody>
          <tr class="collab-empty-row">
            <td colspan="5">No collaborators added yet.</td>
          </tr>

        </tbody>
      </table>
    </div>
  </section>
    `;

    main.innerHTML = PeopleLayout;

    //Debe ser aislado en una función aparte, y analizar donde pertenece cada fun
    // Bloqueo
    /*if (!verify) {
      const blocked = main.querySelector(".people-block");
      if (blocked) {
        blocked.style.pointerEvents = "none";
        blocked.style.opacity = "0.35";
      }
    }*/

    async function loadCreatorCollaborators() {

      const user = CreatorGuard.ensureCreatorUser(main);
      if (!user) {
        Login.renderLogin(main);
        return;
      }

      const creatorId = user.id;

      const data = await Api.apiFetch(
        "/api/collaborators/by-creator/" + encodeURIComponent(creatorId),
        {
          method: "GET",
          credentials: "include"
        }
      );

      if (!data) return;

      const tbody = document
        .getElementById("collab-table")
        ?.querySelector("tbody");

      if (!tbody) return;

      tbody.innerHTML = "";

      if (!data.length) {
        tbody.innerHTML = `
      <tr class="collab-empty-row">
        <td colspan="5">No collaborators added yet.</td>
      </tr>`;
        return;
      }

      for (const c of data) {
        const row = document.createElement("tr");

        const stateClass =
          c.requestState === "pending"
            ? "status-pill-pending"
            : c.requestState === "approved"
              ? "status-pill-ok"
              : "status-pill-error";

        const consentCell = c.consentFileUrl
          ? `<a href="${Html.escapeHtml(c.consentFileUrl)}" target="_blank" rel="noopener noreferrer">
       View
     </a>`
          : "-";


        row.innerHTML = `
  <td>${Html.escapeHtml(c.name)}</td>
  <td>${Html.escapeHtml(c.document)}</td>
  <td>${Html.escapeHtml(c.role)}</td>
  <td>${consentCell}</td>
  <td>
    <span class="status-pill ${stateClass}">
      ${Html.escapeHtml(c.requestState)}
    </span>
  </td>
`;

        tbody.appendChild(row);
      }
    }



    loadCreatorCollaborators();

    // Add collaborators
    const btn = document.getElementById("add-collab-btn");
    const table = document
      .getElementById("collab-table")
      ?.querySelector("tbody");


    if (btn && table) {
      btn.addEventListener("click", async () => {

        const user = CreatorGuard.ensureCreatorUser(main);
        if (!user) {
          alert("User session lost");
          return;
        }

        const creatorId = user.id; // 👈 SIEMPRE definido aquí

        const name = document.getElementById("collab-name").value.trim();
        const doc = document.getElementById("collab-doc").value.trim();
        const role = document.getElementById("collab-role").value;
        const consentInput = document.getElementById("collab-consent-file");
        const file = consentInput.files[0];

        if (!(name && doc && role && file)) {
          alert("Please complete all collaborator fields and attach a consent file.");
          return;
        }

        try {

          const fd = new FormData();
          fd.append("Name", name);
          fd.append("Document", doc);
          fd.append("Role", role);
          fd.append("CreatorId", creatorId);
          fd.append("ConsentFile", file);

          const data = await Api.apiFetch(
            "/api/collaborators/add",
            {
              method: "POST",
              credentials: "include",
              body: fd
            }
          );

          if (!data) throw new Error("Collaborator creation failed");

          await loadCreatorCollaborators();


          document.getElementById("collab-name").value = "";
          document.getElementById("collab-doc").value = "";
          consentInput.value = "";


        } catch (err) {
          alert(err.message);
        }

      });


    }
  }

  async function renderCreatorMonetization(main) {
    const user = CreatorGuard.ensureCreatorUser(main);
    
    CreatorStateService.resolveCreatorAccess(main, user);

    if (verification.state === "approved") {
      CreatorMonetization.renderMonetizationLayout(main, user);
      return;
    }
    // Fallback seguro
    CreatorRenderer.renderInviteToBecomeCreator(main, user);
  }

  function init() {
    BuildShell.buildShell();
    updateUserActions();

    const uploadedVideos = Storage.getStored(Demo.STORE_KEYS.uploaded, []);
    Demo.VIDEOS.unshift(...uploadedVideos.filter((v) => v.src));
    const main = document.getElementById("main-content");
    const page = Router.getCurrentPageKey();

    switch (page) {
      case "home":
        Home.renderHome(main);
        break;
      case "categories":
        Categories.renderCategories(main);
        break;
      case "tags":
        Tags.renderTags(main);
        break;
      case "search":
        Search.renderSearch(main);
        break;
      case "favorites":
        Favorites.renderFavorites(main);
        break;
      case "history":
        History.renderHistory(main);
        break;
      case "playlist":
        Playlist.renderPlaylist(main);
        break;



      case "channel":
        renderCreatorUpload(main);
        break;
      case "creator-identity":
        renderCreatorIdentity(main);
        break;
      case "creator-people":
        renderCreatorPeople(main);
        break;
      case "creator-monetization":
        renderCreatorMonetization(main);
        break;



      case "admin":
        Admin.renderAdmin(main);
        break;
      case "profile":
        Profile.renderProfile(main);
        break;
      case "login":
        Login.renderLogin(main);
        break;
      case "register":
        Register.renderRegister(main);
        break;
      case "watch":
        Watch.renderWatch(main);
        break;


      case "cookies":
        Cookies.renderCookies(main);
        break;
      case "terms":
        Terms.renderTerms(main);
        break;
      case "privacy":
        Privacy.renderPrivacy(main);
        break;
      case "about":
        About.renderAbout(main);
        break;
      case "creators":
        Creators.renderCreators(main);
        break;
      case "studio":
        Studio.renderStudio(main);
        break;
      case "support":
        Support.renderSupport(main);
        break;
      case "safety":
        Safety.renderSafety(main);
        break;



      default:
        Home.renderHome(main);
        break;
    }

    I18n.translateUI(Storage.getStored("ominhub_lang", "en"));
  }

  /* ============================================================
   AUTO LOGIN ANTES DE RENDERIZAR LA PÁGINA
   ============================================================ */
  window.addEventListener("load", async () => {
    const ok = await Auth.autoLogin();
    if (!ok) {
      console.log("User must log in manually");
    }
    updateUserActions();

    // Ahora sí inicializamos la app
    init();
  });  
  /* YA NO EJECUTAMOS init() AQUÍ
   porque ahora lo hace el Auth.autoLogin()















































TODO ESO PARA ABAJO ES LOGICA DE WATCH 

 logica del boton de guardar favoritos, se recomienda que se ejecute solo en la pagina de watch y que se oculte si el video ya esta guardado en favoritos
     <button style="display: none;" class="action-btn" id="save-btn" title="Guardar en favoritos">
                <span class="action-icon">📁</span>
                <span class="action-text">Guardar</span>
              </button>
              
logica del boton de activar notificaciones, se recomienda que se ejecute solo en la pagina de watch y que cambie su estado si el usuario esta suscrito o no al canal del video
 <button class="icon-btn" id="bell-btn" title="Activar notificaciones">
                  <span>🔔</span>
                </button>


LOGICA PARA EL BOTON DE RESPONDER EN LOS COMENTARIOS, SE RECOMIENDA QUE SE EJECUTE SOLO EN LA PAGINA DE WATCH Y QUE AL HACER CLICK EN EL BOTON SE ABRA UN CAMPO DE TEXTO DEBAJO DEL COMENTARIO PARA ESCRIBIR LA RESPUESTA, ADEMAS DE UN BOTON PARA PUBLICAR LA RESPUESTA                
          <button class="comment-reply-btn">Responder</button>


logica para el build shell del sidebar, se recomienda que se ejecute en todas las paginas y que tenga una seccion de biblioteca con enlaces a favoritos, historial y playlist
'<div class="sidebar-section-title" data-section="library" data-translate="Library">Library</div>',
      '<ul class="sidebar-menu">',
      '<li><a data-nav="favorites" data-page-target="favorites"><span class="sidebar-icon">&#10084;</span><span data-translate="Favorites">Favorites</span></a></li>',
      '<li><a data-nav="history" data-page-target="history"><span class="sidebar-icon">&#8635;</span><span data-translate="History">Historial</span></a></li>',
      '<li><a data-nav="playlist" data-page-target="playlist"><span class="sidebar-icon">&#127911;</span><span data-translate="Playlists">Playlists</span></a></li>',
      "</ul>",




logica para el boton de estadisticas en el estudio de creador, se recomienda que se ejecute solo en la pagina de studio y que al hacer click en el boton se redirija a una nueva pagina con las estadisticas del canal del creador, como vistas, suscriptores, ingresos, etc.
                      <button class="btn-sm btn-edit">Estadisticas</button>

logica para categorias y tags, se recomienda que se ejecute solo en la pagina de watch y que al hacer click en el boton se redirija a una nueva pagina con los videos relacionados a esa categoria o tag respectivamente, ademas de mostrar el nombre de la categoria o tag en un titulo grande en la parte superior de la pagina
   '<li><a data-nav="categories" data-page-target="categories"><span class="sidebar-icon">&#9776;</span><span data-translate="Categories">Categories</span></a></li>',
      '<li><a data-nav="tags" data-page-target="tags"><span class="sidebar-icon">#</span><span data-translate="Tags">Tags</span></a></li>',


*/
})();



//Melipeuco 