// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const accountApi = 'http://localhost:3000/accounts';
const EmailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const EmptyText = '';

// Messages
const MESSAGES = {
  loginFormEmpty: 'Please enter all email and password',
  emailWrongFormat: 'Email is invalid format',
  incorrectLoginForm: 'Email or password is incorrect. Please re-enter',
  notAdminAccount: 'The account is not admin account, please re-enter',
};

/**
 *  Checks for an empty value
 */
const isEmpty = (value) => (!value);

/**
 * Email check function is not valid
 *
 * @param {string} value - Comparative value
 */
const isValidEmail = (value) => (EmailRegex.test(value));

const validateForm = (email, password) => {
  isValidForm = false;

  // Email or password cannot be blank
  if (isEmpty(email) || isEmpty(password)) {
    warnMsg.innerHTML = MESSAGES.loginFormEmpty;
  } else if (!isValidEmail(email)) {
    // Email is not in the correct format
    warnMsg.innerHTML = MESSAGES.emailWrongFormat;
  } else {
    isValidForm = true;
  }

  return isValidForm;
};

const loginAdmin = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const url = `${accountApi}?email=${email}&password=${password}`;
  const isValidForm = validateForm(email, password);

  if (!isValidForm) {
    return;
  }

  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((userList) => {
      if (userList.length === 0) {
        warnMsg.innerHTML = MESSAGES.incorrectLoginForm;
      }

      // Non-admin account
      if (!userList[0].isAdmin) {
        warnMsg.innerHTML = MESSAGES.notAdminAccount;
      } else {
        warnMsg.innerHTML = EmptyText;
      }
    });
};

loginBtn.addEventListener('click', () => {
  loginAdmin();
});
