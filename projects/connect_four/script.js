/*
/ ***
/ Connect Four
/ connectFour.js
/
/ Peter J. Cougan
/ Created May 19, 2016
/ ***
*/

// initialize and declare global variables
var board = new Array(6);               // to create a 2D Array used as 6r x 7c Game Board
var totalMoves = 0;                     // add 1 for every move made in the game
var playerID = ["player2","player1"];   // player identification 
var message = document.getElementById("message");   // to communicate with player
var moveHistory = document.getElementById("moveHistory");   // keeps track of moves
var displayName = document.getElementById("displayName"); 

/**
 * Set up Game Board
 */

// create 2D array used as   6 rows x 7 cols   game board
for(var i=0; i<6; i++) {
    board[i] = new Array(7);
} // end for(i)

// initialize each coordinate as "empty"
for(var row = 0; row < 6; row++) {
    for(var col = 0; col < 7; col++) {
        board[row][col] = "empty";
        console.log(""+row+" "+col+" "+board[row][col]);
    } // end for(col)
} // end for(row)



/**
 * Functions for Game Play
 */

//* returns player input -- column game move
function getPlayerMove() {
    // local variables
    var id;
    var playerMove;
    
    id = document.getElementById('col-input');
    playerMove = Number(id[id.selectedIndex].value);

    updateBoard(playerMove);
} // end getPlayerMove()

//* returns game board array
function updateBoard(playerMove) {
    // local variables
    var currentPlayer;
    var newRow, name, col, moveNum;
    
    playerMove--; // subtract 1 to match array index
    
    // add move to board
    if(board[0][playerMove] != "empty") { // if column is full
        alert("Column " + ++playerMove + " is full, please enter another column.");
    } // end if(board)
    else {
        // add move to board
        for(var row = 5; row >= 0; row--) {
            if(board[row][playerMove] == "empty") {             // if available
                totalMoves++; // increase moves played
                currentPlayer = playerID[totalMoves % 2];
                displayName.innerHTML = playerID[(totalMoves+1) % 2]; // add 1 and mod 2 to return index of next player
                
                board[row][playerMove] = currentPlayer; // add playerID to board
                console.log(board[row][playerMove]);
                
                // display the following in move history table
                newRow = moveHistory.insertRow(-1);
                
                moveNum = newRow.insertCell(0);
                moveNum.innerHTML = totalMoves;
                
                name = newRow.insertCell(1);
                name.innerHTML = currentPlayer;
                
                col = newRow.insertCell(2);
                col.innerHTML = ++playerMove; 
                
                // display on HTML
                addToCanvas(playerMove,row,currentPlayer)
                
                row = -1;                                           // break loop
            } // end if(board[r][c])
        } // end for(r)
        
        checkWinner(currentPlayer);
    } // end else
} // end updateBoard()

//* returns void -- adds player move tp html table#board
function addToCanvas(c,r,currentPlayer) {
    // local variables
    var row = ++r;
    var col = c;
    
    $("#canvas #row"+row+" ."+(col)+" div.gamePiece").addClass(""+currentPlayer); // #canvas #row# .# .currentPlayer div.gamePiece
} // end addToCanvas()


/**
 * Functions to Determine a Winner
 */

//* returns winner of the game
function checkWinner(currentPlayer) {
    // local variables
    var winner = '\u0000';
    
    // check win patterns
    var vertical = checkVertical(currentPlayer);
    var horizontal = checkHorizontal(currentPlayer);
    var diagUp = checkDiagUp(currentPlayer);
    var diagDown = checkDiagDown(currentPlayer);
    
    // determine if player has won
    if(vertical!='\u0000') {
      winner = vertical;
    }
    else if(horizontal!='\u0000') {
      winner = horizontal;
    }
    else if(diagUp!='\u0000') {
      winner = diagUp;
    }
    else if(diagDown!='\u0000') {
      winner = diagDown;
    }
    
    if(winner!='\u0000') {
        document.getElementById("hide-on-win").style.display = "none";
        document.getElementById("display-on-win").style.display = "inline-block";
        alert("Congratulations " + currentPlayer + "! You have won Connect Four!");
    }

    return winner;
} // end checkWinner()

