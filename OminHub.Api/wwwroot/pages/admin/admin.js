import { Demo } from "../../demo/demo.js";
import { Config } from "../../core/config.js";
import { Storage } from "../../core/storage.js";
import { Formatters } from "../../utils/formatters.js";

function renderAdmin(main) {
    const carouselImages = Storage.getStored(
        Demo.STORE_KEYS.carousel,
        Demo.DEFAULT_CAROUSEL_IMAGES
    );

    main.innerHTML = `
      <section class="section">
        <h1 class="section-title">Admin Dashboard</h1>
        <p class="section-subtitle">A compact control panel to moderate videos and manage the catalog (demo only).</p>

          <div class="admin-card">
            <h2>Video Management</h2>
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Video</th>
                  <th>User</th>
                  <th>Views</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${Demo.VIDEOS.slice(0, 5)
            .map(
                (video) => `
                  <tr>
                    <td>
                      <div class="video-info">
                        <img src="${video.thumb}" alt="${video.title}">
                        <strong>${video.title}</strong>
                      </div>
                    </td>
                    <td>${video.channelName}</td>
                    <td>${Formatters.formatViews(video.views)}</td>
                    <td>
                      <div class="verification-status" id="verification-status">
                        Status: <span class="status-pill status-pill-pending">Pending</span>
                      </div>



                      <button class="btn-sm btn-edit">Edit</button>
                      <button class="btn-sm btn-delete">Delete</button>
                    </td>
                  </tr>
                `
            )
            .join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="carousel-admin-section">
          <h2 class="section-title">Carousel Management</h2>
          <p class="section-subtitle">Manage the images displayed in the carousel across the platform.</p>
          
          <div class="carousel-admin-form">
            <div class="form-field">
              <label for="carousel-image-url">Add Image URL</label>
              <input type="text" id="carousel-image-url" placeholder="https://example.com/image.jpg">
            </div>
            <button class="nav-button" id="add-carousel-image">Add to Carousel</button>
          </div>
          
          <div class="carousel-admin-preview" id="carousel-admin-preview">
            ${carouselImages
            .map(
                (img, index) => `
              <div class="carousel-admin-item ${index === 0 ? "active" : ""}">
                <img src="${img}" alt="Carousel image ${index + 1}">
                <button class="carousel-admin-remove" data-index="${index}">×</button>
              </div>
            `
            )
            .join("")}
          </div>
        </div>
      </section>
    `;

    // Gestión del carrusel en admin
    const addBtn = document.getElementById("add-carousel-image");
    const urlInput = document.getElementById("carousel-image-url");
    const previewContainer = document.getElementById("carousel-admin-preview");

    if (addBtn && urlInput && previewContainer) {
        addBtn.addEventListener("click", () => {
            const url = urlInput.value.trim();
            if (!url) return;

            const currentImages = Storage.getStored(
                Demo.STORE_KEYS.carousel,
                Demo.DEFAULT_CAROUSEL_IMAGES
            );
            currentImages.push(url);
            Storage.setStored(STORE_KEYS.carousel, currentImages);

            // Actualizar vista
            const item = document.createElement("div");
            item.className = "carousel-admin-item";
            item.innerHTML = `
          <img src="${url}" alt="Carousel image">
          <button class="carousel-admin-remove" data-index="${currentImages.length - 1
                }">×</button>
        `;
            previewContainer.appendChild(item);

            urlInput.value = "";

            // Agregar evento al botón de eliminar
            item
                .querySelector(".carousel-admin-remove")
                .addEventListener("click", function () {
                    const index = parseInt(this.getAttribute("data-index"));
                    removeCarouselImage(index);
                });
        });
    }

    // Eventos para botones de eliminar existentes
    previewContainer
        .querySelectorAll(".carousel-admin-remove")
        .forEach((btn) => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                removeCarouselImage(index);
            });
        });

    function removeCarouselImage(index) {
        const currentImages = Storage.getStored(
            Demo.STORE_KEYS.carousel,
            Demo.DEFAULT_CAROUSEL_IMAGES
        );
        currentImages.splice(index, 1);
        Storage.setStored(STORE_KEYS.carousel, currentImages);
        window.location.reload();
    }
}

export const Admin = {
    renderAdmin
}