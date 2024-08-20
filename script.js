const inputList = document.querySelectorAll('input');
const inputCvc = document.getElementById('card-cvc');

const flipCard = document.querySelector('.flip-card-inner');
const cardMain = document.querySelector('.card-main');

const formContainer = document.querySelector('form');
const continueContainer = document.querySelector('.complete-container');

const btnConfirm = document.getElementById('btn-confirm');
const btnContinue = document.getElementById('btn-continue');

const displayDefaultValue = {
  'card-number': '0000 0000 0000 0000',
  'cardholder-name': 'Jane Appleseed',
  'expiration-month': '00',
  'expiration-year': '00',
  'card-cvc': '000'
}

// ---- Update display card when input has value ----
function syncInputToDisplay(input){
  const displayElement = document.querySelector(`#card-front__${input.id}`);

  if (displayElement){
    let formattedValue;

    switch(input.id){
      case 'card-number':
        formattedValue = formatCardNumber(input.value);
        break;
        case 'cardholder-name':
          formattedValue = formatCardholderName(input.value);
        break;
      case 'expiration-month':
      case 'expiration-year':
      case 'card-cvc':
        formattedValue = input.value;
        break;
      default: 
        formattedValue = input.value;
        defaultValue = '';
    }

    displayElement.textContent = formattedValue || displayDefaultValue[input.id];
  }
}

// Add function syncInputToDisplay to every input
inputList.forEach(input => {
  input.addEventListener('input', () => {
    syncInputToDisplay(input);
  });
})

// Formart value display on card
function formatCardNumber(value) {
  return value.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatCardholderName(value) {
  return value.toUpperCase();
}


// ---- Prevent input from accepting specific chars ----
const invalidNumberChars = [
  "-", "+", "e", ".", ",", " "
];

inputList.forEach(item => {

// Prevent input of invalid characters
item.addEventListener('keydown', e => {
  const isInvalidLetter = !/[a-zA-Z\s]/.test(e.key) && e.key !== "Backspace";
  
  // Prevent numeric and special characters
  if (item.id === 'cardholder-name'){    
    if (isInvalidLetter){
      e.preventDefault();
    }
  } else {
    // Prevent invalid characters
    if (invalidNumberChars.includes(e.key) || !/\d/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  }
})
  
  // Prevent pasting of invalid characters
item.addEventListener('paste', e => {

  // Prevent pasting of numeric and special characters
  if (item.id === 'cardholder-name'){
    let paste = (e.clipboardData || window.clipboardData).getData('text');
      if (/[^a-zA-Z\s]/.test(paste)) {
        e.preventDefault();
      }
  } else {
    let paste = (e.clipboardData || window.clipboardData).getData('text');
      if (/\D/.test(paste)) {
        e.preventDefault();
      }
  }
})

})


// ---- Flip card when writing CVC ----

inputCvc.addEventListener('focus', () => {
  cardMain.classList.add('flipped');
});

inputCvc.addEventListener('blur', () => {
  cardMain.classList.remove('flipped');
});


// ---- Verify text inputs ----
btnConfirm.addEventListener('click', () => {
  gsap.fromTo(formContainer, {opacity: 1}, {duration: 0.5, opacity: 0, ease: 'power3.out'});
  
  setTimeout(() => {
    gsap.fromTo(continueContainer, {opacity: 0}, {duration: 0.5, opacity: 1, ease: 'power3.out'});
    formContainer.style.display = 'none';
    continueContainer.style.display = 'flex';
    }, 400)
})

btnContinue.addEventListener('click', () => {
  gsap.to(continueContainer, {duration: 0.5, opacity: 0, ease: "power3.out"});
    
    setTimeout(() => {
        gsap.fromTo(formContainer, {opacity: 0}, {duration: 0.5, opacity: 1, ease: 'power3.out'});
        formContainer.style.display = 'flex';
        continueContainer.style.display = 'none';
    }, 400)
})