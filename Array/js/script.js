// Create array
const a = [1, 2, 3];
const b = ['a', 'b', 'c'];

// Get element out of array
console.log(a[0]); // 1
console.log(a[3]); // undefined

// Check the length of the array
console.log(a.length);

// add element to the end of array 
a.push(4, 5, 6);
console.log(a);

// add element to the beginning of the array
a.unshift(-3, -2, -1);
console.log(a);

// delete element at the end of the table
a.pop();
console.log(a);

// delete element at the beginning of the table
a.shift();
console.log(a);

// Join two or more arrays
// distance 1
// const c = a.concat(b);
// console.log(c);

// distance 2
const c = [...b, ...a];
console.log(c); 