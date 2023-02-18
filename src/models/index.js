// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EventStatus = {
  "OPENED": "OPENED",
  "CLOSED": "CLOSED"
};

const { Event } = initSchema(schema);

export {
  Event,
  EventStatus
};