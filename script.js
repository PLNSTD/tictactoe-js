const createPlayer = (name, playerSign) => {
    const playerName = name;
    let points = 0;
    const symbol = playerSign;
    let symbolImg;
    const createSymbolImg = () => {
        if (symbol == 'x') {
            let xSymbol = document.createElement('img');
            xSymbol.src = '/icons/x-solid.svg';
            symbolImg = xSymbol;
        } else {
            let oSymbol = document.createElement('img');
            oSymbol.src = '/icons/o-solid.svg';
            symbolImg = oSymbol;
        }
    }
    createSymbolImg();
    const getPoints = () => points;
    const addPoints = () => points++;
    const resetPoints = () => {points = 0};
    const getSymbol = () => symbol;
    const getSymbolImg = () => symbolImg;

    return {playerName, getPoints, addPoints, resetPoints, getSymbol, getSymbolImg};
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
    let cells = Array.from(gameBoardDiv.children);
    let p1 = createPlayer('Pi','x');
    let p2 = createPlayer('F','o');
    let currentPlayer = p1;

    cells.forEach(element => {
        element.classList.add('box-hover');
        element.addEventListener('click', function() {
            let childIdx = Array.prototype.indexOf.call(element.parentNode, element);
            gameBoardArray[childIdx] = currentPlayer.getSymbol;
            element.appendChild(currentPlayer.getSymbolImg);
            this.removeEventListener('click', arguments.callee, false);
            element.classList.remove('box-hover');
        });
    });
    
})();


tryPlayers();
