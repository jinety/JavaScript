// Query elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');

// Regex for validating a value/text format
const REGEX = {
  alphabetRegex: /^[a-zA-Z]+ [a-zA-Z]+$/,
  emailRegex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// Messages
const MESSAGES = {
  empty: 'Value should be not empty',
  wrongFormat: 'Enter the wrong format. Please re-enter', 
};

const EmptyText = '';

// Name of the key in localStorage
const UsersKey = 'users';

 // Parse any JSON previously stored in users
 let existingEntries = JSON.parse(localStorage.getItem(UsersKey));
 
 // If existingEntries is null, array will be created
 if(existingEntries === null) {
  existingEntries = [];
}

/**
 * Display error message when user enters wrong input
 * 
 * @param {HtmlInputElement} input - Input element
 * @param {string} msg - Show message
 */
const showErrorMessage = (input, msg) => {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');
  errMessageEl.innerHTML = msg;
}

/**
 * Function that checks for an empty value
 * 
 * @param {string} value - Comparative value
 */
const isEmpty = (value) => {
  if (!value) {
    return true;
  } 

  return false;
}

/**
 * Invalid alphabet check function
 * 
 * @param {string} value - Comparative value
 */
const isInvalidAlphabet = (value) => {
  if (!REGEX.alphabetRegex.test(value)) {
    return true;
  }
    
  return false;
}

/**
 * Email check function is not valid
 * 
 * @param {string} value - Comparative value
 */
const isInvalidEmail = (value) => {
  if (!REGEX.emailRegex.test(value)) {
    return true;
  }

  return false;
}

/**
 * Check salary less than or equal to 0
 * 
 * @param {number} value - Salary value
 */
const isInvalidSalary = (value) => {
  if (value <= 0) {
    return true;
  } 

  return false;
}

/**
 * Validate form data
 */
const isvalidateForm = () => {
  const nameValue = fullNameInput.value;
  const emailValue = emailInput.value;
  const salaryValue = salaryInput.value;
  const cityValue = cityInput.value;
  let isvalid = true;

  // Full name is required
  if (isEmpty(nameValue)) {
    isvalid = false;
    showErrorMessage(fullNameInput, MESSAGES.empty);
  } else if (isInvalidAlphabet(nameValue)) {
    // Fullname is not in the correct format
    isvalid = false;
    showErrorMessage(fullNameInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, EmptyText);
  }
  
  // Email is required
  if (isEmpty(emailValue)) {
    isvalid = false;
    showErrorMessage(emailInput, MESSAGES.empty);
  } else if (isInvalidEmail(emailValue)) {
    // Email is not in the correct format
    isvalid = false;
    showErrorMessage(emailInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(emailInput, EmptyText);
  }

  // Salary is required
  if (isEmpty(salaryValue)) {
    isvalid = false;
    showErrorMessage(salaryInput, MESSAGES.empty);
  } else if (isInvalidSalary(salaryValue)) {
    // Salary less than or equal to 0
    isvalid = false;
    showErrorMessage(salaryInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(salaryInput, EmptyText);
  }

  // City is required
  if (isEmpty(cityValue)) {
    isvalid = false;
    showErrorMessage(cityInput, MESSAGES.empty);
  } else if (isInvalidAlphabet(cityValue)) {
    // City name is not in the correct format
    isvalid = false;
    showErrorMessage(cityInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(cityInput, EmptyText);
  }

  return isvalid;
}

/**
 * Function to save data to localStorage
 * 
 */
const saveData = () => {
  // Append values ​​to array 
  existingEntries.push({
    fullName: fullNameInput.value,
    email: emailInput.value,
    salary: salaryInput.value,
    city: cityInput.value
  });
  localStorage.setItem(UsersKey, JSON.stringify(existingEntries));
}

/**
 * Show user data in table
 */
const renderUserTable = () => {
  let tableTemplate = ``;
  existingEntries.forEach(element => {
    tableTemplate += ` 
      <tbody> 
        <tr>
          <td>${element.fullName}</td>
          <td>${element.email}</td>
          <td>${element.salary}</td>
          <td>${element.city}</td>
          <td>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>`;
  });
  document.getElementById('userTableBody').innerHTML = tableTemplate;    
}

renderUserTable();

/**
 * Submit form
 */
const submitForm = () => {
  // Validate form data
  if (isvalidateForm()) {
    // Save form data
    saveData();
    renderUserTable(); 
  }
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', submitForm);
