const { assert, expect } = require('chai');
const { createFakeEmailList } = require('../../populate_redis');
const {
  addEmail,
  getEmail,
  addEmails,
  matchEmailsToEmailDataStore,
} = require('../../services/emails');
const { toLowerCaseDomain } = require('../../utils/email');

describe('Check if Mocha test is working ', () => {
  const test = 1;
  it('Test Var Should be equal to 1', () => {
    assert.equal(test, 1, 'Must be one');
  });
});

describe('Email inserting and searching', async () => {
  before(async () => {
    await createFakeEmailList();
  });

  it('Check if email is valid before inserting', async () => {
    await addEmail('NotValidEmail@@mail.com').catch((err) => {
      expect(err.message).to.equal('Not valid email.');
    });
  });

  it('Check if emails is valid before inserting', async () => {
    await addEmails(['NotValidEmail@@mail.com', 'NotValidEmail@@mail.com']).catch((errMe) => {
      expect(errMe.message).to.equal('Not valid email/s.');
    });
  });

  it('Add single email', async () => {
    const testEmail = 'testEmail@gmail.com';

    const isSuccessInsert = await addEmail(testEmail);
    expect(isSuccessInsert).to.equal(true);

    const emailValue = await getEmail(testEmail);
    expect(emailValue).to.equal(testEmail);
  });

  it('Email domain should be case-insensitive', async () => {
    const testEmail = 'testEmail@GMAIL.com';

    const isSuccessInsert = await addEmail(testEmail);
    expect(isSuccessInsert).to.equal(true);

    const emailValue = await getEmail(testEmail);
    expect(emailValue).to.equal(toLowerCaseDomain(testEmail));
  });


  describe('Query email matching', async () => {
    let isSuccessInsert = false;
    const emailLookup = [{ email: 'testEmail_1@gmail.com', insert: true },
      { email: 'testEmail_2@gmail.com', insert: true },
      { email: 'testEmail_3@gmail.com', insert: false },
      { email: 'testEmail_4@gmail.com', insert: true },
      { email: 'testEmail_5@gmail.com', insert: false },
    ];
    const emailToInsert = emailLookup.reduce((a, email) => {
      if (email.insert) {
        a.push(email.email);
      }
      return a;
    }, []);

    const emailList = emailLookup.reduce((emails, email) => {
      emails.push(email.email);
      return emails;
    }, []);

    beforeEach(async () => {
      isSuccessInsert = await addEmails(emailToInsert);
    });

    it('Matching Emails from list', async () => {
      expect(isSuccessInsert).equal(true);

      const matchValues = await matchEmailsToEmailDataStore(emailList);

      expect(matchValues.length).to.equal(5);
      assert.typeOf(matchValues, 'array', 'Check Type');
      expect(matchValues).to.eql([
        { email: 'testEmail_1@gmail.com', found: true },
        { email: 'testEmail_2@gmail.com', found: true },
        { email: 'testEmail_3@gmail.com', found: false },
        { email: 'testEmail_4@gmail.com', found: true },
        { email: 'testEmail_5@gmail.com', found: false },
      ]);

      expect(emailList.length).to.equal(5);
    });

    it('Matching Emails from list with sorting', async () => {
      expect(isSuccessInsert).equal(true);

      const matchValues = await matchEmailsToEmailDataStore(emailList, true);

      expect(matchValues.length).to.equal(5);
      assert.typeOf(matchValues, 'array', 'Check Type');
      expect(matchValues).to.eql([
        { email: 'testEmail_1@gmail.com', found: true },
        { email: 'testEmail_2@gmail.com', found: true },
        { email: 'testEmail_4@gmail.com', found: true },
        { email: 'testEmail_3@gmail.com', found: false },
        { email: 'testEmail_5@gmail.com', found: false },
      ]);
    });
  });
});
