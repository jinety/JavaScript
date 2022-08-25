import { isValidEmail, isEmpty } from './validation';
import { EMPTY_TEXT, MESSAGES, ACCOUNT_API } from './constant';

// Query elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const warnMsg = document.getElementById('warnMsg');
const loginBtn = document.getElementById('loginBtn');
const dashboardPage = 'dashboard.html';

/**
 * Validate form login
 * 
 * @param {object} data - The data object contains all the input elements
 */
const validateFormLogin = (data, config) => {
  let formValidation = {
    isValid: true,
    errors: {
      warnMsg: EMPTY_TEXT,
    },
  };
  // Point to the key in the data object
  Object.keys(data).forEach((key) => {
    const value = data[key];

    // Config.email
    if(config[key]) {
      // Loop to get to the objects in the array
      config[key].forEach((corroborationType) => {
        // If there is an empty word, continue to consider the isEmpty condition
        if (corroborationType === 'empty' && isEmpty(value)) {
          formValidation.errors.warnMsg = MESSAGES.loginFormEmpty;
          formValidation.isValid = false;
        } 
        
        // If there is an format word, continue to consider the isValidEmail condition
        if (corroborationType === 'formatEmail' && !isValidEmail(value)) {
          formValidation.errors.warnMsg = MESSAGES.emailWrongFormat;
          formValidation.isValid = false;
        }
      })
    }
  })

  return formValidation;
};

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
  const validate = validateFormLogin(data, config);
  const url = `${ACCOUNT_API}?email=${data.email}&password=${data.password}`;
  console.log(validate);
  if (!validate.isValid) {
    warnMsg.innerHTML = validate.errors.warnMsg;
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
