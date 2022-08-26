import { LOCAL_HOST } from './environment';

// Url API
const ACCOUNT_API = `${LOCAL_HOST}/accounts`;
const MOVIES_API = `${LOCAL_HOST}/movies`;
const EMPTY_TEXT = '';

// Messages
const MESSAGES = {
  emailWrongFormat: 'Email is invalid format',
  incorrectLoginAccount: 'Email or password is incorrect. Please re-enter',
  notAdminAccount: 'The account is not admin account, please re-enter',
  exist: 'Movie name already exists',
  empty: 'Value should be not empty',
};

export {
  EMPTY_TEXT, MESSAGES, ACCOUNT_API, MOVIES_API,
};
