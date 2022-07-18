// Declare object
const name = 'Hoa';

// Object contains multiple values
const car = {type: 'Fiat', model: '500', color: 'while'};

const person = {firstName: 'Nguyen',
    lastName: 'Hoa',
    age: '22',
    eyeColor: 'while',
    fullName: function() {
        console.log(`${this.firstName} ${this.lastName}`);
    }
};

person.fullName();

// Access object properties
// Distance 1
console.log(person.lastName);

// Distance 2
console.log(person['firstName']);

// Remove attribute from object
delete person.age;
console.log(person);

