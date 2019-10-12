const config = require('config');
const {
  isEmailValid,
  isEmailsValid,
} = require('../utils/email');
const {
  setKey,
  setKeys,
  getKey,
  getKeys,
} = require('../database/redis');
const { sortBy } = require('../utils/collection');

const collectionPrefix = config.get('Database.CollectionPrefixes.MasterEmail');

const addEmails = async (emailList) => {
  if (!isEmailsValid(emailList)) {
    throw new Error('Not valid email/s.');
  }

  const keysToInsert = {};

  emailList.map((email) => {
    keysToInsert[`${collectionPrefix}:0:${email}`] = email;
    return email;
  });

  await setKeys(keysToInsert);

  return true;
};

const addEmail = async (email) => {
  if (!isEmailValid(email)) {
    throw new Error('Not valid email.');
  }

  await setKey(`${collectionPrefix}:0:${email}`, email);

  return true;
};

const getEmail = async (email) => {
  if (!isEmailValid(email)) {
    return new Error('Not valid email.');
  }

  return getKey(`${collectionPrefix}:0:${email}`);
};

const getEmails = async (emails) => getKeys(emails);

const matchEmailsToEmailDataStore = async (emailList, sortByFoundAndEmailValue = false) => {
  const results = await getEmails(emailList.map((email) => `${collectionPrefix}:0:${email}`));

  const emailListResults = emailList.map((emailValue, i) => ({
    email: emailValue,
    found: (emailValue === results[i]),
  }));

  if (sortByFoundAndEmailValue) {
    const sortedByEmailFoundTrue = emailListResults.filter((email) => email.found).concat().sort(sortBy('email'));

    const sortedByEmailFoundFalse = emailListResults.filter((email) => !email.found).concat().sort(sortBy('email'));
    return [...sortedByEmailFoundTrue, ...sortedByEmailFoundFalse];
  }

  return emailListResults;
};

module.exports = {
  addEmail,
  addEmails,
  matchEmailsToEmailDataStore,
  getEmail,
};
