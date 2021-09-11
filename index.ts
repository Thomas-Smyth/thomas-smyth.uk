import { initApp } from './src/app';

const PORT = process.env.PORT || 3000;

(async (): Promise<void> => {
  // Initiate the app and subdomain apps.
  const app = await initApp();

  // Override the subdomain offset.
  app.subdomainOffset = 0;

  // Listen to requests.
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
})();
