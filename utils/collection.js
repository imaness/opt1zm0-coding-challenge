// eslint-disable-next-line no-nested-ternary
const sortBy = (key) => (a, b) => ((a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));

module.exports = {
  sortBy,
};
