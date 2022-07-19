// let text = '';

// for(let i = 0; i < 5; i++) {
//   text += "The number is " + i + "<br>";
// }

// document.getElementById('demo').innerHTML = text; 

// const cars = ["BMW", "Volvo", "Saab", "Ford"];
// let i, len, text;

// for (i = 0, len = cars.length, text = ""; i < len; i++) {
//   text += cars[i] + "<br>";
// }

// document.getElementById('demo').innerHTML = text;

// const cars = ["BMW", "Volvo", "Saab", "Ford"];
// let i = 2;
// let len = cars.length;
// let text = "";

// for (; i < len; i++) {
//   text += cars[i] + "<br>";
// }

// document.getElementById('demo').innerHTML = text;

const cars = ["BMW", "Volvo", "Saab", "Ford"];

let i = 0;
let len = cars.length;
let text = "";

for (; i < len; ) {
  text += cars[i] + "<br>";
  i++;
}
document.getElementById('demo').innerHTML = text;
