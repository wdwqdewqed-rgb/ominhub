import { Ui } from '../core/ui.js';
import { Device } from '../core/device.js';
import { Auth } from '../core/auth.js';
import { Config } from '../core/config.js';

async function apiFetch(endpoint, options = {}, retry = true) {
    try {
        const accessToken = localStorage.getItem("ominhub_access");

        const defaultHeaders = {
            "X-Device-ID": Device.getOrCreateDeviceId(),
        };

        // 👇 SOLO setear Content-Type si NO es FormData
        if (!(options.body instanceof FormData)) {
            defaultHeaders["Content-Type"] = "application/json";
        }

        if (accessToken) {
            defaultHeaders["Authorization"] = `Bearer ${accessToken}`;
        }

        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...(options.headers || {})
            }
        };

        const res = await fetch(Config.API_BASE + endpoint, config);

        if (res.status === 401 && retry) {
            const refreshed = await Auth.tryRefreshToken();
            if (refreshed) {
                return apiFetch(endpoint, options, false);
            }
            logout();
            return null;
        }

        if (res.status === 403) {
            Ui.showNotification("No autorizado", "error");
            return null;
        }

        if (!res.ok) {
            Ui.showNotification("Error del servidor", "error");
            return null;
        }

        return await res.json();

    } catch (err) {
        if (err.name !== "AbortError") {
            Ui.showNotification("Error de conexión", "error");
        }
        return null;
    }
}

export const Api = {
    apiFetch
}