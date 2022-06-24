const getFormValue = () => {
  let form = document.getElementById("nameSubmissionForm");
  for(let i = 0; i < form.length; i++) {
   if(form.elements[i].value!='Submit') {  
      alert(form.elements[i].value);
    }  
  }
}

const formSubmit = document.querySelector('form');
formSubmit.addEventListener('submit', getFormValue);