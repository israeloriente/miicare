/// <reference types="Cypress" />

import { defineConfig } from 'cypress';
import fs from 'fs-extra';

export default defineConfig({
  env: {
    BASE_URL: 'https://miicare.onrender.com/#/',
    AUTH_PATH: 'cypress/fixtures/global/auth.json',
    STORAGE_AUTH_TOKEN: 'isLoggedIn',
  },
  e2e: {
    viewportWidth: 414,
    viewportHeight: 896,
    retries: 1,
    baseUrl: 'https://miicare.onrender.com/#/',
    setupNodeEvents(on, config) {
      on('task', {
        checkFileExists(filePath) {
          if (!fs.existsSync(filePath)) fs.writeJsonSync(filePath, {});
          return null;
        },
      });
    },
  },
});
