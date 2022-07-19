// Convert letters to lowercase
const arrString = ['abc', 'ABC', 'aBC'];

const newArr = arrString.map(item => {
  return item.toLowerCase();
});
console.log('newArr', newArr); // ['abc', 'abc', 'abc']

// Multiply all the values in an array with 10
const numbers = [4, 9, 16, 25];

const returnValue = numbers.map(num => {
  return num * 10
});
console.log(returnValue); // [40, 90, 160, 250]

// Get the full name for each person
const persons = [
  {firstname : "Malcom", lastname: "Reynolds"},
  {firstname : "Kaylee", lastname: "Frye"},
  {firstname : "Jayne", lastname: "Cobb"}
];

const getFullName = persons.map(item => {
  return[item.firstname, item.lastname].join('');
});
console.log(getFullName); //  ['MalcomReynolds', 'KayleeFrye', 'JayneCobb']
