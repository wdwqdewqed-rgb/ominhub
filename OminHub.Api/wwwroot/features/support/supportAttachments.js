function setupAttachments() {

    const fileInput =
        document.getElementById('ticket-attachments');

    const previewContainer =
        document.getElementById('attachment-preview');

    if (!fileInput || !previewContainer) return;

    fileInput.addEventListener('change', function () {

        previewContainer.innerHTML = '';

        const files = Array.from(this.files);

        files.forEach((file, index) => {

            if (file.size > 10 * 1024 * 1024) {
                alert(`"${file.name}" exceeds 10MB.`);
                return;
            }

            const fileElement = document.createElement('div');

            fileElement.className = 'attachment-file';

            fileElement.innerHTML = `
        <span>${file.name}</span>
        <button
          type="button"
          class="remove-file"
          data-index="${index}">
          ×
        </button>
      `;

            previewContainer.appendChild(fileElement);
        });
    });
}

export const SupportAttachments = {
    setupAttachments
};