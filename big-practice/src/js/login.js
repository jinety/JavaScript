import { IsValidEmail, IsEmpty } from './validation';
import { EmptyText, Messages, AccountApi } from './constant';

// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const dashboardPage = 'dashboard.html';

const validateForm = (email, password) => {
  let isValid = false;

  // Email or password cannot be blank
  if (IsEmpty(email) || IsEmpty(password)) {
    warnMsg.innerHTML = Messages.loginFormEmpty;
  } else if (!IsValidEmail(email)) {
    // Email is not in the correct format
    warnMsg.innerHTML = Messages.emailWrongFormat;
  } else {
    isValid = true;
  }

  return isValid;
};

/**
 * Handling account login to dashboard
 */
const login = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const url = `${AccountApi}?email=${email}&password=${password}`;

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
        warnMsg.innerHTML = Messages.incorrectLoginAccount;
      }

      // Non-admin account
      if (!userList[0].isAdmin) {
        warnMsg.innerHTML = Messages.notAdminAccount;
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
