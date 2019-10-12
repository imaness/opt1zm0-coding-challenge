const routes = require('express').Router();
const { addEmail, matchEmailsToEmailDataStore } = require('../../services/emails');


routes.put('/email', (req, res, next) => {
  const emailToAdd = req.body.email;

  addEmail(emailToAdd).then(() => {
    res.status(201);
    res.json({ success: true });
  }).catch((err) => {
    next(err);
  });
});

routes.get('/emails/', (req, res, next) => {
  const emailsToSearch = req.query.q.split(',');
  // eslint-disable-next-line no-bitwise
  const isSorted = ((`${req.query.sort}`).toLowerCase() === 'true');

  matchEmailsToEmailDataStore(emailsToSearch, isSorted).then((results) => {
    res.json(results);
  }).catch((err) => {
    next(err);
  });
});

module.exports = routes;
