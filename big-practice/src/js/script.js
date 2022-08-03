const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const emptyText = '';

// Messages
const MESSAGES = {
  empty: 'Email or password is blank. Please enter in full',
  wrongFormat: 'Wrong email or password. Please re-enter',
};

/**
 *  Checks for an empty value
 */
const isEmpty = (value) => {
  if (!value) {
    return true;
  }
};

loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (isEmpty(email) || isEmpty(password)) {
    warnMsg.innerHTML = MESSAGES.empty;
  } else if (email === 'admin' && password === 'admin123') {
    warnMsg.innerHTML = emptyText;
  } else {
    warnMsg.innerHTML = MESSAGES.wrongFormat;
  }
});
