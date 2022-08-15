// Url API
const accountApi = 'http://localhost:3000/accounts';
const moviesApi = 'http://localhost:3000/movies';
const EmptyText = '';

// Messages
const MESSAGES = {
  loginFormEmpty: 'Please enter all email and password',
  emailWrongFormat: 'Email is invalid format',
  incorrectLoginAccount: 'Email or password is incorrect. Please re-enter',
  notAdminAccount: 'The account is not admin account, please re-enter',
  exist: 'Movie name already exists',
  empty: 'Value should be not empty',
};

export { EmptyText };
export { MESSAGES };
export { moviesApi };
export { accountApi };
