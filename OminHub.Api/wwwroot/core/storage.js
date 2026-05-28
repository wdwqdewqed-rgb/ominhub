function clearAppCache() {
    console.log("Clearing app cache...");
    localStorage.removeItem("ominhub_lang");
    localStorage.removeItem("ominhub_channel_cache");
    localStorage.removeItem("ominhub_creator_settings");
    localStorage.removeItem("ominhub_filters");
    localStorage.removeItem("ominhub_history");
    localStorage.removeItem("ominhub_ui_state");
    localStorage.removeItem("ominhub_favorites");
    localStorage.removeItem("ominhub_last_section");
    localStorage.removeItem("ominhub_temp_data");
    localStorage.removeItem("ominhub_access");
    localStorage.removeItem("ominhub_refresh_token");
}

function getStored(key, fallback) {
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch (e) {
        return fallback;
    }
}

function setStored(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { }
}

/*function setStored(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { }
}

function getStored(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}*/
export const Storage = {
    clearAppCache,
    getStored,
    setStored
}

