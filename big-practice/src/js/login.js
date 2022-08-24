import { isValidEmail, isEmpty } from './validation';
import { EMPTY_TEXT, MESSAGES, ACCOUNT_API } from './constant';

// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const dashboardPage = 'dashboard.html';

const validateFormLogin = (data) => {
  let formValidation = {
    isValid: false,
    error: {},
  };

  if (isEmpty(data.email) || isEmpty(data.password)) {
    formValidation.error.warnMsg = MESSAGES.loginFormEmpty
  } else if (!isValidEmail(data.email)) {
    formValidation.error.warnMsg = MESSAGES.emailWrongFormat
  } else {
    formValidation.isValid = true;
  }

  return formValidation;
}

/**
 * Handling account login to dashboard
 */
const login = () => {
  const data = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  const validate = validateFormLogin(data);
  const url = `${ACCOUNT_API}?email=${data.email}&password=${data.password}`;
  console.log(validate)
  if (!validate.isValid) {
    warnMsg.innerHTML = validate.error.warnMsg;
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
