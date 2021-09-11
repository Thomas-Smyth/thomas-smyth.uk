import Router from '@koa/router';

import { live } from './live';
import { ping } from './ping';

export const router = new Router();

router.get('/live', live);
router.post('/ping', ping);
