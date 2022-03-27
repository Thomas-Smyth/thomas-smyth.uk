import Koa from 'koa';
import sanitize from 'mongo-sanitize';

import { SquadJSInstances } from '../../lib/database';

export const ping = async (ctx: Koa.BaseContext): Promise<void> => {
  // Get mandatory variables.
  const name = ctx.request.body.server?.name;

  // Check the mandatory variables are present.
  if (!name) {
    ctx.body = { error: 'Invalid ping.' };
    return;
  }

  // Save instance information.
  await SquadJSInstances.updateOne(
    { name: sanitize(name) },
    {
      $set: {
        host: sanitize(ctx.request.body.server?.host),
        queryPort: sanitize(ctx.request.body.server?.queryPort),
        playerCount: sanitize(ctx.request.body.server?.playerCount),
        version: sanitize(ctx.request.body.squadjs?.version),
        logReaderMode: sanitize(ctx.request.body.squadjs?.logReaderMode),
        plugins: sanitize(ctx.request.body.squadjs?.plugins),
        lastPinged: new Date(),
      },
      $setOnInsert: {
        name: sanitize(name),
        firstPinged: new Date(),
      },
    },
    {
      upsert: true,
    }
  );

  // Respond
  ctx.body = { message: 'Pong.' };
};
