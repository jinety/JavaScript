import { validateForm } from './validation';

// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const accountApi = 'http://localhost:3000/accounts';
const dashboardPage = 'dashboard.html';
const EmptyText = '';

// Messages
const MESSAGES = {
  loginFormEmpty: 'Please enter all email and password',
  emailWrongFormat: 'Email is invalid format',
  incorrectLoginAccount: 'Email or password is incorrect. Please re-enter',
  notAdminAccount: 'The account is not admin account, please re-enter',
};

/**
 * Handling account login to dashboard
 */
const login = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const url = `${accountApi}?email=${email}&password=${password}`;

  // Validate form data
  const isValidForm = validateForm(email, password);

  if (!isValidForm) {
    return;
  }

  // Check valid user
  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((userList) => {
      if (userList.length === 0) {
        warnMsg.innerHTML = MESSAGES.incorrectLoginAccount;
      }

      // Non-admin account
      if (!userList[0].isAdmin) {
        warnMsg.innerHTML = MESSAGES.notAdminAccount;
      } else {
        warnMsg.innerHTML = EmptyText;

        // Save username to localStorage
        localStorage.setItem('username', userList[0].email);

        // Switch to dashboard page
        window.location.href = dashboardPage;
      }
    });
};

loginBtn.addEventListener('click', () => {
  login();
});
