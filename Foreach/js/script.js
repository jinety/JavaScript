// Compute the sum
let sum = 0;
const numbers = [65, 44, 12, 4];
numbers.forEach(myFunction);

document.getElementById('demo').innerHTML = sum;

function myFunction(item) {
  sum += item;
}

// Convert letters to lowercase
const arrString = ['abc', 'ABC', 'aBC'];

const newArr = [];
arrString.forEach(item => {
  item = item.toLowerCase();
  newArr.push(item);
});
console.log('newArr', newArr);

// Multiply each element
const number = [65, 44, 12, 4];

const newArr2 = [];
number.forEach(item => {
  item = item * 10;
  newArr2.push(item);
});
console.log(newArr2);
