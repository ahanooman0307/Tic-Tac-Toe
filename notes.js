//factory function
function  createPerson(name){
    return{
        name, 
        talk(){
            return `I am ${this.name}`;
        }
    }
}

const me = createPerson("Justin");
const you = createPerson("You");

console.log(me.talk());
console.log(you.talk());


//constructor function
function Person(name) { 
    this.name = name;
    
}

Person.prototype.printMessage = function(){
    console.log(`Hello ${this.name}`);
}

const ben = new Person("ben");
ben.printMessage();


//iife function 
(function (num){
    console.log("ran");
})(); //the last two parenthesis tells the program to run right away

(favNumber = function(num = 3){
    console.log(`My favorite number is ${num}`);
})();

favNumber(5);

//define an object constructor like this 
const myObject = {
    name: 'NAME',
    age: 6,
    "printAge": function() {
        console.log(this.age);
    }
}

//factory function example 2
const Guy = (name) =>{
    const sayName = () => console.log(`my name is ${name}`);
    return {sayName};//makes sayName a public method
}

const Nerd = (name) =>{
    const {sayName} = Guy(name); //inherits sayName method from Guy factory function 
    return{sayName};
}

const jeff = Nerd('jeff');
jeff.sayName();


//modular pattern example
const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
      add,
      sub,
      mul,
      div,
    };
  })();
  console.log(  calculator.add(3,5)); // 8);

  calculator.sub(6,2); // 4
  calculator.mul(14,5534); // 77476

  //difference between modular pattern and factory function is that they are almost the same
  //except a modular pattern is a wrapped factory function that is immediately evoked since it is an IIFE
  //this is useful for when you only need one instance of the class