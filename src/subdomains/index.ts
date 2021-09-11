import fs from 'fs/promises';
import Koa from 'koa';
import mount from 'koa-mount';
import Subdomain from 'koa-subdomain';
import path from 'path';

export const mountSubdomains = async (app: Koa): Promise<void> => {
  const router = new Subdomain();

  // Dynamically import subdomain logic from folders.
  for await (const dirent of await fs.opendir(__dirname)) {
    // All subdomain logic is inside folders in this directory.
    if (dirent.isFile()) continue;

    // Import the subdomain logic.
    const { initSubdomain } = await import(path.join(__dirname, dirent.name, './app.ts'));

    // Initiate the subdomain app.
    const app = await initSubdomain();

    // Mount the app.
    router.use(dirent.name === 'root' ? '' : dirent.name, mount('/', app));
  }

  // Apply the routes.
  app.use(router.routes());
};
