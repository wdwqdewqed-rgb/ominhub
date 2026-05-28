import { Api } from "../../services/api.js";
import { Router } from "../../utils/router.js";

function renderInviteToBecomeCreator(main, user) {
  main.innerHTML = `
    <section class="join-creator-section">
      <div class="join-creator-hero">
        <h1 class="join-title">Become a Creator. Earn money from your content.</h1>
        <p class="join-subtitle">
          Publish your videos, grow your audience, and receive commissions based on views and engagement.
        </p>
        <div class="join-cta-row">
          <button id="become-creator-btn" class="join-btn primary">
            Become a Creator
          </button>
        </div>
      </div>

      <div class="join-benefits">
        <div class="benefit-card"><h3>Monetization</h3><p>Gain commissions for each video view.</p></div>
        <div class="benefit-card"><h3>Community</h3><p>Interact with creators and viewers.</p></div>
        <div class="benefit-card"><h3>Zero Fees</h3><p>No initial cost.</p></div>
        <div class="benefit-card"><h3>Freedom</h3><p>Standard or 18+ creator modes.</p></div>
      </div>

      <div class="join-extra">
        <h2>Creators dictate the platform.</h2>
        <p>Your videos are yours. Share, promote and earn.</p>
      </div>
    </section>
  `;

  // --- Aquí conectamos el botón al endpoint ---
  const btn = main.querySelector("#become-creator-btn");

  btn.onclick = async () => {
    try {
      const data = await Api.apiFetch(
        "/api/verification/create",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            RoleRequest: "Creator",
            RequestNotes: "User requested creator access via UI",
          })
        }
      );

      if (!data) {
        alert("Error creating request.");
        return;
      }

      console.log("✔ Request creada:", data);

      window.location.href = Router.resolveHref("creator-identity");

    } catch (err) {
      console.error("Error:", err);
      alert("Unexpected error.");
    }
  };
}

function renderVerificationRequired(main, user, verification) {
  main.innerHTML = `
      <section class="section verification-block">
        <h1 class="section-title">Verification required</h1>
        <p class="section-subtitle">
          Before you can use this tool, you must verify your identity. This step helps us protect creators, contributors, and the community.
        </p>

        <div class="creator-grid">
          <div class="form-card creator-main-card">
            <div class="creator-card-header">
              <div>
                <div class="badge badge-live">Account verification</div>
                <h1>Identity verification needed</h1>
                <p>
                  Your creator tools are temporarily restricted. Complete the identity check in your account
                  settings to unlock uploads and monetization features.
                </p>
              </div>

            </div>

            <div class="creator-two-col">
              <div class="creator-two-col-main">
                <div class="info-block">
                  <p>
                    Verifying your identity ensures a safe environment for viewers and creators. This
                    includes:
                  </p>
                  <ul class="info-list">
                    <li>Preventing fraudulent activity</li>
                    <li>Maintaining safety for you and your collaborators</li>
                    <li>Enabling age-sensitive content controls</li>
                  </ul>
                </div>
              </div>

              <div class="creator-two-col-side">
                <div class="form-card mini-card">
                  <h3>Why this is required</h3>
                  <p>
                    Verified accounts can upload videos, set content sensitivity, and manage monetization options.
                    Verification typically takes only a few minutes.
                  </p>
                </div>
              </div>
            </div>

            <div class="creator-actions-row">
              <button class="nav-button" type="button" id="go-verify-btn">
                Verify identity
              </button>
            </div>
            <div class="form-footer tiny">
              Your personal data is handled with care and will never be shared publicly.
            </div>
          </div>
        </div>
      </section>
    `;

  // -------------------------------------------
  // NAVEGACIÓN A "creator-identity"
  // -------------------------------------------
  const goVerifyBtn = document.getElementById("go-verify-btn");

  if (goVerifyBtn) {
    goVerifyBtn.addEventListener("click", () => {
      const identityLink = document.querySelector(
        '[data-nav="creator-identity"]'
      );

      if (identityLink) {
        identityLink.click(); // ← usa TU router real
      } else {
        console.warn("No se encontró el link creator-identity en el menú");
      }
    });
  }
}

function renderPublicCreatorJoin(main) {
  main.innerHTML = `
    <section class="join-creator-section">
      <div class="join-creator-hero">
        <h1 class="join-title">Become a Creator. Earn money from your content.</h1>
        <p class="join-subtitle">
          Publish your videos, grow your audience, and receive commissions based on views and engagement.
        </p>
        <div class="join-cta-row">
          <button id="creator-signup-btn" class="join-btn primary">Create your account</button>
          <button id="creator-login-btn" class="subscribe-login-btn">I already have an account</button>
        </div>
      </div>

      <div class="join-benefits">
        <div class="benefit-card"><h3>Monetization</h3><p>Gain commissions for each video view.</p></div>
        <div class="benefit-card"><h3>Community</h3><p>Interact with creators and viewers.</p></div>
        <div class="benefit-card"><h3>Zero Fees</h3><p>No initial cost.</p></div>
        <div class="benefit-card"><h3>Freedom</h3><p>Standard or 18+ creator modes.</p></div>
      </div>

      <div class="join-extra">
        <h2>Creators dictate the platform.</h2>
        <p>Your videos are yours. Share, promote and earn.</p>
      </div>
    </section>
  `;

  main.querySelector("#creator-signup-btn").onclick = () =>
    (window.location.href = Router.resolveHref("register"));
  main.querySelector("#creator-login-btn").onclick = () =>
    (window.location.href = Router.resolveHref("login"));
}

export const CreatorRenderer = {

  renderInviteToBecomeCreator,
  renderVerificationRequired,
  renderPublicCreatorJoin
}