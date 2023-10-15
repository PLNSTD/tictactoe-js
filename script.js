const createPlayer = (name, playerSign) => {
    const playerName = name;
    let points = 0;
    const symbol = playerSign;
    // let symbolImg;

    const createSymbolImg = () => {
        if (symbol == 'x') {
            let xSymbol = document.createElement('img');
            xSymbol.src = 'icons/x-solid.svg';
            // xSymbol.src = 'icons/icons8-x-52.png';
            return xSymbol;
        } else {
            let oSymbol = document.createElement('img');
            // let oSymbol = document.createElementNS('icons/o-solid.svg', 'svg');
            oSymbol.src = 'icons/o-solid.svg';
            // oSymbol.src = 'icons/icons8-o-52.png';
            return oSymbol;
        }
    }
    let symbolImg = createSymbolImg();
    const getPoints = () => points;
    const addPoints = () => points++;
    const resetPoints = () => {points = 0};
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
    let cells = Array.from(gameBoardDiv.children);
    let p1 = createPlayer('Pi','x');
    let p2 = createPlayer('F','o');
    let currentPlayer = p1;

    cells.forEach(element => {
        element.classList.add('box-hover');
        element.addEventListener('click', function() {
            let childIdx = Array.prototype.indexOf.call(element.parentNode, element);
            gameBoardArray[childIdx] = currentPlayer.getSymbol();
            // document.getElementById('box-' + (childIdx + 1)).appendChild(currentPlayer.getSymbolImg);
            element.appendChild(currentPlayer.createSymbolImg());
            this.removeEventListener('click', arguments.callee, false);
            element.classList.remove('box-hover');
        });
    });
    
})();


tryPlayers();
