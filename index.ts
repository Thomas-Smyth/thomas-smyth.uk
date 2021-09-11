import { initApp } from './src/app';

const SUBDOMAIN_OFFSET = process.env.SUBDOMAIN_OFFSET || 1;
const PORT = process.env.PORT || 3000;

(async (): Promise<void> => {
  // Initiate the app and subdomain apps.
  const app = await initApp();

  // Override the subdomain offset limit if need be.
  app.subdomainOffset = SUBDOMAIN_OFFSET;

  // Listen to requests.
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
})();
