const a = document.querySelector('#demo');

// Change word with textContent
a.textContent = 'HELLO';

// Change word with inerHTML
a.innerHTML = 'HELLO WORLD';

// Change color
a.style.color = 'red';

// add class
a.className = 'demo';

// Adds one or more class values
a.classList.add('demo1');

// Replace an existing class value with a new class value
a.classList.replace('demo1', 'demo-1');

// Remove a class value
a.classList.remove('demo-1');

a.parentElement.querySelector('.demo').innerHTML = 'VAN HOA';


const b = document.querySelectorAll('.demo-class');
b.forEach(Element => {
    Element.innerHTML = 'HOA NGUYEN';
})