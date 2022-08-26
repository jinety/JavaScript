import { validateForm } from './validation';
import { EMPTY_TEXT, MESSAGES, ACCOUNT_API } from './constant';
import { showErrorMessage } from './show-message'; 

// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const dashboardPage = 'dashboard.html';

/**
 * Handling account login to dashboard
 */
const login = () => {
  const data = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  const config = {
    email: ['empty', 'formatEmail'],
    password: ['empty']
  }
  const validate = validateForm(data, config);
  const url = `${ACCOUNT_API}?email=${data.email}&password=${data.password}`;

  if (!validate.isValid) {
    showErrorMessage(emailInput, validate.errors.email);
    showErrorMessage(passwordInput, validate.errors.password);
    return;
  }

  // Check valid user
  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((userList) => {
      if (userList.length === 0) {
        showErrorMessage(emailInput, MESSAGES.incorrectLoginAccount);
        showErrorMessage(passwordInput, MESSAGES.incorrectLoginAccount);
        return;
      }

      // Non-admin account
      if (!userList[0].isAdmin) {
        showErrorMessage(emailInput, MESSAGES.notAdminAccount);
        showErrorMessage(passwordInput, MESSAGES.notAdminAccount);
        return;
      }

      showErrorMessage(emailInput, EMPTY_TEXT);
      showErrorMessage(passwordInput, EMPTY_TEXT);

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
