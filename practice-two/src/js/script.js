const getInfo = () => {
  //Query to id
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const salary = document.getElementById('salary');
  const city = document.getElementById('city');
  //From the initial id return the parent element then query the child class
  const errMsgFullName = fullName.parentElement.querySelector('.warn-msg');
  const errMsgEmail = email.parentElement.querySelector('.warn-msg');
  const errMsgSalary = salary.parentElement.querySelector('.warn-msg');
  const errMsgCity = city.parentElement.querySelector('.warn-msg');
  //Check the input condition
  const regalphabet = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //FULL NAME
  if(fullName.value === '') {
    errMsgFullName.innerHTML = 'Full name is empty';
  } else {
    if(regalphabet.test(fullName.value)) {
      errMsgFullName.innerHTML = '';
    } else {
      errMsgFullName.innerHTML = 'Enter the wrong format. Please re-enter';
    }
  }

  //EMAIL
  if(email.value === '') {
    errMsgEmail.innerHTML = 'Email is empty';
  } else {
    if(regEmail.test(email.value)) {
      errMsgEmail.innerHTML = '';
    } else {
      errMsgEmail.innerHTML = 'Enter the wrong format. Please re-enter';
    }
  }

  //SALARY
  if(Math.sign(salary.value) === '') {
    errMsgSalary.innerHTML = 'Salary is empty';
  } else {
    if(Math.sign(salary.value) > 0) {
      errMsgSalary.innerHTML = '';
    } else {
      errMsgSalary.innerHTML = 'Enter the wrong format. Please re-enter';
    }
  }

  //CITY
  if(city.value === '') {
    errMsgCity.innerHTML = 'City is empty';
  } else {
    if(regalphabet.test(city.value)) {
      errMsgCity.innerHTML = '';
    } else {
      errMsgCity.innerHTML = 'Enter the wrong format. Please re-enter';
    }
  }  
}

const submitbtn = document.getElementById('submitBtn');

submitbtn.addEventListener('click', getInfo);

