const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isEmailsValid = (emails) => {
  const inValidEmails = emails.filter((email) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)));

  if (inValidEmails.length > 0) {
    return false;
  }

  return true;
};

module.exports = {
  isEmailValid,
  isEmailsValid,
};
