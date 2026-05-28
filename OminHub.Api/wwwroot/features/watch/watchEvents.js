import { RelatedUi } from "./relatedUi.js";
import { RelatedVideos } from "./relatedVideos.js";
import { CommentsLoader } from "./commentsLoader.js";
import { Api } from "../../services/api.js";
import { Ui } from "../../core/ui.js";
import { WatchController } from "../../pages/watch/watchController.js";
import { Auth } from "../../core/auth.js";
import { Router } from "../../utils/router.js";
import { Formatters } from "../../utils/formatters.js";


function setupWatchEvents(video, currentUser, commentsState) {

    console.log("[WatchEvents] setupWatchEvents START");
    console.log("[WatchEvents] video:", video);
    console.log("[WatchEvents] currentUser:", currentUser);
    console.log("[WatchEvents] commentsState:", commentsState);

    const refreshBtn = document.getElementById('refresh-related-btn');

    console.log("[WatchEvents] refreshBtn:", refreshBtn);

    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {

        console.log("[WatchEvents] refresh-related-btn CLICK");
        console.log("[WatchEvents] current filter:", WatchController.currentRelatedFilter);

        // 🔥 asegurar consistencia visual
        RelatedUi.updateRelatedUI(WatchController.currentRelatedFilter);

        console.log("[WatchEvents] Related UI updated");

        RelatedVideos.loadVideosByFilter(video, WatchController.currentRelatedFilter);

        console.log("[WatchEvents] loadVideosByFilter executed");
      });
    }

    const filterTabs = document.querySelectorAll('.filter-tab');

    console.log("[WatchEvents] filterTabs:", filterTabs);
    console.log("[WatchEvents] filterTabs count:", filterTabs.length);

    filterTabs.forEach(tab => {

      console.log("[WatchEvents] binding tab:", tab);
      console.log("[WatchEvents] tab filter:", tab.dataset.filter);

      tab.addEventListener('click', () => {

        console.log("[WatchEvents] filter-tab CLICK");

        const selectedFilter = tab.dataset.filter;

        console.log("[WatchEvents] selectedFilter:", selectedFilter);

        // 🔥 actualizar estado GLOBAL
        WatchController.currentRelatedFilter = selectedFilter;

        console.log(
          "[WatchEvents] currentRelatedFilter updated:",
          WatchController.currentRelatedFilter
        );
        
        // 🔥 actualizar UI (título + visibilidad)
        RelatedUi.updateRelatedUI(selectedFilter);

        console.log("[WatchEvents] Related UI updated");

        // 🔥 cargar contenido
        RelatedVideos.loadVideosByFilter(video, selectedFilter);

        console.log("[WatchEvents] loadVideosByFilter executed");
      });
    });

    const sortSelect = document.getElementById('sort-comments');

    console.log("[WatchEvents] sortSelect:", sortSelect);

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {

        console.log("[WatchEvents] sort-comments CHANGE");
        console.log("[WatchEvents] selected sort:", sortSelect.value);

        commentsState.page = 1;

        console.log("[WatchEvents] commentsState.page reset to 1");

        CommentsLoader.loadCommentsPage(video.id, commentsState, true);

        console.log("[WatchEvents] loadCommentsPage executed");
      });
    }

    // Botón de suscripción
    const subscribeBtn = document.getElementById('subscribe-btn');

    console.log("[WatchEvents] subscribeBtn:", subscribeBtn);

    if (subscribeBtn) {

      subscribeBtn.addEventListener('click', async () => {

        console.log("[WatchEvents] subscribe-btn CLICK");

        if (!currentUser) {

          console.log("[WatchEvents] user NOT authenticated");
          console.log("[WatchEvents] redirecting to login");

          window.location.href = Router.resolveHref('login');
          return;
        }

        console.log("[WatchEvents] authenticated user:", currentUser);

        try {

          const endpoint =
            `/api/viewer/channels/${video.channelId}/subscribe`;

          console.log("[WatchEvents] subscribe endpoint:", endpoint);

          const res = await Api.apiFetch(
            endpoint,
            { method: "POST" }
          );

          console.log("[WatchEvents] subscribe response:", res);

          if (!res) {

            console.log("[WatchEvents] empty subscribe response");
            return;
          }

          if (res.isSubscribed) {

            console.log("[WatchEvents] user subscribed");

            subscribeBtn.classList.add('subscribed');

            subscribeBtn.querySelector('.subscribe-icon').textContent = '✓';

            subscribeBtn.querySelector('.subscribe-text').textContent =
              'Suscrito';

          } else {

            console.log("[WatchEvents] user unsubscribed");

            subscribeBtn.classList.remove('subscribed');

            subscribeBtn.querySelector('.subscribe-icon').textContent = '🔔';

            subscribeBtn.querySelector('.subscribe-text').textContent =
              'Suscribirse';
          }

          const subsEl = document.querySelector('.channel-subs');

          console.log("[WatchEvents] subsEl:", subsEl);

          if (subsEl && typeof res.subscribersCount === "number") {

            console.log(
              "[WatchEvents] updating subscribersCount:",
              res.subscribersCount
            );

            subsEl.textContent =
              Formatters.formatViews(res.subscribersCount) +
              " suscriptores";
          }

        } catch (err) {

          console.error("[WatchEvents] subscribe ERROR:", err);

          Ui.showNotification('Error al suscribirse', 'error');
        }
      });
    }

    console.log("[WatchEvents] setupWatchEvents END");
  }

  export const WatchEvents = {
    setupWatchEvents
}