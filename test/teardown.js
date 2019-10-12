const { disconnect } = require('../database/redis');

after(async () => {
  disconnect();
});
