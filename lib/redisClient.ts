import { createClient } from 'redis';
require('dotenv').config()
const client = createClient({
  username: 'default',
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
  socket: {
      host: process.env.NEXT_PUBLIC_REDIS_HOST,
      port: 14429
  }
});

client.connect();

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;
