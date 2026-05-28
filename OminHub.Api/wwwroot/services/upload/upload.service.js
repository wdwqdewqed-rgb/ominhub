function initializeImageUpload(user) {
    const editAvatarBtn = document.getElementById('edit-avatar-btn');
    const editBannerBtn = document.getElementById('edit-banner-btn');
    const avatarInput = document.getElementById('upload-avatar-input');
    const bannerInput = document.getElementById('upload-banner-input');
    const confirmBtn = document.getElementById('confirm-upload');
    const cancelBtn = document.getElementById('cancel-upload');
    const closeBtn = document.getElementById('close-upload-modal');
    const modal = document.getElementById('upload-image-modal');
    const avatarOption = document.getElementById('upload-avatar-option');
    const bannerOption = document.getElementById('upload-banner-option');
    const previewContainer = document.getElementById('image-preview-container');
    const previewImg = document.getElementById('preview-image');

    let uploadType = null;
    let pendingDataUrl = null;

    function openModal(type) {
        uploadType = type;
        pendingDataUrl = null;
        previewContainer.style.display = 'none';
        document.getElementById('upload-options-list').style.display = 'flex';

        // Highlight the relevant option
        avatarOption.style.background = type === 'avatar' ? 'var(--accent-dim)' : '';
        avatarOption.style.borderColor = type === 'avatar' ? 'var(--accent)' : '';
        bannerOption.style.background = type === 'banner' ? 'var(--accent-dim)' : '';
        bannerOption.style.borderColor = type === 'banner' ? 'var(--accent)' : '';

        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        pendingDataUrl = null;
        uploadType = null;
        previewContainer.style.display = 'none';
        document.getElementById('upload-options-list').style.display = 'flex';
        if (avatarInput) avatarInput.value = '';
        if (bannerInput) bannerInput.value = '';
    }

    function handleFile(file, type) {
        if (!file || !file.type.startsWith('image/')) {
            Ui.showNotification('Por favor selecciona una imagen válida', 'error');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            Ui.showNotification('La imagen es muy grande (máximo 5 MB)', 'error');
            return;
        }

        uploadType = type;
        const reader = new FileReader();
        reader.onload = e => {
            pendingDataUrl = e.target.result;
            previewImg.src = pendingDataUrl;
            document.getElementById('upload-options-list').style.display = 'none';
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    if (editAvatarBtn) editAvatarBtn.addEventListener('click', () => openModal('avatar'));
    if (editBannerBtn) editBannerBtn.addEventListener('click', () => openModal('banner'));

    if (avatarOption) {
        avatarOption.addEventListener('click', () => {
            uploadType = 'avatar';
            avatarInput.click();
        });
    }

    if (bannerOption) {
        bannerOption.addEventListener('click', () => {
            uploadType = 'banner';
            bannerInput.click();
        });
    }

    if (avatarInput) avatarInput.addEventListener('change', e => handleFile(e.target.files[0], 'avatar'));
    if (bannerInput) bannerInput.addEventListener('change', e => handleFile(e.target.files[0], 'banner'));

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (!pendingDataUrl || !uploadType) {
                Ui.showNotification('Selecciona una imagen primero', 'error');
                return;
            }

            if (uploadType === 'avatar') {
                document.getElementById('profile-avatar').src = pendingDataUrl;
                savedUser.avatar = pendingDataUrl;
                Ui.showNotification('Foto de perfil actualizada ✅', 'success');
            } else if (uploadType === 'banner') {
                const banner = document.getElementById('profile-banner-image');
                banner.style.backgroundImage = `url('${pendingDataUrl}')`;
                banner.style.backgroundSize = 'cover';
                banner.style.backgroundPosition = 'center';
                savedUser.cover = pendingDataUrl;
                Ui.showNotification('Banner actualizado ✅', 'success');
            }

            closeModal();
        });
    }

    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

export const UploadService = {
    initializeImageUpload
}