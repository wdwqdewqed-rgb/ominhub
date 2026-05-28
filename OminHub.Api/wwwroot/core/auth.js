import { Storage } from '../core/storage.js'
import { Config } from '../core/config.js'
import { Api } from '../services/api.js';

// 🔐 SESSION CONSTANTS
const SESSION_USER_KEY = "ominhub_user";
const SESSION_ACCESS_KEY = "ominhub_access";
const OMINHUB_VERIFY_KEY = "ominhub_verify";
const MAX_INACTIVE_MS = 30 * 60 * 1000; // 30 minutos

let refreshPromise = null;

function resetInactivityTimer() {
    localStorage.setItem("ominhub_lastActivity", Date.now());
}

// 🔎 Get User From Session
function getSessionUser() {
    const raw = localStorage.getItem(SESSION_USER_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}
/*function getSessionUser() {
      return getStored("ominhub_user") || {};
    }*/

function saveSession(user, accessToken) {
    if (!user) return;

    console.log("Saving session...", user);

    // Guardamos usuario completo
    localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));

    // Guardamos access token
    if (accessToken) {
        localStorage.setItem(SESSION_ACCESS_KEY, accessToken);
    }
}

async function tryRefreshToken() {
    // Si ya hay un refresh en curso, espera ese mismo
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const res = await fetch(Config.API_BASE + "/api/auth/refresh", {
                method: "POST",
                credentials: "include"
            });

            if (!res.ok) {
                return false;
            }

            const data = await res.json();

            if (!data?.accessToken) {
                return false;
            }

            localStorage.setItem("ominhub_access", data.accessToken);

            console.log("✅ Token refreshed");
            return true;

        } catch {
            return false;
        } finally {
            // Siempre liberar el lock
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

// Retorna true si hay sesión
function isLogged() {
    return !!localStorage.getItem(SESSION_ACCESS_KEY);
}

function checkSessionInactivity() {

    const last = Number(
        localStorage.getItem("ominhub_lastActivity") || 0
    );

    if (!last) return;

    if (Date.now() - last > MAX_INACTIVE_MS) {

        console.warn(
            "Session expired due to inactivity."
        );

        clearSession();

        window.location.href =
            Router.resolveHref("login");
    }
}

function startSessionWatcher() {

    if (inactivityInterval) {
        return;
    }

    inactivityInterval = setInterval(
        checkSessionInactivity,
        60 * 1000
    );
}

// VERIFICATION STATUS — fuente única de la verdad
async function checkAndStoreVerificationStatus() {
    const token = localStorage.getItem("ominhub_access");

    if (!token) {
        console.warn("⚠ No access token — skipping verification check");
        localStorage.removeItem(OMINHUB_VERIFY_KEY);
        return null;
    }

    try {
        console.log("🔍 Checking verification status...");

        const verification = await Api.apiFetch("/api/verification/me", {
            method: "GET"
        });

        // apiFetch devuelve null si:
        // - 404
        // - 401 (y refresh falló)
        // - error de red

        if (!verification) {
            console.warn("ℹ No verification request found or unauthorized");

            const data = { state: "none" };
            localStorage.setItem(OMINHUB_VERIFY_KEY, JSON.stringify(data));
            return data;
        }

        const normalized = {
            id: verification.id,
            state: (verification.state || "").toLowerCase(),
            raw: verification,
        };

        localStorage.setItem(OMINHUB_VERIFY_KEY, JSON.stringify(normalized));

        console.log("✅ Verification stored:", normalized);
        return normalized;

    } catch (err) {
        console.error("🔥 Verification check failed:", err);
        return null;
    }
}

function getStoredVerification() {
    try {
        return JSON.parse(localStorage.getItem(OMINHUB_VERIFY_KEY));
    } catch {
        return null;
    }
}

// AUTO LOGIN — se ejecuta al abrir la página
// Usa refresh token vía cookie HttpOnly
async function autoLogin() {
    console.log("Attempting auto login..."); // Si ya hay sesión en localStorage → listo

    const savedUser = getSessionUser();
    if (savedUser) {
        console.log("User already logged from localStorage.");
        return true;
    } // Intentar renovar sesión llamando a la API

    const refreshUrl = Config.API_BASE + "/api/auth/refresh";

    try {
        const res = await fetch(refreshUrl, {
            method: "POST",
            credentials: "include", // Para enviar la cookie RefreshToken
        });

        if (!res.ok) {
            console.warn("Auto-login failed:", res.status);
            return false;
        }

        const data = await res.json();

        if (!data || !data.user) {
            console.warn("Auto-login response invalid");
            return false;
        }

        console.log("Auto-login success!", data.user);

        saveSession(data.user, data.accessToken);
        return true;
    } catch (err) {
        console.error("AutoLogin error:", err);
        return false;
    }
}

// LOGOUT — Limpia todo + destruye refresh token
async function logout() {
    console.log("Logging out..."); // Llamada al backend para invalidar refresh token

    try {
        await fetch(Config.API_BASE + "/api/auth/logout", {
            method: "POST",
            credentials: "include", // para que borre cookie HttpOnly
        });
    } catch {
        console.warn("Logout API failed (continuing cleanup)");
    }

    clearSession(); // Redirigir al login real
    Storage.clearAppCache()

    window.location.href = Router.resolveHref("login");

}

// 🔎 Get Access Token
function getAccessToken() {
    return localStorage.getItem(SESSION_ACCESS_KEY);
}

// CLEAR SESSION — limpia TODA la data de la app
function clearSession() {
    console.log("Clearing full session...");
    localStorage.removeItem(SESSION_USER_KEY);
    localStorage.removeItem(SESSION_ACCESS_KEY);
    localStorage.removeItem(OMINHUB_VERIFY_KEY);
}

export const Auth = {
    isLogged,
    saveSession,
    getSessionUser,
    tryRefreshToken,

    resetInactivityTimer,

    startSessionWatcher,

    checkAndStoreVerificationStatus,
    getStoredVerification,
    autoLogin,
    logout,
    getAccessToken,
    clearSession
};