import { Storage } from "../../core/storage.js";
import { Router } from "../../utils/router.js";
import { Auth } from "../../core/auth.js";

function ensureCreatorUser(main) {

  const user =
    Storage.getStored(Auth.SESSION_USER_KEY, null);

  if (!user) {

    main.innerHTML = `
      <section class="section">
        <div class="empty-state">
          Please
          <a data-nav="login">log in</a>
          to access the creator tools.
        </div>
      </section>
    `;

    Router.wireNavigation();

    return null;
  }

  return user;
}

export const CreatorGuard = {
  ensureCreatorUser
};