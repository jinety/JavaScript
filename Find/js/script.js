// Find the value of the first element with a value over 18
const ages = [3, 10, 18, 20];

const returnValue = ages.find(age => {
  return age > 18;
})

console.log(returnValue); // 20

// Find an object in an array by one of its properties
const inventory = [
  {name: 'apples', quantify: '2'},
  {name: 'bananas', quantify: '0'},
  {name: 'cherries', quantify: '6'}
]

const result = inventory.find(fruit => {
  return fruit.name === 'cherries';
})
console.log(result); // {name: 'cherries', quantify: '6'}
