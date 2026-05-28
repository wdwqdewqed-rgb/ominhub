import { Config } from '../core/config.js'

function resolveHref(pageKey) {
    switch (pageKey) {
        case "home":
            return Config.BASE_PATH + "/index.html";
        case "search":
            return Config.BASE_PATH + "/pages/search/index.html";
        case "categories":
            return Config.BASE_PATH + "/pages/categories/index.html";
        case "favorites":
            return Config.BASE_PATH + "/pages/favorites/index.html";
        case "history":
            return Config.BASE_PATH + "/pages/history/index.html";
        case "playlist":
            return Config.BASE_PATH + "/pages/playlist/index.html";
        case "channel":
            return Config.BASE_PATH + "/pages/channel/index.html";
        case "creator-identity":
            return Config.BASE_PATH + "/pages/creator-identity/index.html";
        case "creator-people":
            return Config.BASE_PATH + "/pages/creator-people/index.html";
        case "creator-monetization":
            return Config.BASE_PATH + "/pages/creator-monetization/index.html";
        case "tags":
            return Config.BASE_PATH + "/pages/tags/index.html";
        case "admin":
            return Config.BASE_PATH + "/pages/admin/index.html";
        case "login":
            return Config.BASE_PATH + "/pages/login/index.html";
        case "register":
            return Config.BASE_PATH + "/pages/register/index.html";
        case "profile":
            return Config.BASE_PATH + "/pages/profile/index.html";
        case "watch":
            return Config.BASE_PATH + "/watch.html";



        case "cookies":
            return Config.BASE_PATH + "/pages/cookies/index.html";
        case "terms":
            return Config.BASE_PATH + "/pages/terms/index.html";
        case "privacy":
            return Config.BASE_PATH + "/pages/privacy/index.html";
        case "about":
            return Config.BASE_PATH + "/pages/about/index.html";
        case "creators":
            return Config.BASE_PATH + "/pages/creators/index.html";
        case "studio":
            return Config.BASE_PATH + "/pages/studio/index.html";
        case "support":
            return Config.BASE_PATH + "/pages/support/index.html";
        case "safety":
            return Config.BASE_PATH + "/pages/safety/index.html";




        default:
            return null;
    }
}

function wireNavigation() {
    const navElements = document.querySelectorAll("[data-nav]");
    navElements.forEach((el) => {
        const key = el.getAttribute("data-nav");
        const href = Router.resolveHref(key);
        if (href) {
            if (el.tagName === "A") {
                el.setAttribute("href", href);
            } else {
                el.addEventListener("click", () => {
                    window.location.href = href;
                });
            }
        }
    });
}

function highlightActiveMenu() {
    const current = Router.getCurrentPageKey();
    document.querySelectorAll("[data-page-target]").forEach((el) => {
        const page = el.getAttribute("data-page-target");
        if (page === current) {
            el.classList.add("active");
        }
    });
}

  function getCurrentPageKey() {
    const body = document.body;
    return body.dataset.page || "home";
  }

  function getCurrentVideoIdFromLocation() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

export const Router = {
    resolveHref,
    wireNavigation,
    highlightActiveMenu,
    getCurrentPageKey,
    getCurrentVideoIdFromLocation
}