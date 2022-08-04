const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const accountApi = 'http://localhost:3000/account';
const EmailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const EmptyText = '';

// Messages
const MESSAGES = {
  emptyFormat: 'Please enter all email and password',
  wrongFormat: 'Email entered in the wrong format. Please re-enter',
  wrongEmail: 'Login email is incorrect. Please re-enter',
  wrongPassword: 'Login password is incorrect. Please re-enter',
};

/**
 *  Checks for an empty value
 */
const isEmpty = (value) => {
  if (!value) {
    return true;
  }
};

/**
 * Email check function is not valid
 *
 * @param {string} value - Comparative value
 */
const isInvalidEmail = (value) => {
  if (!EmailRegex.test(value)) {
    return true;
  }

  return false;
};

const getDataAccount = () => {
  const options = {
    method: 'GET',
  };
  fetch(`${accountApi}/1`, options)
    .then((response) => response.json())
    .then((account) => {
      loginBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        isEmpty(email) || isEmpty(password) ? warnMsg.innerHTML = MESSAGES.emptyFormat
          : isInvalidEmail(email) ? warnMsg.innerHTML = MESSAGES.wrongFormat
            : account.email !== email ? warnMsg.innerHTML = MESSAGES.wrongEmail
              : account.email === email && account.password !== password ? warnMsg.innerHTML = MESSAGES.wrongPassword
                : warnMsg.innerHTML = EmptyText;
      });
    })
    .catch((error) => alert('Error! An error occurred.', error));
};

getDataAccount();
