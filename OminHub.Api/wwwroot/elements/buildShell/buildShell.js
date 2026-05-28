import { Router } from "../../utils/router.js";
import { Sidebar } from "../../components/sidebar.js";
import { Search } from "../../features/search.js";
import { I18n } from "../../features/i18n.js";


function buildShell() {
    const container = document.getElementById("app-root") || document.body;

    container.innerHTML = [
        '<header class="nav">',
        '<div class="nav-left">',
        '<button class="icon-button" type="button" data-sidebar-toggle>&#9776;</button>',
        '<a class="logo" data-nav="home">',
        '<span class="logo-main">OMIN</span><span class="logo-accent">HUB</span>',
        "</a>",
        "</div>",
        '<div class="nav-center">',
        '<form class="search-bar" id="top-search-form">',
        '<input type="text" id="top-search-input" placeholder="Search millions of HD videos..." autocomplete="off" data-translate="Search millions of HD videos..."/>',
        '<button type="submit" data-translate="Search">Search</button>',
        "</form>",
        "</div>",
        '<div class="nav-right">',
        '<a class="nav-link" data-nav="channel" data-translate="Upload">Upload</a>',
        '<div id="user-actions"></div>',
        '<div class="nav-lang">',
        '<select class="nav-lang-toggle" id="lang-select">',
        '<option value="en">English</option>',
        '<option value="es">Español</option>',
        "</select>",
        "</div>",
        "</div>",
        "</header>",

        '<div class="app-shell">',
        '<aside class="sidebar">',
        '<div class="sidebar-section-title" data-translate="Browse">Browse</div>',
        '<ul class="sidebar-menu">',
        '<li><a data-nav="home" data-page-target="home"><span class="sidebar-icon">&#8962;</span><span data-translate="Home">Home</span></a></li>',


        "</ul>",


        '<div class="sidebar-section-title" data-section="creator" data-translate="Creator">Creator</div>',
        '<ul class="sidebar-menu">',
        '<li><a data-nav="channel" data-page-target="channel"><span class="sidebar-icon">&#128249;</span><span>Upload video</span></a></li>',
        '<li><a data-nav="creator-identity" data-page-target="creator-identity"><span class="sidebar-icon">&#128272;</span><span>Identity verification</span></a></li>',
        '<li><a data-nav="creator-people" data-page-target="creator-people"><span class="sidebar-icon">&#128101;</span><span>People in your content</span></a></li>',
        '<li><a data-nav="creator-monetization" data-page-target="creator-monetization"><span class="sidebar-icon">&#128176;</span><span>Monetization & payouts</span></a></li>',
        '<li><a data-nav="admin" data-page-target="admin"><span class="sidebar-icon">&#9881;</span><span data-translate="Admin panel">Admin panel</span></a></li>',
        '<li><a data-nav="profile" data-page-target="profile"><span class="sidebar-icon">&#128100;</span><span data-translate="Profile">Profile</span></a></li>',
        "</ul>",

        "</aside>",

        '<div class="sidebar-overlay" data-sidebar-close></div>',
        '<main id="main-content" class="main"></main>',
        "</div>",

        // NUEVO FOOTER MEJORADO
        '<footer class="footer">',
        '  <div class="footer-container">',
        '    <div class="footer-grid">',
        '      <div class="footer-section">',
        '        <h3 class="footer-title">Discover</h3>',
        '        <div class="footer-links">',
        '          <a data-nav="about" class="footer-link">About OMINHUB</a>',
        '          <a data-nav="creators"  class="footer-link">Creators</a>',
        '          <a data-nav="studio"  class="footer-link">Studio</a>',
        '        </div>',
        '      </div>',
        '',
        '      <div class="footer-section">',
        '        <h3 class="footer-title">Legal</h3>',
        '        <div class="footer-links">',
        '          <a data-nav="terms" class="footer-link">Terms</a>',
        '          <a data-nav="privacy"  class="footer-link">Privacy</a>',
        '          <a data-nav="cookies" class="footer-link">Cookies</a>',
        '        </div>',
        '      </div>',
        '',
        '      <div class="footer-section">',
        '        <h3 class="footer-title">Help</h3>',
        '        <div class="footer-links">',
        '          <a data-nav="support"  class="footer-link">Support</a>',
        '          <a data-nav="dafety"  class="footer-link">Safety</a>',
        '        </div>',
        '      </div>',
        '    </div>',
        '',
        '    <div class="footer-bottom">',
        '      <div class="footer-logo">',
        '        <span class="logo-main">OMIN</span><span class="logo-accent">HUB</span>',
        '      </div>',
        '      <div class="footer-copyright">',
        '        © ' + new Date().getFullYear() + ' OMINHUB · All rights reserved',
        '      </div>',
        '      <div class="footer-social">',
        '        <a href="#" class="social-icon" aria-label="Twitter">🐦</a>',
        '        <a href="#" class="social-icon" aria-label="Instagram">📸</a>',
        '        <a href="#" class="social-icon" aria-label="YouTube">▶️</a>',
        '        <a href="#" class="social-icon" aria-label="GitHub">💻</a>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</footer>',
    ].join("");

    Router.wireNavigation();
    Sidebar.wire();
    Search.wire();
    Router.highlightActiveMenu();
    I18n.setupLanguage();
    Sidebar.updateCreatorSection();
}

export const BuildShell = {
    buildShell
}