


const prompt = require("prompt-sync")();

const Rows = 3;
const lines = 3;

//how many tokens in reels
const tokenCount = {
    X : 2 , 
    Y : 4 ,
    Z : 6 ,
    V : 8 ,
}
//multiplier
const tokenValue = {
    X : 6,
    Y : 4,
    Z : 3,
    V : 2,
}


// deposit money
const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter an amount to deposit:  ");


    const numdepositAmount = parseFloat(depositAmount) ;

    if (isNaN(numdepositAmount) || numdepositAmount <= 0 ) { // if deposit number is not a number or less than 0 input again
        console.log ("Please enter a valid amount")
    } else {
        return numdepositAmount ;
    }
}
} ; 


// LINES USER IS BETTING ON
const getlines = () => {
    while (true) {
        const lines = prompt("How many lines do you want to bet on? 1-3  ");
    
    
        const numofLines = parseFloat(lines) ;
    
        if (isNaN(numofLines) || numofLines <= 0  || numofLines > 3 ) { ; // same as previous if line bet is not a number or less than 0 input again
            console.log ("Enter a number between 1 and 3!")
        } else {
            return numofLines ;
        }
    }
    } ; 


// how much is user betting and check if valid   
const betamount = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter your total bet amount per line  ");
    
    const numofbet = parseFloat(bet) ;
    
        if (isNaN(numofbet) || numofbet <= 0  || numofbet > balance / lines ) { ;  // same as previous two functions
            console.log ("Enter a valid amount or deposit money!")
        } else {
            return numofbet ;
        }
    }
}


// TWO BLOCKS SPIN THE MACHINE AND GENERATE THE TOKENS THAT APPEAR ON EACH REEL
const spin = () => {
    const tokens = [] ;
    for (const [token , count] of Object.entries(tokenCount)) {  
        for (let b = 0; b < count; b++) {
            tokens.push(token) ;    //all possible tokens into an array to use
        }
    }


const reels = [] ; //3 arrays corresponding to each reel on slot machine
    for (let b = 0 ; b < lines; b++) {
        reels.push([]) ;
        const reelTokens = [...tokens] ;
        for (let i = 0 ; i < Rows; i++) { //seperate array for function 
            const ranIndex = Math.floor(Math.random() * reelTokens.length) ;
            const selectedTokens = reelTokens[ranIndex] ;
            reels[b].push(selectedTokens) ; // inserts random tokens into array
            reelTokens.splice(ranIndex, 1) ; // removes selected tokens from array 

        }
    }
    return reels ; 

};
//converting generated vertical(reels or lines) arrays to horizontal to represent the rows in order to calculate if user won
//NEEDS TO BE FIXED 
//FIXED

const transpose = (reels)  => {
    const rows = [];

    for (let b = 0; b < Rows; b++) {
        rows.push([]); //array for each row of symbols
        for (let i = 0; i < lines; i++) {
            rows[b].push(reels[i][b])
        }
    }

    return rows;

};
const printSLOTS = (rows) => {
    for (const row of rows ) {
        let rowString = " " ;
        for (const[b, tokens] of row.entries()) {
            rowString += tokens
            if (b != row.length -1) {
                rowString += " | " ;
            }
        }
        console.log(rowString)
    }
    
};


//// check if user won
const getWINNINGS = (rows, bet, lines) => {
    let winnings = 0 ;
    for (let row = 0; row < lines; row++){
        const tokens = rows[row];
        let tokensSAME = true;

        for(const token of tokens) {
            if (token != tokens[0]) {
                tokensSAME = false;
                break;
            }
        }
        if (tokensSAME) {
            winnings += bet * tokenValue[tokens[0]]  // calculate bet amount and multiply by  the  tokens mulitplier value
        }
    }
    return winnings
}

const GAME = () => {
    let balance = deposit();

    
    while (true) {
    console.log("You have a balance of $" + balance)    //DISPLAY BALANCE AFTER EVERY SPIN
    const numofLines = getlines()
    const bet = betamount(balance, numofLines)
    balance -= bet * numofLines ;
    const reels = spin() ;
    const rows = transpose(reels) ; 
    printSLOTS(rows);
    const winnings = getWINNINGS(rows, bet,lines)
    balance += winnings
    console.log("Congratulations you won $"+ winnings)

    if (balance <= 0 ) {
        console.log ("You have no remaining balance!")
        break
    }
    const playagain = prompt ("Do you want to play again (YES or NO?")
    if (playagain != "YES") 
    
    break
    }
}

GAME() ;

  





    
   
    




