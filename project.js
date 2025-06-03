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

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

//multiplier for each symbol
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

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
const getBet = (balance, lines) => {
     while(true){
    const bet = prompt("Enter the bet per line: "); 
    const numberBet = parseFloat(bet);

    if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
        console.log("Invalid bet, try again.");
    } else{
        return numberBet; 
    }
  } 
};

const spin = () =>{
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
            for(let i = 0; i < count; i++){
                symbols.push(symbol);
            }
        }
    
        const reels = [];
        for(let i = 0; i < COLS; i++){
            reels.push([]); //initialize each reel as an empty array
            const reelSymbols = [...symbols];
            for(let j = 0; j < ROWS; j++){
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1); //remove the selected symbol from the array) 
            }
        }

        return reels;
    };

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]); //initialize each row as an empty array
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]); //push the symbols from each reel into the corresponding row
        }
    }
    return rows;
};

const printRows = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol + " | ";
            if(i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;
    for(let row = 0; row < rows.length; row++){
        const symbols = rows[row];
        let allSame = true;
        
        for(const symbol of symbols){
            if(symbol !== symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () =>{
let balance = deposit();

while(true){
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString()); 
    if(balance <= 0){
        console.log("You ran out of money!");
        break;
         }
         const playAgain = prompt("Do you want to play again (y/n)? ");

         if(playAgain !== "y")break;
    }
};

game();

