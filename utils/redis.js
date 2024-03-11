import { createClient } from 'redis';

/**
 * RedisClient
 * @class
 * @description RedisClient - Redis client class
 * @constructor - Create a new Redis client
 * @example
 * const redisClient = new RedisClient();
 * @returns {Object} - Redis client object
 */

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client error: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();

export default redisClient;
