/* ------------------------------------------------------------------------- */
//
// Variabale Definitions
//
/* ------------------------------------------------------------------------- */

//
// Interactive elements of the HTML page referenced to constants
const copyrightYear = document.querySelector('#copyright-year');
const passwordLength = document.querySelector('#password-length');
const generateButton = document.querySelector('#generate-button');
const passwordOutput = document.querySelector('#generated-password');

//
// Arrays containing the possible value types that the user can combine to create the password
const numberArray = populateArraysFromASCII('Numbers');
const symbolsArray = populateArraysFromASCII('Symbols');
const uppercaseArray = populateArraysFromASCII('Uppercase');
const lowercaseArray = populateArraysFromASCII('Lowercase');

/* ------------------------------------------------------------------------- */
//
// Function Definitions
//
/* ------------------------------------------------------------------------- */

//
// populateSelect() populates the length of password dropdown list dynamically
function populateSelect(element, min, max) {
  // Generate the attributes and values of each option
  let selectOptions = [{ textContent: 'Length of password', selected: 'selected', disabled: 'disabled' }];
  for (let i = min; i <= max; i++) {
    selectOptions.push({ value: `${i}`, textContent: `${i}` });
  }

  // Create each option with the appropriate attributes and values and append it to the element
  selectOptions.forEach(item => {
    const option = document.createElement('option');
    option.textContent = item.textContent;
    for (let key in item) {
      if (item[key] && key !== 'textContent') option.setAttribute(key, item[key]);
    }
    element.append(option);
  });
}

//
// setThisYear() dynamically updates the copyright year on the page
function setThisYear(element) {
  element.innerHTML = new Date().getFullYear();
}

//
// getRandomInteger() returns a random integer between the ranges of min and max
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function populateArraysFromASCII(source) {
  source = source.toLowerCase();
  const array = [];
  const chars = {
    uppercase: { min: 65, max: 90 },
    lowercase: { min: 97, max: 122 },
    numbers: { min: 48, max: 57 },
    symbols: [{ min: 33, max: 47 }, { min: 58, max: 64 }, { min: 91, max: 96 }, { min: 123, max: 126 }],
  };

  // Generate values for each type from the corresponding ASCII codes and append to array
  if (chars.hasOwnProperty(source)) {
    if (source === 'symbols') {
      chars[source].forEach(item => {
        for (let i = item['min']; i <= item['max']; i++) {
          array.push(String.fromCharCode(i));
        }
      });
    } else {
      for (let i = chars[source]['min']; i <= chars[source]['max']; i++) {
        array.push(String.fromCharCode(i));
      }
    }
  }
  return array;
}

//
// The main function to generate the random password and display it on the HTML page
function generatePassword(event) {
  // Prevent page reload when the generate button is clicked
  event.preventDefault();

  let password = '';
  const length = passwordLength.value;
  const characterSelection = [...numberArray, ...uppercaseArray, ...lowercaseArray, ...symbolsArray];

  // Generate the password from random characters in the characterSelection array;
  while (password.length < length) {
    let randomCharacter = characterSelection[getRandomInteger(0, characterSelection.length)];
    if (randomCharacter === password[password.length - 1] && password.length !== 0) {
      continue;
    } else {
      password += randomCharacter;
    }
  }

  // Print the generated password on the screen for the user
  passwordOutput.value = password;
}

/* ------------------------------------------------------------------------- */
//
// Function Calls
//
/* ------------------------------------------------------------------------- */

//
// Set copyright year to current year
setThisYear(copyrightYear);

//
// Populate length of password dropdown list
populateSelect(passwordLength, 4, 40);

//
// Generate a new random password whenever the button is clicked
generateButton.onclick = generatePassword;
