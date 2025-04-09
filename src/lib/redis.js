// lib/redis.js

import redis from 'redis';

// Create a Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL,  // Set this in your .env.local
});

// Handle Redis errors
client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Connect to Redis
client.connect();

export default client;
