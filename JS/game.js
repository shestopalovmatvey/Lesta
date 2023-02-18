const start = document.querySelector(".start-btn");
const cell = document.querySelectorAll(".cell");
const text = document.querySelector(".moves")
let dataX = [];
let dataO = [];
let winnigData = [];
let player = "X";
let bot = "O";

let winningPos = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", cellClick);
}

function randomMove() {
    while (true) {
        let randomNum = Math.floor(Math.random() * 9) + 1;
        if (!dataO.includes(randomNum) && !dataX.includes(randomNum)) {
            return randomNum;
        }
    }
}

function botMoves() {
    let randomNum = randomMove();
    cell[randomNum - 1].textContent = bot;
    changeText(bot);
    putMoves(bot,cell[randomNum - 1]);
}

function win() {
    if (dataX.length > 2 && dataO.length > 2) {
        if (checkWin(dataX)) {
            setColorOnCells();
            alert("Выиграл игрок X");
            lockingCells();
            return true;
        }
        if (checkWin(dataO)) {
            setColorOnCells();
            alert("Выиграл игрок O");
            lockingCells();
            return true;
        }
        else {
            var draw = true;
            for(let i in cell) {
                if(cell[i].innerHTML == '') draw = false;
            }
            if(draw) {
                alert("Ничья");
                lockingCells();
                return true;
            }
        }
    }
    return false;
}

function cellClick() {
    if (!this.innerHTML) {
        this.textContent = player;
    } else {
        alert("ячейка занята!");
        return;
    }
    changeText(player);
    putMoves(player,this);
    if (win()) {
        return;
    };
    botMoves();
    win();
}

const changeText = function(player) {
    if (player === "X") text.textContent = "Сейчас ходит бот";
    else text.textContent = "Сейчас ходит игрок: X";
}

const putMoves = function(player, cell) {
    if (player == "X") dataX.push(+cell.getAttribute("pos"))
    else dataO.push(+cell.getAttribute("pos"))
}

const lockingCells = function() {
    cell.forEach(function(elem){
        elem.style.pointerEvents = 'none';
    })
}

const setColorOnCells = () => {
    for (let i = 0; i < winnigData.length; i++) {
        cell[winnigData[i] - 1].style.backgroundColor = '#98FF98';
    }
}

const checkWin = function(arr) {
    for(var i in winningPos) {
        var win = true;
        for(var j in winningPos[i]) {
            var id = winningPos[i][j];
            var ind = arr.indexOf(id);
            if(ind == -1) {
                win = false
            }
        }
        if(win) {
            winnigData = winningPos[i];
            return true;
        }
    }
    return false;
}

const restart = function() {
    player = "X";
    dataO = [];
    dataX = [];
    text.textContent = "Сейчас ходит игрок: X"
    cell.forEach(function(elem){
        elem.innerHTML = "";
        elem.style.backgroundColor = '';
        elem.style.pointerEvents = '';
    })
}

start.addEventListener("click", () => {
    restart();
})