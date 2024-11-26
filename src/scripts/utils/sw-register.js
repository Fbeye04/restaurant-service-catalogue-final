// File: src/scripts/utils/sw-register.js
import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    const wb = new Workbox('/sw.bundle.js');
    await wb.register();
  } catch {
    // Silent error handling
  }
};

export default swRegister;
