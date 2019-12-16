/**
	variables declaration
*/
const screen = document.querySelector('#screen');	//get reference to the screen
const numbers = Array.from(document.querySelectorAll('button[data-num]'));	//get reference to buttons
const operators = Array.from(document.querySelectorAll('button[data-operator]'));
const services = Array.from(document.querySelectorAll('button[data-service]'));
const dot = document.querySelector('.dot');		//ref to decimal
let firstNum;			//variable to hold first number entered by user
let secondNum;		//variable to hold second number entered by user
let result;				//variable to hold result
let op;						//operator reference
let opClicked = false;
let serv;

/**
	functionality to arithmetic operations
*/
//entering numbers
numbers.forEach(number => number.addEventListener('click', e => {
	if (opClicked) {
		screen.innerText = '';
		opClicked = !opClicked;
	}
	screen.innerText = `${screen.innerText}${number.innerText}`;
}));

//setting conditions for the use of decimal
dot.addEventListener('click', e => {
	if (screen.innerText.includes('.')) {
		screen.innerText = screen.innerText;
	}
	else if (screen.innerText) {
		screen.innerText = `${screen.innerText}${dot.innerText}`;
	} else {
		screen.innerText = `0${dot.innerText}`;
	}
})

//calculating...
const calc = (firstNum, secondNum, op) => {
	switch (op) {
		case 'divide':
		if (secondNum === '0') {
			screen.innerText = 'Cannot divide by 0';
		} else {
			result = parseFloat(firstNum) / parseFloat(secondNum);
			screen.innerText = result;
		}
		break;

		case 'mult':
		result = parseFloat(firstNum) * parseFloat(secondNum);
		screen.innerText = result;
		break;

		case 'minus':
		result = parseFloat(firstNum) - parseFloat(secondNum);
		screen.innerText = result;
		break;

		case 'add':
		result = parseFloat(firstNum) + parseFloat(secondNum);
		screen.innerText = result;
		break;
	}
}

//getting the operands
operators.forEach(operator => operator.addEventListener('click', e => {
	if (screen.innerText) {
		
		//handling multiple clicks of an operator(s)
		if (firstNum && opClicked) {
			op = operator.dataset.operator;
		}
		
		else if (firstNum) {
			secondNum = screen.innerText;
			calc(firstNum, secondNum, op);
		}

		firstNum = screen.innerText;
		op = operator.dataset.operator;
		opClicked = true;

	} else if (operator.dataset.operator === 'minus') {  //handling the use of negative numbers
		screen.innerText = operator.innerText;
	}
}));

//services (cancel, save to memory...)
services.forEach(service => service.addEventListener('click', e => {
	
	serv = service.dataset.service;
	
	switch (serv) {
		case 'restart':
		screen.innerText='';
		firstNum='';
		secondNum='';
		break;

		case 'save':
		localStorage.setItem('memory', screen.innerText);
		break;

		case 'show':
		screen.innerText = localStorage.getItem('memory');
		break;

		case 'clear':
		screen.innerText = '';
		break;
	}
})); 