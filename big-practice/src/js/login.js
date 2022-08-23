import { isValidEmail, isEmpty } from './validation';
import { EMPTY_TEXT, MESSAGES, ACCOUNT_API } from './constant';

// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const dashboardPage = 'dashboard.html';

/**
 * Is validate form
 *
 * @param {string} email Email entered from input
 * @param {string} password Password entered from input
 */
const isValidateForm = (email, password) => {
  let isValid = false;

  if (isEmpty(email) || isEmpty(password)) {
    isValid = false;
  } else if (!isValidEmail(email)) {
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid;
};

/**
 * Validate form
 *
 * @param {string} email Email entered from input
 * @param {string} password Password entered from input
 */
const validateForm = (email, password) => {
  // Email or password cannot be blank
  if (isEmpty(email) || isEmpty(password)) {
    warnMsg.innerHTML = MESSAGES.loginFormEmpty;
  } else if (!isValidEmail(email)) {
    // Email is not in the correct format
    warnMsg.innerHTML = MESSAGES.emailWrongFormat;
  }
};

/**
 * Handling account login to dashboard
 */
const login = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const url = `${ACCOUNT_API}?email=${email}&password=${password}`;

  if (!isValidateForm(email, password) && !validateForm(email, password)) {
    return;
  }

  // Check valid user
  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((userList) => {
      if (userList.length === 0) {
        warnMsg.innerHTML = MESSAGES.incorrectLoginAccount;
        return;
      }

      // Non-admin account
      if (!userList[0].isAdmin) {
        warnMsg.innerHTML = MESSAGES.notAdminAccount;
        return;
      }

      warnMsg.innerHTML = EMPTY_TEXT;

      // Save username to localStorage
      localStorage.setItem('username', userList[0].email);

      // Switch to dashboard page
      window.location.href = dashboardPage;
    });
};

// Click login button if successful will go to dashboard page
loginBtn.addEventListener('click', () => {
  login();
});

// Prevent returning to login page if there is data in localStorage
if (localStorage.getItem('username')) {
  window.location.href = dashboardPage;
  return;
}
