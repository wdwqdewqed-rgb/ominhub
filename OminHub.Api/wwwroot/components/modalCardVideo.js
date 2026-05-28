import { DemoProfile } from "../demo/profile.js";

function openVideoModal(videoId, initialTab = 'stats') {
    const v = DemoProfile._videoStore.find(x => x.id === videoId);
    if (!v) return;
    const modal = document.getElementById('video-detail-modal');
    if (!modal) return;

    // Populate data
    document.getElementById('video-modal-title').textContent = v.title;
    const thumb = document.getElementById('video-modal-thumb');
    const idx = DemoProfile._videoStore.indexOf(v);
    thumb.innerHTML = `<span style="font-size:48px;">${_emojis[idx % _emojis.length]}</span>`;
    thumb.style.background = _colors[idx % _colors.length];

    document.getElementById('vstat-views').textContent = v.views;
    document.getElementById('vstat-likes').textContent = v.likes;
    document.getElementById('vstat-comments').textContent = v.comments;
    document.getElementById('vstat-duration').textContent = v.duration;
    document.getElementById('vstat-date').textContent = v.date;

    document.getElementById('vedit-title').value = v.title;
    document.getElementById('vedit-desc').value = v.desc || '';
    document.getElementById('vedit-badge').value = v.badge || '';
    document.getElementById('vedit-info').textContent = '';

    document.getElementById('vdelete-title-confirm').textContent = '"' + v.title + '"';

    // Switch to requested tab
    switchVideoModalTab(initialTab);

    // Store current video id
    modal.dataset.currentVid = videoId;
    modal.style.display = 'flex';
}

function switchVideoModalTab(tabId) {
    document.querySelectorAll('.video-modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.video-modal-panel').forEach(p => p.classList.remove('active'));
    const tab = document.querySelector(`.video-modal-tab[data-vtab="${tabId}"]`);
    const panel = document.getElementById('vtab-' + tabId);
    if (tab) tab.classList.add('active');
    if (panel) panel.classList.add('active');
}

function initVideoModal() {
    const modal = document.getElementById('video-detail-modal');
    if (!modal || modal._initialized) return;
    modal._initialized = true;

    // Close
    document.getElementById('close-video-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Tab switching
    document.querySelectorAll('.video-modal-tab').forEach(tab => {
        tab.addEventListener('click', () => switchVideoModalTab(tab.dataset.vtab));
    });

    // Save edits
    document.getElementById('vedit-save-btn').addEventListener('click', () => {
        const vid = parseInt(modal.dataset.currentVid);
        const v = DemoProfile._videoStore.find(x => x.id === vid);
        if (!v) return;

        v.title = document.getElementById('vedit-title').value.trim() || v.title;
        v.desc = document.getElementById('vedit-desc').value.trim();
        v.badge = document.getElementById('vedit-badge').value.trim() || v.badge;

        Storage.setStored('ominhub_videos', DemoProfile._videoStore);
        renderVideoGrid(DemoProfile._videoStore);

        document.getElementById('video-modal-title').textContent = v.title;
        document.getElementById('vdelete-title-confirm').textContent = '"' + v.title + '"';

        const info = document.getElementById('vedit-info');
        info.textContent = '✅ Guardado';
        info.style.color = '#4ade80';
        setTimeout(() => { info.textContent = ''; }, 2500);

        Ui.showNotification('Video actualizado ✅', 'success');
    });

    // Delete
    document.getElementById('vdelete-confirm-btn').addEventListener('click', () => {
        const vid = parseInt(modal.dataset.currentVid);
        DemoProfile._videoStore = DemoProfile._videoStore.filter(x => x.id !== vid);
        Storage.setStored('ominhub_videos', DemoProfile._videoStore);
        renderVideoGrid(DemoProfile._videoStore);
        modal.style.display = 'none';
        Ui.showNotification('Video eliminado', 'info');
    });
}

export const ModalCardVideo = {
    openVideoModal,
    switchVideoModalTab,
    initVideoModal
}