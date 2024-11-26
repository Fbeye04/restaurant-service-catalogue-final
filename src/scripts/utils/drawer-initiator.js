// File: src/scripts/utils/drawer-initiator.js
const DrawerInitiator = {
  init({ button, drawer }) {
    // menghapus parameter content karena tidak digunakan
    const menuToggle = button;
    const closeButton = drawer.querySelector('.close-button');
    const sidebar = drawer;

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    const toggleSidebar = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      sidebar.setAttribute('aria-hidden', isExpanded);
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = isExpanded ? 'auto' : 'hidden';

      if (!isExpanded) {
        closeButton.focus();
      }
    };

    menuToggle.addEventListener('click', toggleSidebar);
    closeButton.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleSidebar();
      }
    });

    sidebar.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusableElements = sidebar.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  },
};

export default DrawerInitiator;
