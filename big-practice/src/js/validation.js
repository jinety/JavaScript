const warnMsg = document.getElementById('warnMsg');
const EmailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

// Messages
const MESSAGES = {
  loginFormEmpty: 'Please enter all email and password',
  emailWrongFormat: 'Email is invalid format',
  incorrectLoginAccount: 'Email or password is incorrect. Please re-enter',
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

/**
  * Validate form data
*/
export default function validateForm(email, password) {
  let isValidForm = false;

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
}

// export default validateForm;
