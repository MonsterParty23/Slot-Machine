// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Ask if they want to play again

// === START OF THE CODE ONE BY ONE ===

// ===== 1. Deposit Some Money =====
const prompt = require("prompt-sync")();

const deposit = () =>{
    while(true){
    const depositAmount = prompt("Enter a deposit amount: "); //for ex. "17.2" -> 17.2
    const numberDepositAmount = parseFloat(depositAmount); //for ex. "Hello" -> NaN (Not a number)

    //Checking if the deposit amount is a valid number
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again.");
    } else{
        return numberDepositAmount; //returning the valid deposit amount, to break the while loop
    }
  } 
};

// ===== 2. Determine Number of Lines to Bet On =====
const getNumberOfLines = () =>{
    while(true){
    const lines = prompt("Enter the number of lines to bet on (1-3): "); 
    const numberOfLines = parseFloat(lines);

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid number of lines, try again.");
    } else{
        return numberOfLines; 
    }
  } 
};
// ===== 3. Collect a Bet Amount =====
const getBet = (balance) => {
     while(true){
    const bet = prompt("Enter the total bet: "); 
    const numberBet = parseFloat(bet);

    if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance){
        console.log("Invalid bet, try again.");
    } else{
        return numberBet; 
    }
  } 
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance);