const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),//this selects an HTML element with the class "playerO" that is a descendant of an element with the class "options" 
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),//This line selects all HTML span elements that are descendants of a section element and assigns them to the variable allBox
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{ //The enclosed code ensures that certain actions are performed once the page has fully loaded.
    for (let i = 0; i < allBox.length; i++) { // iterates through each element in the allBox,allowing actions to be applied to each element.
       allBox[i].setAttribute("onclick", "clickedBox(this)");//clickbox function 
    }
}

//In simpler terms, it's setting up the game so you can click on boxes to play, and when you choose to start as "Player X", it hides the menu and shows the game board.
selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = ()=>{ //When you click the "Player O" button, do what's inside the curly braces.
    selectBox.classList.add("hide");// Hide the menu where you choose "Player X" or "Player O".
    playBoard.classList.add("show");// Show the game board where you play "Tic Tac Toe".
    players.setAttribute("class", "players active player");//Set the classes for the player area to make "Player O" active.
}

let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",//playerSign is set to "X" initially, indicating it's "Player X" turn.
runBot = true;// meaning the computer ("bot") will play the game.

function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;//add o to box replacing element already present in it
        players.classList.remove("active");//Remove the "active" class from the players area.
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");//Add the "active" class to the players area.
    }
    selectWinner();//Check if the current move resulted in a win.
    element.style.pointerEvents = "none";// This disables further clicking on the clicked box to prevent additional moves in the same box.
    playBoard.style.pointerEvents = "none";//This disables clicking on the whole game board temporarily.
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();// This generates a random delay time (in milliseconds) for the computer's move.
    setTimeout(()=>{ //function for ime delay of bot.
        bot(runBot);
    }, randomTimeDelay);
}

function bot(){
    let array = [];// This creates an empty array named "array" to store available box indices where the computer can make a move.
    if(runBot){ //This checks if the runBot flag is true, indicating that it's the computer's turn to move.
        playerSign = "O";//Set playerSign to "O" as the computer is represented by "O".
        
        //In simple terms, this piece of code is looping through all the boxes in the game. 
        //If a box is empty (no X or O icon), it adds the index of that box to the array.
        //This helps the computer decide where to make its move, selecting from the available empty boxes.
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }

        //In simple terms, this code randomly selects an empty box (an index from the array), checks if there are empty boxes available,
        // and based on the player's turn, adds the respective player's sign and icon to the randomly selected box.
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }//adds playersign into box.
            selectWinner();
            //The selectWinner() function is called to check if a player has won the game after each move. 
            //It examines the current state of the tic-tac-toe grid and determines if there's a winner based on the positions of X or O symbols.
            // If a player has won, it triggers the appropriate actions to display the result
        }
        allBox[randomBox].style.pointerEvents = "none"; // This line makes the box that was just filled unclickable, preventing the player from selecting it again.
        playBoard.style.pointerEvents = "auto";//This line makes the entire game board clickable again, allowing the player to make their move.
        playerSign = "X";//This line sets the player's sign to "X", indicating that it's now the turn of the player with the X symbol.
    }
}

function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){ //It calls getIdVal for each position and checks if all three positions have the same sign. If they do, it returns true, indicating a win for that player.
        return true;
    }
}
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

replayBtn.onclick = ()=>{//reset the game.
    window.location.reload();
}