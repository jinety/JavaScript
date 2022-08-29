// class Car {
//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//   }
//   age() {
//     let date = new Date();
//     return date.getFullYear() - this.year;
//   }
// }

// const myCar = new Car('Ford', 2020);

// document.getElementById('demo').innerHTML = `My car is ${myCar.age()} years old.`;

//================================================================

// class Car {
//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//   }
//   age(x) {
//     return x -this.year;
//   }
// }

// let date = new Date();
// let year = date.getFullYear();
// let myCar = new Car('Ford', 2014);

// document.getElementById('demo').innerHTML = `My car is ${myCar.age(year)} years old.`;

//=======================================================================

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   static displayName = 'Point';
//   static distance(a, b) {
//     const dx = a.x - b.x;
//     const dy = a.y - b.y;

//     return Math.hypot(dx, dy); 
//   }
// }

// const p1 = new Point(5, 5);
// const p2 = new Point(10, 10);

// p1.displayName;
// p1.distance;
// p2.displayName;
// p2.distance;

// console.log(Point.displayName);
// console.log(Point.distance(p1, p2));

//=============================================================

// class User {
//   constructor(name) {
//     this.name = name;
//   }
//   sayHi() {
//     alert(this.name);
//   }
// }

// Class is a function
// alert(typeof User); // Function

// ...Or, more precisely, the constructor method
// alert(User === User.prototype.constructor); // True

// The methods are in User.prototype, e.g:
// alert(User.prototype.sayHi); // The code of the sayHi method

// There are exactly two methods in the prototype
// alert(Object.getOwnPropertyNames(User.prototype)); // Constructor, sayHi

//================================================================

// class User {
//   constructor() {}
// }

// alert(typeof User); 

// User(); // Error: Class constructor User cannot be invoked without 'new'

// ==============================================================

// let User = class MyClass {
//   sayHi() {
//     alert(MyClass); // MyClass name is visible only inside the class
//   }
// };

// new User().sayHi(); // Works, shows MyClass definition
// alert(MyClass); // Error, MyClass name isn't visible outside of the class

// ======================================================================

// class User {
//   constructor(name) {
//     // Invokes the setter
//     this.name = name;
//   }

//   get name() {
//     return this._name;
//   }

//   set name(value) {
//     if (value.length < 3) {
//       alert('Name is too short.');
//       return;
//     }
//     this._name = value;
//   }
// }

// let user = new User('Hoa');
// alert(user.name); // Hoa

// user = new User(''); // Name is too short

// =================================== Computed names […] ==============================================

class User {
  ['say' + 'Hi']() {
    alert('Hello');
  }
}

new User().sayHi();
