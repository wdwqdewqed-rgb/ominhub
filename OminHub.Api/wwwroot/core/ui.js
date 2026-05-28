function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification.temporary');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification temporary ${type}`;

  const icon = type === 'success' ? '✅' :
    type === 'error' ? '❌' :
      type === 'warning' ? '⚠️' : 'ℹ️';

  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">${icon}</div>
      <div class="notification-text">
        <p>${message}</p>
      </div>
      <button class="notification-close">&times;</button>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  const closeBtn = notification.querySelector('.notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });
  }

  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}
/* function showNotification(message, type = 'info') {
      document.querySelectorAll('.notification.temporary').forEach(n => n.remove());

      const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
      const n = document.createElement('div');
      n.className = `notification temporary ${type}`;
      n.innerHTML = `
        <div class="notification-content">
          <div class="notification-icon">${icons[type] || 'ℹ️'}</div>
          <div class="notification-text"><p>${message}</p></div>
          <button class="notification-close">&times;</button>
        </div>`;
      document.body.appendChild(n);
      requestAnimationFrame(() => n.classList.add('show'));

      n.querySelector('.notification-close').addEventListener('click', () => {
        n.classList.remove('show');
        setTimeout(() => n.remove(), 300);
      });

      setTimeout(() => {
        if (n.parentNode) { n.classList.remove('show'); setTimeout(() => n.remove(), 300); }
      }, 5000);
    }
}*/

export const Ui = {
  showNotification
}