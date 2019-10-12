const {
  assert,
} = require('chai');
const app = require('../../app');

// eslint-disable-next-line import/order
const request = require('supertest').agent(app.listen());

describe('[Home] GET /', () => {
  it('should return 200 OK', (done) => {
    request
      .get('/')
      .expect(200, done);
  });
});

describe('Add Email to Data store', () => {
  describe('PUT /api/email', () => {
    const emailToInsert = 'testEmailAPI_1@gmail.com';
    it('should return 200 OK', (done) => {
      request
        .put('/api/email')
        .set('Accept', 'application/json')
        .send({
          email: emailToInsert,
        })
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('PUT /api/email', () => {
    const emailToInsert = 'testEmailAPI_2@gmail.com';
    it('should return 200 OK', (done) => {
      request
        .put('/api/email')
        .set('Accept', 'application/json')
        .send({
          email: emailToInsert,
        })
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('PUT /api/email', () => {
    const emailToInsert = 'testEmailAPI_4@gmail.com';
    it('should return 200 OK', (done) => {
      request
        .put('/api/email')
        .set('Accept', 'application/json')
        .send({
          email: emailToInsert,
        })
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });
});

describe('GET /api/emails?q={emails}', () => {
  const emailToSearch = ['testEmailAPI_4@gmail.com', 'testEmailAPI_1@gmail.com', 'testEmailAPI_2@gmail.com', 'testEmail_3_NotInList@gmail.com'];

  describe('Results without sorting', () => {
    it('should return 200 OK', (done) => {
      const queryString = `${emailToSearch.join(',')}`;
      request
        .get(`/api/emails?q=${encodeURIComponent(queryString)}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.deepEqual(res.body, [
            { email: 'testEmailAPI_4@gmail.com', found: true },
            { email: 'testEmailAPI_1@gmail.com', found: true },
            { email: 'testEmailAPI_2@gmail.com', found: true },
            { email: 'testEmail_3_NotInList@gmail.com', found: false }]);
          return done();
        });
    });
  });

  describe('Results with sorting', () => {
    it('should return 200 OK with correct sort match', (done) => {
      const queryString = `${emailToSearch.join(',')}`;
      request
        .get(`/api/emails?q=${encodeURIComponent(queryString)}&sort=true`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.deepEqual(res.body, [
            { email: 'testEmailAPI_1@gmail.com', found: true },
            { email: 'testEmailAPI_2@gmail.com', found: true },
            { email: 'testEmailAPI_4@gmail.com', found: true },
            { email: 'testEmail_3_NotInList@gmail.com', found: false }]);
          return done();
        });
    });
  });
});
