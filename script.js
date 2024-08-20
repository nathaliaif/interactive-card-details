let button = document.querySelector(".cursor-gradient-tracking");

button.addEventListener("mousemove", (e) => {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  button.style.setProperty("--x", x + "px");
  button.style.setProperty("--y", y + "px");
});

const inputList = document.querySelectorAll('input');

// ---- Update display card when input has value ----
function syncInputToDisplay(input){
  const displayElement = document.querySelector(`#card-front__${input.id}`);

  if (displayElement){
    let formattedValue;
    let defaultValue;

    switch(input.id){
      case 'card-number':
        formattedValue = formatCardNumber(input.value);
        defaultValue = '0000 0000 0000 0000';
        break;
        case 'cardholder-name':
          formattedValue = formatCardholderName(input.value);
          defaultValue = 'Jane Appleseed';
        break;
      case 'expiration-month':
      case 'expiration-year':
        formattedValue = input.value;
        defaultValue = '00';
        break;
      case 'card-cvc':
        // formattedValue = input.value;
        defaultValue = '000';
        break;
      default: 
        formattedValue = input.value;
        defaultValue = '';
    }

    displayElement.textContent = formattedValue || defaultValue;
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

