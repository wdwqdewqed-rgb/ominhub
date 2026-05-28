import { Api } from "../../services/api.js";
import { Auth } from "../../core/auth.js";
import { Sidebar } from "../../components/sidebar.js";
import { Router } from "../../utils/router.js";

function renderLogin(main) {
    console.log("🔵 renderLogin START");

    main.innerHTML = `
      <section class="section">
        <div class="form-card form-card-large">
          <h1>Member login</h1>
          <p>Access your OMINHUB account</p>

          <div class="login-grid">
            <div class="login-column">
              <button class="nav-button nav-button-social" data-provider="google">
                Log in with Google
              </button>
              <p class="small">Google login is not implemented yet.</p>
            </div>

            <div class="login-column">
              <div class="form-field">
                <label for="lg-email">Email or Username</label>
                <input id="lg-email" type="text" placeholder="you@example.com" />
              </div>

              <div class="form-field">
                <label for="lg-pass">Password</label>
                <input id="lg-pass" type="password" placeholder="••••••••" />
              </div>

              <button class="nav-button nav-button-full" type="button" id="lg-btn">
                Log in
              </button>

              <div class="form-footer" id="lg-info"></div>
            </div>
          </div>
        </div>
      </section>
    `;

    console.log("🟢 Login HTML rendered");

    const btn = document.getElementById("lg-btn");
    const emailInput = document.getElementById("lg-email");
    const passInput = document.getElementById("lg-pass");
    const info = document.getElementById("lg-info");

    console.log("🟢 Elements found:", {
        btn,
        emailInput,
        passInput,
        info
    });

    btn.addEventListener("click", async () => {
        console.log("🟡 Login button clicked");

        const emailOrUser = emailInput.value.trim();
        const password = passInput.value.trim();

        console.log("🟡 User input:", {
            emailOrUser,
            passwordLength: password.length
        });

        if (!emailOrUser || !password) {
            console.warn("🔴 Missing credentials");

            info.textContent = "Please enter your email/username and password.";
            info.style.color = "red";
            return;
        }

        info.textContent = "Processing...";
        info.style.color = "#999";

        console.log("🟡 Starting login request...");

        try {
            const payload = {
                emailOrUsername: emailOrUser,
                password: password,
            };

            console.log("🟡 Login payload:", payload);

            const data = await Api.apiFetch(
                "/api/auth/login",
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(payload),
                },
                false // 👈 NO retry en login
            );

            console.log("🟢 Login response:", data);

            if (!data) {
                console.warn("🔴 No data returned from login");

                info.textContent = "Invalid credentials.";
                info.style.color = "red";
                return;
            }

            console.log("🟢 User object:", data.user);
            console.log("🟢 Access token exists:", !!data.accessToken);

            // === GUARDAMOS LA SESIÓN GLOBAL ===
            console.log("🟡 Saving session...");

            Auth.saveSession(data.user, data.accessToken);

            console.log("🟢 Session saved");

            console.log("🟡 Checking verification status...");

            const verification =
                await Auth.checkAndStoreVerificationStatus();

            console.log("🟢 Verification result:", verification);

            console.log("🟡 Updating sidebar creator section...");

            Sidebar.updateCreatorSection();

            console.log("🟢 Sidebar updated");

            const homeHref =
                Router.resolveHref("home");

            console.log("🟡 Redirecting to:", homeHref);

            // Redirige a la página principal
            window.location.href = homeHref;

        } catch (err) {
            console.error("🔴 LOGIN ERROR:", err);

            info.textContent = "Connection error.";
            info.style.color = "red";
        }
    });
}

export const Login = {
    renderLogin
}