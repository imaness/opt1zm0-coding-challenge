const { seed, internet } = require('faker');
const { writeFileSync } = require('fs');
const config = require('config');
const { setKeys } = require('./database/redis');
const { toLowerCaseDomain } = require('./utils/email');

const emailPrefixKey = config.get('Database.CollectionPrefixes.MasterEmail');
const configSeedSize = config.get('Test.Data.EMail.SeedNumber');


const createFakeEmailList = async () => {
  const MapEmails = new Map();

  seed(configSeedSize);

  // Need to count the size because faker returns duplicate emails sometimes
  while (MapEmails.size < 50000) {
    const email = internet.email();
    MapEmails.set(`${emailPrefixKey}:0:${toLowerCaseDomain(email)}`, toLowerCaseDomain(email));
  }

  writeFileSync('test/stubs/emails.txt', Array.from(MapEmails.values()).join('\n'));
  await setKeys(MapEmails);
};

module.exports = {
  createFakeEmailList,
};
