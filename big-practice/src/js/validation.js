import { EMPTY_TEXT, MESSAGES } from './constant';

const EmailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

/**
  * Email check function is not valid
  *
  * @param {string} value - Comparative value
*/
const isValidEmail = (value) => (EmailRegex.test(value));

/**
 * Checks for an empty value
 *
 * @param {string} value - Comparative value
*/
const isEmpty = (value) => (!value);

/**
 * Validate form
 *
 * @param {object} data - The data object contains all the input elements
 * @param {object} config - Contains information for input checking
 */
const validateForm = (data, config) => {
  const formValidation = {
    isValid: true,
    errors: {
      warnMsg: EMPTY_TEXT,
      name: EMPTY_TEXT,
      director: EMPTY_TEXT,
      nation: EMPTY_TEXT,
    },
  };

  // Point to the key in the data object
  Object.keys(data).forEach((key) => {
    const value = data[key];

    // There is a key in the config
    if (config[key]) {
      config[key].forEach((validationType) => {
        // If there is an empty word, continue to consider the isEmpty condition
        if (validationType === 'empty' && isEmpty(value)) {
          formValidation.errors.warnMsg = MESSAGES.loginFormEmpty;
          formValidation.errors[key] = MESSAGES.empty;
          formValidation.isValid = false;
        }

        // If there is an format word, continue to consider the isValidEmail condition
        if (validationType === 'formatEmail' && !isValidEmail(value)) {
          formValidation.errors.warnMsg = MESSAGES.emailWrongFormat;
          formValidation.isValid = false;
        }
      });
    }
  });

  return formValidation;
};

export { isValidEmail, isEmpty, validateForm };
