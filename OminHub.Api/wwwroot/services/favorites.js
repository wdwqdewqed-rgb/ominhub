import { Storage } from '../core/storage.js';

const STORE_KEY = "favorites";

function getFavorites() {
  return Storage.getStored(STORE_KEY, []);
}

function isFavorite(id) {
  return getFavorites().includes(String(id));
}

  function toggleFavorite(id, el) {
    let favs = Storage.getStored(STORE_KEYS.favorites, []);
    const sId = String(id);
    if (favs.includes(sId)) {
      favs = favs.filter((x) => x !== sId);
      if (el) el.textContent = "♡";
    } else {
      favs.push(sId);
      if (el) el.textContent = "♥";
    }
    setStored(STORE_KEYS.favorites, favs);
  }

export const Favorites = {
  getFavorites,
  isFavorite,
  toggleFavorite
};