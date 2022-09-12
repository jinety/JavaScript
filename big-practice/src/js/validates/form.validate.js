import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';
import { EMAIL_REGEX } from '../constants/regex.constant';

class FormValidate {
  /**
   * Email check function is not valid
   *
   * @param {string} value - Comparative value
   */
  isValidEmail(value) {
    if (EMAIL_REGEX.test(value)) {
      return false;
    }

    return true;

  }

  /**
   * Checks for an empty value
   *
   * @param {*} value
   */
  isEmpty(value) {
    if (!value) {
      return true;
    }

    return false;

  }

  /**
   * Validate form
   *
   * @param {object} data - The data object contains all the input elements
   * @param {object} config - EX: config = { name: ['empty'], password: ['passwordFormat'] }
   */
  validateForm(data, config) {
    const formValidation = {
      isValid: true,
      errors: {},
    };

    // Point to the key in the data object
    Object.keys(data).forEach((key) => {
      const value = data[key];

      // There is a key in the config
      if (config[key]) {
        config[key].forEach((validationType) => {
          // If there is an empty word, continue to consider the isEmpty condition
          if (validationType === 'empty' && this.isEmpty(value)) {
            formValidation.isValid = false;
            formValidation.errors[key] = MESSAGES.empty;

            return;

          }

          // If there is an format word, continue to consider the isValidEmail condition
          if (validationType === 'formatEmail' && this.isValidEmail(value)) {
            formValidation.isValid = true;
            formValidation.errors[key] = MESSAGES.emailWrongFormat;
          }

          formValidation.errors[key] = EMPTY_TEXT;
        });
      }
    });

    return formValidation;

  }
}

export const formValidate = new FormValidate();
