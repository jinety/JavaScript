// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const accountApi = 'http://localhost:3000/account';
const EmailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const EmptyText = '';

// Messages
const MESSAGES = {
  emailPasswordEmpty: 'Please enter all email and password',
  emailWrongFormat: 'Email entered in the wrong format. Please re-enter',
  errorMessage: 'Email or password is incorrect. Please re-enter',
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
const isValidEmail = (value) => {
  !!EmailRegex.test(value);
};

/**
 * Get admin account from json server
 */
const getDataAccount = () => {
  const urlAdmin = `${accountApi}?email=vhoa1000@gmail.com&password=123456`;
  const options = {
    method: 'GET',
  };

  fetch(urlAdmin, options)
    .then((response) => response.json())
    .then((account) => {
      loginBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        // Email or password cannot be blank
        if (isEmpty(email) || isEmpty(password)) {
          warnMsg.innerHTML = MESSAGES.emailPasswordEmpty;
        } else if (isValidEmail(email)) {
          // Email is not in the correct format
          warnMsg.innerHTML = MESSAGES.emailWrongFormat;
        } else if (account[0].email !== email || account[0].password !== password) {
          // Email and password do not match database
          warnMsg.innerHTML = MESSAGES.errorMessage;
        } else {
          warnMsg.innerHTML = EmptyText;
        }
      });
    })
    .catch((error) => alert('Error! An error occurred.', error));
};

getDataAccount();
