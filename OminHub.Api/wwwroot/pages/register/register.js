import { Api } from "../../services/api.js";
import { Auth } from "../../core/auth.js";
import { Sidebar } from "../../components/sidebar.js";

function renderRegister(main) {
    main.innerHTML = [
        '<section class="section">',
        '  <div class="form-card form-card-large">',
        "    <h1>Create account</h1>",
        "    <p>Join OMINHUB and start uploading your videos.</p>",
        '    <div class="form-field">',
        '      <label for="rg-name">Username</label>',
        '      <input id="rg-name" type="text" placeholder="Your username" />',
        "    </div>",
        '    <div class="form-field">',
        '      <label for="rg-email">Email</label>',
        '      <input id="rg-email" type="email" placeholder="you@example.com" />',
        "    </div>",
        '    <div class="form-field">',
        '      <label for="rg-pass">Password</label>',
        '      <input id="rg-pass" type="password" placeholder="••••••••" />',
        "    </div>",
        '    <div class="form-field">',
        '      <label for="rg-role">Account type</label>',
        '      <select id="rg-role">',
        '        <option value="Viewer">Viewer</option>',
        '        <option value="Creator">Creator</option>',
        '        <option value="Studio">Studio</option>',
        "      </select>",
        "    </div>",
        '    <button class="nav-button" type="button" id="rg-btn">Create account</button>',
        '    <div class="form-footer" id="rg-info"></div>',
        "  </div>",
        "</section>",
    ].join("");

    const btn = document.getElementById("rg-btn");
    const nameInput = document.getElementById("rg-name");
    const emailInput = document.getElementById("rg-email");
    const passInput = document.getElementById("rg-pass");
    const roleInput = document.getElementById("rg-role");
    const info = document.getElementById("rg-info");

    btn.addEventListener("click", async () => {
        const username = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passInput.value.trim();
        const role = roleInput.value;

        if (!username || !email || !password) {
            info.textContent = "All fields are required.";
            info.style.color = "red";
            return;
        }

        info.textContent = "Processing...";
        info.style.color = "#888";

        try {
            const data = await Api.apiFetch('/api/auth/register', {
                method: "POST",
                body: JSON.stringify({ username, email, password, role }),
            });

            // Si apiFetch devuelve null → error ya fue manejado
            if (!data) {
                info.textContent = "Unexpected error";
                info.style.color = "red";
                return;
            }

            // 🔵 Guardar sesión
            Auth.saveSession(data.user, data.accessToken);

            await Auth.checkAndStoreVerificationStatus();
            Sidebar.updateCreatorSection();

            window.location.href = Router.resolveHref("home");

        } catch (err) {
            console.error(err);
            info.textContent = "Error connecting to server.";
            info.style.color = "red";
        }
    });
}

export const Register = {
    renderRegister
}