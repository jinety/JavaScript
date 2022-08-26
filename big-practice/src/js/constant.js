// Url API
const ACCOUNT_API = 'http://localhost:3000/accounts';
const MOVIES_API = 'http://localhost:3000/movies';
const EMPTY_TEXT = '';

// Messages
const MESSAGES = {
  loginFormEmpty: 'Please enter all email and password',
  emailWrongFormat: 'Email is invalid format',
  incorrectLoginAccount: 'Email or password is incorrect. Please re-enter',
  notAdminAccount: 'The account is not admin account, please re-enter',
  exist: 'Movie name already exists',
  empty: 'Value should be not empty',
};

export {
  EMPTY_TEXT, MESSAGES, ACCOUNT_API, MOVIES_API,
};