//* detects if winner found horizontally
function checkHorizontal(currentPlayer) {
    // local variables
    var winner = '\u0000';    // equals null char if no winner, otherwise equals Player[] player index
    
    for(var r=5; r>=0; r--) {  // start at row 5, traverse through each row
                               // move up a row after each row in column has been compared
                               
        for(var c=0; c<=4; c++) {  // start at col 0, end at col 4 inclusive
                                   // move 1 row up if inARow !reach 4
                                   
            var inARow = 1;    // reset inARow to 1
          
            for(var i=0; i<4; i++) {    // compare values 4 times
                                        // after each time, move both values up 1 row
                                        
                // if multiple moves in a row detected, add 1 to inARow
                if((c+i+1)<7 && ((board[r][c+i] == board[r][c+i+1]) && board[r][c+i]==currentPlayer)) {
                    inARow++;
                } // end if(...)
            
                // break all loops if winner detected
                if(inARow==4) {
                    r=2;
                    c=7;
                    i=4;
                    winner = currentPlayer;
                } // end if(inARow)
            } // end for(i)
        } // end for(c)
    } // end for(r)
    
    return winner;
} // end checkHorizontal()

//* detects if winner found vertically
function checkVertical(currentPlayer) {
    // local variables
    var winner = '\u0000';    // equals null char if no winner, otherwise equals Player[] player index
    
    for(var r=5; r>=3; r--) {  // start at row 5, end at row 3 inclusive
                                 // move up a row after each row in that column has been compared
      
        for(var c=0; c<7; c++) {  // start at col 0, end at col 6 inclusive
                                  // move 1 column to the right if inARow !reach 4
        
            var inARow = 1;    // reset inARow to 1
          
            for(var i=0; i<4; i++) {  // compare values 4 times
                                    // after each time, move both values up 1 row
          
                // if multiple moves in a row detected, add 1 to inARow
                if((r-i-1)>=0 && ((board[r-i][c] == board[r-i-1][c]) && board[r-i][c]==currentPlayer)) {
                    inARow++;
                } // end if(...)
            
                // break all loops if winner detected
                if(inARow==4) {
                  r=2;
                  c=7;
                  i=4;
                  winner = currentPlayer;
                } // end if(inARow)
            } // end for(i)
        } // end for(c)
    } // end for(r)
   
    return winner;
} // end checkVertical()

//* detects if winner found diagoanl up /
function checkDiagUp(currentPlayer) {
    // local variables
    var winner = '\u0000';    // equals null char if no winner, otherwise equals Player[] player index

    for(var r=5; r>=3; r--) {  // start at row 5, end at row 3 inclusive
                                 // move up a row after each row in column has been compared
                                 
        for(var c=0; c<4; c++) {  // start at col 0, end at col 6 inclusive
                                  // move 1 column to the right if inARow !reach 4
                                  
            var inARow = 1;    // reset inARow to 1
          
            for(var i=0; i<4; i++) {  // compare values 4 times
                                    // after each time, move both values up 1 row
          
                // if multiple moves in a row detected, add 1 to inARow
                if(((r-i-1>=0) && (c+i+1<7)) && ((board[r-i][c+i] == board[r-i-1][c+i+1]) && board[r-i][c+i]==currentPlayer)) {
                    inARow++;
                } // end if(...)
            
                // break all loops if winner detected
                if(inARow==4) {
                    r=2;
                    c=7;
                    i=4;
                    winner = currentPlayer;
                } // end if(inARow)
            } // end for(i)
        } // end for(c)
    } // end for(r)
   
    return winner;
} // end checkDiagUp()

//* detects if winner found diag down \
function checkDiagDown(currentPlayer) {
    // local variables
    var winner = '\u0000';    // equals null char if no winner, otherwise equals Player[] player index

    for(var r=0; r<3; r++) {  // start at row 0, end at row 3 inclusive
                                 // move down a row after each row in column has been compared
                                 
        for(var c=0; c<4; c++) {  // start at col 0, end at col 6 inclusive
                                  // move 1 column to the right if inARow !reach 4
                                  
            var inARow = 1;    // reset inARow to 1
            
            for(var i=0; i<4; i++) {  // compare values 4 times
                                    // after each time, move both values up 1 row
                                    
                // if multiple moves in a row detected, add 1 to inARow
                if(((r+i+1<6) && (c+i+1<7)) && ((board[r+i][c+i] == board[r+i+1][c+i+1]) && board[r+i][c+i]==currentPlayer)) {
                    inARow++;
                } // end if(...)
            
                // break all loops if winner detected
                if(inARow==4) {
                    r=2;
                    c=7;
                    i=4;
                    winner = currentPlayer;
                } // end if(inARow)
            } // end for(i)
        } // end for(c)
    } // end for(r)
   
    return winner;
} // end checkDiagDown()

// dropdown animation
/*
function dropPiece(column, row) {
	row++;
	
	for(var r=1; r<=row; r++) {
		$("#canvas #row"+r+" ."+(column)+" div.gamePiece").addClass(""+currentPlayer);
		setTimeOut(,50);
	}
} // end dropPiece()
*/