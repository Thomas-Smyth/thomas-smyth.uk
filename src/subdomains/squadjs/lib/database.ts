import { MongoClient } from 'mongodb';

import { SQUADJS_MONGODB_DATABASE, SQUADJS_MONGODB_URI } from '../../../config';

if (!SQUADJS_MONGODB_URI) throw new Error('SQUADJS_MONGODB_URI is undefined.');
if (!SQUADJS_MONGODB_DATABASE) throw new Error('SQUADJS_MONGODB_DATABASE is undefined.');

export const client = new MongoClient(SQUADJS_MONGODB_URI);
export const database = client.db(SQUADJS_MONGODB_DATABASE);

export const SquadJSInstances = database.collection('SquadJSInstances');
