import { createClient } from 'redis';
import { redisConfig } from '../config/redisConfig.js';

const client = createClient(redisConfig);

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export default client;
