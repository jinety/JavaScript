//=========================== ASYNC/AWAIT ==================================
async function getRequest(url) {
  const response = await fetch(url);

  if (response.ok) { 
    return response.json();
  } else {
    throw new Error("Bad response");
  }
}

async function getData(url) {
  try {
    const data = await getRequest(url);

    console.log(data);
  } catch(error) {
    console.log(error);
  }
}

getData('http://localhost:3000/posts');

//============================= CLASS ====================================
 
class Car {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  showMsg() {
    console.log(`My car ${this.name} is ${this.color}`)
  } 
}

let car = new Car();
car.name = 'Toyota';
car.color = 'Red';

// Inheritance
class NewCar extends Car {
  // Override
  showMsg() {
    console.log(`Car ${car.name} it's my favorite car`);
  }
}

let myCar = new NewCar();

// Pack
myCar.showMsg(); 

class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise`)
  }
}

let cat = new Cat('lion');

class Lion extends Cat {
  speak() {
    console.log(`${Lion.name} roars`)
  }
}

let lion = new Lion();

lion.speak();
