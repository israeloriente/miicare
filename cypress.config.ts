/// <reference types="Cypress" />

import { defineConfig } from 'cypress';
import fs from 'fs-extra';

export default defineConfig({
  env: {
    BASE_URL: 'http://localhost:8100/',
    AUTH_PATH: 'cypress/fixtures/global/auth.json',
    STORAGE_AUTH_TOKEN: 'isLoggedIn',
  },
  e2e: {
    viewportWidth: 414,
    viewportHeight: 896,
    retries: 1,
    baseUrl: 'http://localhost:8100/',
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
