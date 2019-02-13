/* ------------------------------------------------------------------------- */
//
// Variabale Definitions
//
/* ------------------------------------------------------------------------- */
const copyrightYear = document.querySelector('#copyright-year');
const passwordLength = document.querySelector('#password-length');
const generateButton = document.querySelector('#generate-button');
const passwordOutput = document.querySelector('#generated-password');
const passwordGenForm = document.querySelector('#password-gen-form');
const numberArray = populateArraysFromASCII('Numbers');
const uppercaseArray = populateArraysFromASCII('Uppercase');
const lowercaseArray = populateArraysFromASCII('Lowercase');

/* ------------------------------------------------------------------------- */
//
// Function Definitions
//
/* ------------------------------------------------------------------------- */
function populateSelect(element, min, max) {
  let selectOptions = [{ textContent: 'Length of password', selected: 'selected', disabled: 'disabled' }];

  for (let i = min; i <= max; i++) {
    selectOptions.push({ value: `${i}`, textContent: `${i}` });
  }

  selectOptions.forEach(item => {
    const option = document.createElement('option');
    option.textContent = item.textContent;
    for (let key in item) {
      if (item[key] && key !== 'textContent') option.setAttribute(key, item[key]);
    }
    element.append(option);
  });
}

function setThisYear(element) {
  element.innerHTML = new Date().getFullYear();
}

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
  };

  if (chars.hasOwnProperty(source)) {
    for (let i = chars[source]['min']; i <= chars[source]['max']; i++) {
      array.push(String.fromCharCode(i));
    }
  }
  return array;
}

function generatePassword(event) {
  event.preventDefault();
  const length = passwordLength.value;
  let password = '';
  const characterSelection = [...numberArray, ...uppercaseArray, ...lowercaseArray];
  for (let i = 0; i < length; i++) {
    password += characterSelection[getRandomInteger(0, characterSelection.length)];
  }
  passwordOutput.value = password;
}

/* ------------------------------------------------------------------------- */
//
// Function Calls
//
/* ------------------------------------------------------------------------- */

// Set copyright year to current year
setThisYear(copyrightYear);

// Populate length of password dropdown
populateSelect(passwordLength, 4, 40);

// console.log(populateArraysFromASCII(65, 90));
generateButton.onclick = generatePassword;
