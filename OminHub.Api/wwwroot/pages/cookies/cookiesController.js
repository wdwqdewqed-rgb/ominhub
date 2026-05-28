function setupCookieControls() {
  // Cookie control functionality
  const analyticsCheckbox = document.getElementById('analytics-cookies');
  const preferenceCheckbox = document.getElementById('preference-cookies');
  const advertisingCheckbox = document.getElementById('advertising-cookies');
  const acceptAllBtn = document.getElementById('accept-all-cookies');
  const savePrefsBtn = document.getElementById('save-cookie-prefs');
  const rejectAllBtn = document.getElementById('reject-all-cookies');
  const cookieStatus = document.getElementById('cookie-status');

  // Load saved preferences
  loadCookiePreferences();

  // Accept all cookies
  acceptAllBtn?.addEventListener('click', () => {
    if (analyticsCheckbox) analyticsCheckbox.checked = true;
    if (preferenceCheckbox) preferenceCheckbox.checked = true;
    if (advertisingCheckbox) advertisingCheckbox.checked = true;

    saveCookiePreferences();
    showCookieStatus('All cookies accepted successfully!', 'success');
  });

  // Reject all optional cookies
  rejectAllBtn?.addEventListener('click', () => {
    if (analyticsCheckbox) analyticsCheckbox.checked = false;
    if (preferenceCheckbox) preferenceCheckbox.checked = false;
    if (advertisingCheckbox) advertisingCheckbox.checked = false;

    saveCookiePreferences();
    showCookieStatus('Optional cookies rejected. Only essential cookies are enabled.', 'info');
  });

  // Save current preferences
  savePrefsBtn?.addEventListener('click', () => {
    saveCookiePreferences();
    showCookieStatus('Cookie preferences saved successfully!', 'success');
  });

  function saveCookiePreferences() {
    const preferences = {
      analytics: analyticsCheckbox?.checked || false,
      preferences: preferenceCheckbox?.checked || false,
      advertising: advertisingCheckbox?.checked || false,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('ominhub_cookie_prefs', JSON.stringify(preferences));
    document.cookie = `cookie_consent=true; path=/; max-age=${365 * 24 * 60 * 60}`; // 1 year
  }

  function loadCookiePreferences() {
    try {
      const saved = localStorage.getItem('ominhub_cookie_prefs');
      if (saved) {
        const prefs = JSON.parse(saved);
        if (analyticsCheckbox) analyticsCheckbox.checked = prefs.analytics;
        if (preferenceCheckbox) preferenceCheckbox.checked = prefs.preferences;
        if (advertisingCheckbox) advertisingCheckbox.checked = prefs.advertising;
      }
    } catch (e) {
      console.log('No saved cookie preferences found.');
    }
  }

  function showCookieStatus(message, type = 'success') {
    if (!cookieStatus) return;

    const icon = cookieStatus.querySelector('.cookie-status-icon');
    const text = cookieStatus.querySelector('.cookie-status-text');

    if (type === 'success') {
      icon.textContent = '✅';
      cookieStatus.style.backgroundColor = '#e8f5e9';
      cookieStatus.style.borderColor = '#4caf50';
    } else {
      icon.textContent = 'ℹ️';
      cookieStatus.style.backgroundColor = '#e3f2fd';
      cookieStatus.style.borderColor = '#2196f3';
    }

    text.textContent = message;
    cookieStatus.style.display = 'flex';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      const lang = Storage.getStored("ominhub_lang", "en");
      const defaultMessage = lang === "es"
        ? "Tus preferencias se guardarán para este navegador."
        : "Your preferences will be saved for this browser.";
      text.textContent = defaultMessage;
      icon.textContent = '✅';
      cookieStatus.style.backgroundColor = '';
      cookieStatus.style.borderColor = '';
    }, 5000);
  }
}

export const CookiesController = {
  setupCookieControls
}