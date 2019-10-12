const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isEmailsValid = (emails) => {
  const inValidEmails = emails.filter((email) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)));

  if (inValidEmails.length > 0) {
    return false;
  }

  return true;
};

const toLowerCaseDomain = (email) => {
  const emailSplitted = email.split('@');

  emailSplitted[1] = emailSplitted[1].toLowerCase();
  return emailSplitted.join('@');
};

module.exports = {
  isEmailValid,
  isEmailsValid,
  toLowerCaseDomain,
};
