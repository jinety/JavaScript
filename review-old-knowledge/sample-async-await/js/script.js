// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Promise resolved')}, 4000);
// });

// /**
//  * Async function
//  */
// const asyncFunc = async () => {

  // Wait until the promise resolves
//   let result = await promise;

//   console.log(result);
//   console.log('hello');
// } 

// Calling the async function
// asyncFunc();

// =================== Using try catch =============================

// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//   resolve('Promise resolved')}, 4000); 
// });

// async function
// async function asyncFunc() {
//   try {
      // wait until the promise resolves 
//       let result = await promise; 

//       console.log(result);
//   }   
//   catch(error) {
//       console.log(error);
//   }
// }

// calling the async function
// asyncFunc();

// const kitchen = async () => {
//   try {
//     await abc;
//   }

//   catch(error) {
//     console.log('abc does not exist', error)
//   }

//   finally {
//     console.log('Runs code anyways')
//   }
// }

// kitchen();

// const toppingsChoice = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(console.log('"which topping would you love?'))},3000);
//   })
// }

// const kitchen = async () => {
//   console.log('A');
//   console.log('B');
//   console.log('C');

//   await toppingsChoice();

//   console.log('D');
//   console.log('E');
// }

// kitchen();
// console.log('doing the dishes');
// console.log('cleaning the tables');
// console.log('taking orders');
