// Assignment code here
const lower = "abcdefghijklmnopqrstuvwxyz".split("");
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = "1234567890".split("");
const specialChars = "!@#$%^&*()|?/.;:'\\-_=+[{]}".split("");
let chars = [];

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function getNumberOfCharacters() {
  let number = null;
  while (!isValidNumber(number)) {
    number = window.prompt("What length do you want your password. Write a valid number between 8 to 128, inclusive. Decimals are not valid.");
    if (!isValidNumber(number)) {
      window.alert("You must specify a number between 8 and 128. Trying again.");
    }
  }
  return number;
}

function isValidNumber(number) {
  if (number && !isNaN(number) && isInteger(number) && number >= 8 && number <= 128) {
    return true;
  }
  return false;
}

function isInteger(number) {
  return parseInt(Number(number)) == number && !isNaN(parseInt(number, 10));
}
function generatePassword() {
  let len = getNumberOfCharacters();
  let includeLower = false;
  let includeUpper = false;
  let includeNumbers = false;
  let includeSpecialChars = false;
  while (!includeLower && !includeNumbers && !includeUpper && !includeSpecialChars) {
    includeLower = window.confirm("Do you want to include lower case characters?");
    includeUpper = window.confirm("Do you want to include upper case characters?");
    includeNumbers = window.confirm("Do you want to include numbers?");
    includeSpecialChars = window.confirm("Do you want to include special characters?");
    if (!includeLower && !includeNumbers && !includeUpper && !includeSpecialChars) {
      window.alert("You should select at least one type of characters. Trying again.");
    }
  }
  if (includeLower) {
    chars = chars.concat(lower);
  }
  if (includeUpper) {
    chars = chars.concat(upper);
  }
  if (includeNumbers) {
    chars = chars.concat(numbers);
  }
  if (includeSpecialChars) {
    chars = chars.concat(specialChars);
  }
  let password = "";
  for(let i=0; i<=len; i++) {
    let index = randomNumber(chars.length);
    password += chars[index];
  }

  if (includeLower && !verifyAtLeastOne(password, lower)) {
    //replace one
    password = replaceAt(password, lower[password,randomNumber(lower.length)], randomNumber(password.length))
  }

  if (includeUpper && !verifyAtLeastOne(password, upper)) {
    //replace one
    password = replaceAt(password, upper[password,randomNumber(upper.length)], randomNumber(password.length))
  }

  if (includeNumbers && !verifyAtLeastOne(password, numbers)) {
    //replace one
    password = replaceAt(password, numbers[password,randomNumber(numbers.length)], randomNumber(password.length))
  }

  if (includeSpecialChars && !verifyAtLeastOne(password, specialChars)) {
    //replace one
    password = replaceAt(password, specialChars[password,randomNumber(specialChars.length)], randomNumber(password.length))
  }

  return password;
}

function replaceAt(string, replacement, position) {
  let stringAsArray = string.split("");
  stringAsArray[position] = replacement
  return stringAsArray.join("");
}

function verifyAtLeastOne(password, array) {
  return array.filter(character => password.includes(character)) > 0;
}

function randomNumber(max) {
  return Math.floor(Math.random() * max) ;
}

// Write password to the #password input
function writePassword() {
  chars = [];
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
