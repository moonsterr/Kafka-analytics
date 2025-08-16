import { consumerA, consumerB } from './kafka.js';
import client from './redis.js';
import getCurrentDate from '../services/utils.js';
export default async function startConsumers() {
  await consumerA.run({
    eachMessage: async ({ message }) => {
      console.log('View message received');
      const currentDate = getCurrentDate();
      const analytics = (await client.json.get('analytics')) || {
        views: {},
        clicks: {},
      };
      analytics.views[currentDate] = (analytics.views[currentDate] || 0) + 1;
      await client.json.set('analytics', '.', analytics);
    },
  });

  await consumerB.run({
    eachMessage: async ({ message }) => {
      console.log('Click message received');
      const currentDate = getCurrentDate();
      const analytics = (await client.json.get('analytics')) || {
        views: {},
        clicks: {},
      };
      analytics.clicks[currentDate] = (analytics.clicks[currentDate] || 0) + 1;
      await client.json.set('analytics', '.', analytics);
    },
  });
}
