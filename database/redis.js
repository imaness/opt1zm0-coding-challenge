const Redis = require('ioredis');
const config = require('config');

const client = new Redis(config.get('Database.Redis.Config'));

module.exports = {
  setKeys: async (arrayObjects) => client.mset(arrayObjects),
  getKeys: async (arrayObjects) => client.mget(arrayObjects),
  getKey: async (key) => client.get(key),
  setKey: async (key, value) => client.set(key, value),
  disconnect: async () => client.disconnect(),
};
