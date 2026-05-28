import { Storage } from "../../core/storage.js";
import { Demo } from "../../demo/demo.js";


function pushHistory(videoId) {
    const history = Storage.getStored(Demo.STORE_KEYS.history, []);
    const now = new Date().toISOString();
    const filtered = history.filter((h) => h.id !== String(videoId));
    filtered.unshift({ id: String(videoId), at: now });
    const trimmed = filtered.slice(0, 40);
    Storage.setStored(Demo.STORE_KEYS.history, trimmed);
}

export const History = {
    pushHistory
}