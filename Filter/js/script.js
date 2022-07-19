// Return an array of all values in ages[] that are 18 or over
const ages = [32, 33, 16, 40];

const a = ages.filter(age => {
  return age > 18;
});
console.log(a)

// Find all prime numbers in an array
const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(array.filter(isPrime)); // [2, 3, 5, 7, 11, 13]

// Modifying each word
let words = ['spray', 'limit', 'exuberant', 'destruction', 'elite', 'present']

// const modifiedWords = words.filter( (word, index, arr) => {
//   arr[index+1] +=' extra'
//   return word.length < 6
// })

// console.log(modifiedWords) // ['spray']

// Appending new words
// const appendedWords = words.filter( (word, arr) => {
//   arr.push('new')
//   return word.length < 6
// })

// console.log(appendedWords) // ['spray' ,'limit' ,'elite']

// Deleting words
const deleteWords = words.filter( (word, index, arr) => {
  arr.pop()
  return word.length < 6
})

console.log(deleteWords) // ['spray', 'limit']
