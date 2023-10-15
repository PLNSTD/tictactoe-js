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
    const getName = () => playerName;
    const getPoints = () => points;
    const addPoints = () => points++;
    const resetPoints = () => points = 0;
    const getSymbol = () => symbol;

    return {getName, getPoints, addPoints, resetPoints, getSymbol, createSymbolImg};
}

function tryPlayers () {
    const player1 = createPlayer('Plidher', 'x');
    console.log({
        playerName: player1.getName(),
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
    let gameBoardArray = [
        '','','',
        '','','',
        '','',''];

    const gameBoardDiv = document.getElementById('gameboard');
    
    let cells = Array.from(gameBoardDiv.children);
    const p1 = createPlayer('Pi','x');
    const p2 = createPlayer('F','o');
    var currentPlayer = p2;
    
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
        if(checkWin(childIdx)) {
            displayController.winAnimation();
            disableCells();
        }
        else
            switchPlayer();
    }

    function restart() {
        displayController.restartBtn.innerHTML = 'Restart';
        currentPlayer = p1;

        gameBoardArray = [
        '','','',
        '','','',
        '','',''];

        cells.forEach(element => {
            element.classList.add('box-hover');
            element.innerHTML = '';
            element.removeEventListener('click', addSign);
            element.addEventListener('click', addSign);
        });
    }

    function disableCells() {
        cells.forEach(element => {
            element.classList.remove('box-hover');
            element.removeEventListener('click', addSign);
        })
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
                return true;
            }
        } else if (columnIndex == 2) { //last column
            if (gameBoardArray[index - 1] == currentPlayer.getSymbol() && gameBoardArray[index - 2] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        } else { //second column
            if (gameBoardArray[index + 1] == currentPlayer.getSymbol() && gameBoardArray[index - 1] == currentPlayer.getSymbol()) {
                //Win
                return true;
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
                return true;
            }
        } else if (rowIndex == 2) { //last row
            if (gameBoardArray[index - 3] == currentPlayer.getSymbol() && gameBoardArray[index - 6] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        } else { //second row
            if (gameBoardArray[index + 3] == currentPlayer.getSymbol() && gameBoardArray[index - 3] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        }
    }

    function checkDiagonal(index) {
        let rowIndex = Math.floor(index / 3);
        let columnIndex = index % 3;
        if (rowIndex == 0 && columnIndex == 0) {
            if (gameBoardArray[index + 4] == currentPlayer.getSymbol() && gameBoardArray[index + 8] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        } else if (rowIndex == 1 && columnIndex == 1) {
            if (gameBoardArray[index + 4] == currentPlayer.getSymbol() && gameBoardArray[index - 4] == currentPlayer.getSymbol()) {
                //Win
                return true;
            } else if (gameBoardArray[index + 2] == currentPlayer.getSymbol() && gameBoardArray[index - 2] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        } else if (rowIndex == 2 && columnIndex == 2) {
            if (gameBoardArray[index - 4] == currentPlayer.getSymbol() && gameBoardArray[index - 8] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        } else if (rowIndex == 0 && columnIndex == 2) {
            if (gameBoardArray[index + 2] == currentPlayer.getSymbol() && gameBoardArray[index + 4] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        } else if (rowIndex == 2 && columnIndex == 0) {
            if (gameBoardArray[index - 2] == currentPlayer.getSymbol() && gameBoardArray[index - 4] == currentPlayer.getSymbol()) {
                //Win
                return true;
            }
        }
    }

    return {currentPlayer, restart};
})();

const displayController = (function () {
    const restartBtn = document.getElementById('restart-button');
    restartBtn.innerHTML = 'Play';
    restartBtn.addEventListener('click', gameBoard.restart);

    function winAnimation() {
        console.log('WON');
        let modalDiv = document.getElementById('myModal');
        let congratulationPElement = document.getElementById('winner-paragraph');
        let continuePlayingBtn = document.getElementById('continue-button');
        let closeBtn = document.getElementById('close-button');
        
        console.log(gameBoard.currentPlayer.getName());
        congratulationPElement.innerHTML = 'Congratulations ' + gameBoard.currentPlayer.getName() + ' YOU WON!';

        modalDiv.style.display = 'block';

        closeBtn.addEventListener('click', function () {
            restartBtn.innerHTML = 'Play';
            modalDiv.style.display = 'none';
        });

        window.onclick = function(e) {
            if(e.target == modalDiv)
                modalDiv.style.display = 'none';
        };

        continuePlayingBtn.addEventListener('click', function () {
            modalDiv.style.display = 'none';
            gameBoard.restart();
        });
    }

    return {restartBtn, winAnimation};

})();


tryPlayers();
