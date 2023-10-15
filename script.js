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
        'x','x','o',
        'o','x','x',
        'x','o','o'];

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
        let childIdx = Array.prototype.indexOf.call(element.parentNode, element);
        gameBoardArray[childIdx] = currentPlayer.getSymbol();
        element.appendChild(currentPlayer.createSymbolImg());
        this.removeEventListener('click', arguments.callee, false);
        element.classList.remove('box-hover');
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

    restartBtn.addEventListener('click', restart);


})();


tryPlayers();
