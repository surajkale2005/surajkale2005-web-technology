/* 
1. diff between arrow function and simple function
2. What is "this" keyword why we use in arrow and simple function
3. Write a code for two arrow function with two example
4. write code for switch case in js
5. How to use truthy and falsy values in js
6. How to use ternary operator in js
7. Write code for how to use loops in array 
8. Diff between forIn and forOf 
9. How to use filter and map function in js
10. How to use reduce method or function in js
*/

/******************* Activity 1 *******************/
console.log("\nActivity 1:");

// Simple function
function add1(a, b) {
  return a + b;
}
console.log(`5 + 2 : ${add1(5, 2)}`);

// Arrow function
const add2 = (a, b) => a + b;
console.log(`10 + 20 : ${add2(10, 20)}`);


/******************* Activity 2 *******************/
console.log("\nActivity 2:");

// Regular function (has its own this)
const user1 = {
  name: "Tahir",
  greet: function () {
    console.log(`Hello ${this.name}`);
  },
};
user1.greet();

// Arrow function (no own this)
const user2 = {
  name: "Tahir",
  greet: () => {
    console.log(`Hello ${this.name}`); // undefined
  },
};
user2.greet();


/******************* Activity 3 *******************/
console.log("\nActivity 3:");

const isEven = (num) => num % 2 === 0;
console.log(isEven(5));
console.log(isEven(8));

const square = (num) => num * num;
console.log(square(2));
console.log(square(7));


/******************* Activity 4 *******************/
console.log("\nActivity 4:");

let day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day");
}


/******************* Activity 5 *******************/
console.log("\nActivity 5:");

let userName = "";

if (userName) {
  console.log(userName);
} else {
  console.log("Name is empty");
}

let value = null;
if (value) {
  console.log("Value exists");
}


/******************* Activity 6 *******************/
console.log("\nActivity 6:");

let age = 18;
let result = age >= 18 ? "Adult" : "Minor";
console.log(result);


/******************* Activity 7 *******************/
console.log("\nActivity 7:");

let fruitsList = ["Apple", "Banana", "Mango", "Watermelon"];

for (let i = 0; i < fruitsList.length; i++) {
  console.log(fruitsList[i]);
}


/******************* Activity 8 *******************/
console.log("\nActivity 8:");

let colors = ["Red", "Blue", "Green"];

// for...in → index
for (let index in colors) {
  console.log(index);
}

// for...of → value
for (let color of colors) {
  console.log(color);
}


/******************* Activity 9 *******************/
console.log("\nActivity 9:");

let numbers1 = [1, 2, 3, 4];
let doubled = numbers1.map((num) => num * 2);
console.log(doubled);

let numbers2 = [1, 2, 3, 4, 5, 6];
let evenNumbers = numbers2.filter((num) => num % 2 === 0);
console.log(evenNumbers);


/******************* Activity 10 *******************/
console.log("\nActivity 10:");

// Example 1: Sum
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

// Example 2: Product
const product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log(product);

// Example 3: Count items
const fruitsData = ["apple", "banana", "apple", "orange"];

const count = fruitsData.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(count);