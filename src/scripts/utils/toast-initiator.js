// File: src/scripts/utils/toast-initiator.js
const ToastInitiator = {
  init() {
    this._createContainer();
  },

  _createContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    this._container = container;
  },

  show(message, type = 'error', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    this._container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => {
        this._container.removeChild(toast);
      }, 300);
    }, duration);
  },
};

export default ToastInitiator;
