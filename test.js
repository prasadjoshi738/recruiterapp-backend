// Q1: Remove extra spaces from a string
function removeExtraSpaces(inputString) {
  return inputString.replace(/\s+/g, ' ').trim();
}

// Sample Input
const inputString = "Write a program to remove all the extra spaces from a paragraph/string";
const outputString = removeExtraSpaces(inputString);
console.log("Sample Input String:", inputString);
console.log("Sample Output String:", outputString);



// #############################################################################################

// Q2: Check divisibility by 5 and 7
function checkDivisibility(number) {
  if (number % 5 === 0 && number % 7 === 0) {
    console.log("Hello World");
  } else if (number % 5 === 0) {
    console.log("Hello");
  } else if (number % 7 === 0) {
    console.log("World");
  } else {
    console.log("Number is not divisible by 5 or 7");
  }
}

// Sample Numbers
const numbers = [5, 7, 35, 14, 13];
numbers.forEach(num => {
  console.log(`Checking number: ${num}`);
  checkDivisibility(num);
});

// #############################################################################################