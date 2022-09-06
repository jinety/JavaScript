//=========================== ASYNC/AWAIT ==================================
const getRequest = async (url) => {
  const res = await fetch(url);
  
  if (res.ok) { 
    return res.json();
  } else {
    throw new Error("Bad response");
  }
}

const getData = async (url) => {
  try {
    const data = await getRequest(url);
    console.log(data);
  } catch(e) {
    console.log(e);
  }
}

getData('http://localhost:3000/posts');

//============================= CLASS ====================================
 
class Car {
  constructor() {
    this.name = 'Toyota';
    this.color = 'Red';
  }

  showMsg() {
    console.log(`My car ${this.name} is ${this.color}`)
  } 
}

// Inheritance
class newCar extends Car {
  // Override
  showMsg() {
    console.log(`Car ${this.name} it's my favorite car`);
  }
}

let myCar = new newCar();

// Pack
myCar.showMsg(); 
