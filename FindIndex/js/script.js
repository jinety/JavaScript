// Find the first element with a value over 18
const ages = [3, 10, 18, 20];

const returnIndex = ages.findIndex(age => {
  return age > 18;
});
console.log(returnIndex); // 20

// Find the index of a prime number in an array
const isPrime = (element) => {
  if (element % 2 === 0 || element < 2) {
    return false;
  }
  for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
    if (element % factor === 0) {
      return false;
    }
  }
  return true
}

console.log([4,6,8,9,10].findIndex(isPrime)); // -1, not found
console.log([4,6,7,8,9].findIndex(isPrime)); // 2

const fruits = ['apple', 'banana', 'cantaloupe', 'blueberries', 'grapefruit'];

const index = fruits.findIndex(fruit => {
  return fruit === 'blueberries';
});
console.log(index); // 3
console.log(fruits[index]); // blueberries
