const createPlayer = (name, playerSign) => {
    const playerName = name;
    let points = 0;
    const symbol = playerSign;

    const createSymbolImg = () => {
        if (symbol == 'x') {
            let xSymbol = document.createElement('img');
            xSymbol.src = 'icons/x-solid.svg';
            return xSymbol;
        } else {
            let oSymbol = document.createElement('img');
            oSymbol.src = 'icons/o-solid.svg';
            return oSymbol;
        }
    }
    const getPoints = () => points;
    const addPoints = () => points++;
    const resetPoints = () => points = 0;
    const getSymbol = () => symbol;

    return {playerName, getPoints, addPoints, resetPoints, getSymbol, createSymbolImg};
}

function tryPlayers () {
    const player1 = createPlayer('Plidher');
    console.log({
        playerName: player1.playerName,
        points: player1.getPoints()
    })
    player1.addPoints();
    console.log({
        playerName: player1.playerName,
        points: player1.getPoints()
    })
    player1.resetPoints();
    console.log({
        playerName: player1.playerName,
        points: player1.getPoints()
    });
}

const gameBoard = (function () {
    const gameBoardArray = [
        '','','',
        '','','',
        '','',''];

    const gameBoardDiv = document.getElementById('gameboard');
    const restartBtn = document.getElementById('restart-button');
    let cells = Array.from(gameBoardDiv.children);
    let p1 = createPlayer('Pi','x');
    let p2 = createPlayer('F','o');
    let currentPlayer;
    
    function switchPlayer() {
        currentPlayer == p1 ? currentPlayer = p2 : currentPlayer = p1;
    }

    function addSign(e) {
        let element = e.target;
        let childIdx = Array.prototype.indexOf.call(element.parentNode.children, element);
        gameBoardArray[childIdx] = currentPlayer.getSymbol();
        element.appendChild(currentPlayer.createSymbolImg());
        this.removeEventListener('click', arguments.callee, false);
        element.classList.remove('box-hover');
        checkWin(childIdx);
        switchPlayer();
    }

    function restart() {
        currentPlayer = p1;
        cells.forEach(element => {
            element.classList.add('box-hover');
            element.innerHTML = '';
            element.removeEventListener('click', addSign);
            element.addEventListener('click', addSign);
        });
    }

    function checkWin(index) {
       if (checkHorizontal(index)) return true;
       if (checkVertical(index)) return true;
       if (checkDiagonal(index)) return true;
       return false;
    }

    function checkHorizontal(index) {
        let columnIndex = index % 3;
        if (columnIndex == 0) { //first column
            if (gameBoardArray[index + 1] == currentPlayer.getSymbol() && gameBoardArray[index + 2] == currentPlayer.getSymbol()) {
                //Win
            }
        } else if (columnIndex == 2) { //last column
            if (gameBoardArray[index - 1] == currentPlayer.getSymbol() && gameBoardArray[index - 2] == currentPlayer.getSymbol()) {
                //Win
            }
        } else { //second column
            if (gameBoardArray[index + 1] == currentPlayer.getSymbol() && gameBoardArray[index - 1] == currentPlayer.getSymbol()) {
                //Win
            }
        }
    }

    function checkVertical(index) {
        let rowIndex = Math.floor(index / 3);
        // console.log('Inside vert index:' + rowIndex);
        //checkVertical
        if (rowIndex == 0) { //first row
            if (gameBoardArray[index + 3] == currentPlayer.getSymbol() && gameBoardArray[index + 6] == currentPlayer.getSymbol()) {
                //Win
            }
        } else if (rowIndex == 2) { //last row
            if (gameBoardArray[index - 3] == currentPlayer.getSymbol() && gameBoardArray[index - 6] == currentPlayer.getSymbol()) {
                //Win
            }
        } else { //second row
            if (gameBoardArray[index + 3] == currentPlayer.getSymbol() && gameBoardArray[index - 3] == currentPlayer.getSymbol()) {
                //Win
            }
        }
    }

    function checkDiagonal(index) {
        let rowIndex = Math.floor(index / 3);
        let columnIndex = index % 3;
        if (rowIndex == 0 && columnIndex == 0) {
            if (gameBoardArray[index + 4] == currentPlayer.getSymbol() && gameBoardArray[index + 8] == currentPlayer.getSymbol()) {
                //Win
                // console.log('Win diagonal1');
            }
        } else if (rowIndex == 1 && columnIndex == 1) {
            if (gameBoardArray[index + 4] == currentPlayer.getSymbol() && gameBoardArray[index - 4] == currentPlayer.getSymbol()) {
                //Win
                //console.log('Win diagonal2');
            } else if (gameBoardArray[index + 2] == currentPlayer.getSymbol() && gameBoardArray[index - 2] == currentPlayer.getSymbol()) {
                //Win
                //console.log('Mid right to left diagonal win');
            }
        } else if (rowIndex == 2 && columnIndex == 2) {
            if (gameBoardArray[index - 4] == currentPlayer.getSymbol() && gameBoardArray[index - 8] == currentPlayer.getSymbol()) {
                //Win
                //console.log('Win diagonal3')
            }
        } else if (rowIndex == 0 && columnIndex == 2) {
            if (gameBoardArray[index + 2] == currentPlayer.getSymbol() && gameBoardArray[index + 4] == currentPlayer.getSymbol()) {
                //Win
                //console.log('Top-right diagonal win');
            }
        } else if (rowIndex == 2 && columnIndex == 0) {
            if (gameBoardArray[index - 2] == currentPlayer.getSymbol() && gameBoardArray[index - 4] == currentPlayer.getSymbol()) {
                //Win
                //console.log('Bot-left diagonal win');
            }
        }
    }

    restartBtn.addEventListener('click', restart);


})();


tryPlayers();
