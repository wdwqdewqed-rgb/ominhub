import { Storage } from "../core/storage.js";
import { Auth } from "../core/auth.js";

function wire() {
  const toggle = document.querySelector("[data-sidebar-toggle]");
  const overlay = document.querySelector("[data-sidebar-close]");

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
    });
  }
}

function updateCreatorSection() {
  console.log("updateCreatorSection RUNNING");

  const state = getSidebarAccessState();

  applyViewerVisibility(state);
  applyCreatorVisibility(state);
  applyAdminVisibility(state);
}

function getSidebarAccessState() {
  const user = Storage.getStored("ominhub_user", null);
  const verification = Auth.getStoredVerification();

  return {
    isLogged: !!user,
    role: (user?.role || "").toLowerCase(),
    isVerified: verification?.state === "approved"
  };
}

/* =========================================================
   VIEWER SECTION
========================================================= */

function applyViewerVisibility(state) {

}

/* =========================================================
   CREATOR SECTION
========================================================= */

function applyCreatorVisibility(state) {
  const creatorTitle = document.querySelector(
    '.sidebar-section-title[data-section="creator"]'
  );

  const creatorMenu = creatorTitle
    ? creatorTitle.nextElementSibling
    : null;

  if (!creatorTitle || !creatorMenu) return;

  const uploadBtn =
    creatorMenu.querySelector('[data-nav="channel"]');

  const identityBtn =
    creatorMenu.querySelector(
      '[data-nav="creator-identity"]'
    );

  const peopleBtn =
    creatorMenu.querySelector(
      '[data-nav="creator-people"]'
    );

  const monetBtn =
    creatorMenu.querySelector(
      '[data-nav="creator-monetization"]'
    );

  const profileBtn =
    creatorMenu.querySelector(
      '[data-nav="profile"]'
    );

    const adminBtn =
    creatorMenu.querySelector(
      '[data-nav="admin"]'
    );

  // RESET
  [
    uploadBtn,
    identityBtn,
    peopleBtn,
    monetBtn,
    profileBtn,
    adminBtn
  ].forEach((btn) => {
    btn?.closest("li")?.classList.remove("hidden");
  });

  // SIN SESIÓN
  if (!state.isLogged) {
      identityBtn?.closest("li")?.classList.add("hidden");
      peopleBtn?.closest("li")?.classList.add("hidden");
      profileBtn?.closest("li")?.classList.add("hidden");
      adminBtn?.closest("li")?.classList.add("hidden");
    return;
  }

  // ROLES PERMITIDOS
  const allowedRoles = ["creator", "admin"];

  if (!allowedRoles.includes(state.role)) {
    creatorTitle.classList.add("hidden");
    creatorMenu.classList.add("hidden");
    return;
  }

  // MOSTRAR SECCIÓN
  creatorTitle.classList.remove("hidden");
  creatorMenu.classList.remove("hidden");

  // USUARIO VERIFICADO → ocultar identity
  if (state.isVerified) {
    identityBtn?.closest("li")?.classList.add("hidden");
  }
  console.log("Creator hidden:", creatorMenu.classList);
}

/* =========================================================
   ADMIN SECTION
========================================================= */

function applyAdminVisibility(state) {
}

export const Sidebar = {
  wire,
  updateCreatorSection,
  getSidebarAccessState,
  applyViewerVisibility,
  applyCreatorVisibility,
  applyAdminVisibility
};