//=========================== ASYNC/AWAIT ==================================
async function getData() {
  const url = 'http://localhost:3000/posts';
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    return `HTTP error: ${response.status}`;
  }
}

getData().then(data => {
  console.log(data);
});

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
class MyCar extends Car {
  // Override
  showMsg() {
    console.log(`Car ${car.name} it's my favorite car`);
  }
}

let myCar = new MyCar();

// Pack
myCar.showMsg(); 

class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise`);
  }
}

class Lion extends Cat {
  constructor(name) {
    super(name)
    this.name = 'lion';
  }

  speak() {
    console.log(`${this.name} roars`);
  }
}

let cat = new Cat('lion');

cat.speak();

let lion = new Lion();

lion.speak();
