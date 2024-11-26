// File: src/scripts/utils/idb-helper.js
const openDB = (name, version, upgradeCallback) => {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('Browser tidak mendukung IndexedDB'));
      return;
    }

    const request = window.indexedDB.open(name, version);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      upgradeCallback(event.target.result);
    };
  });
};

export { openDB };
