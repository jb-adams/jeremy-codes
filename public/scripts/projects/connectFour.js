let board = document.querySelector("#board");
let chipEntry = document.querySelector("#chip-entry");
let restartButton = document.querySelector("#restart");
let message = document.querySelector("#message");

restartButton.addEventListener("click", restartGame);

let playerChipClasses = {
    0: {
        inactive: "unowned",
        active: "unowned"
    },
    1: {
        inactive: "p1-inactive",
        active: "p1-active"
    },
    2: {
        inactive: "p2-inactive",
        active: "p2-active"
    }
}

let gameState = {
    complete: false,
    activePlayer: 1,
    chips: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
}

function setGameComplete() {
    gameState.complete = true;
}

function setMessage(s) {
    message.innerHTML = s;
}

function submitMove(col) {
    if (gameState.chips[0][col] === 0) {

        let filledRow = 0;
        
        for (let row = 5; row > -1; row--) {
            let cell = gameState.chips[row][col];
            if (cell === 0) {
                gameState.chips[row][col] = gameState.activePlayer;
                filledRow = row
                break;
            }
        }
        
        drawBoard();
        checkWin(filledRow, col);

        if (gameState.complete === false) {
            checkDraw();
        }

        if (gameState.complete === false) {
            changeActivePlayer();
        }
        drawChipEntry();
    } else {
        alert("That column is full, try again");
    }
}

function checkWin(ri, ci) {
    console.log(`checking win from ${ri}, ${ci}`);

    let lines = [
        [[-1, -1], [1, 1]], // diagonal down right
        [[-1, 0], [1, 0]], // vertical
        [[0, -1], [0, 1]], // horizontal
        [[-1, 1], [1, -1]] // diagonal down left
    ]

    lines.forEach(line => {
        nInARow = 1;

        line.forEach(direction => {
            let rowStep = direction[0];
            let colStep = direction[1];
            let withinBounds = true;
            let chipMatchesExpected = true;
            let i = 1;

            while (chipMatchesExpected) {
                let rowToCheck = ri + (rowStep * i);
                let colToCheck = ci + (colStep * i);

                // check if cell is out of bounds
                if (rowToCheck < 0 || rowToCheck > 5) {
                    withinBounds = false;
                }
                if (colToCheck < 0 || colToCheck > 6) {
                    withinBounds = false;
                }

                if (withinBounds) {
                    if (gameState.chips[rowToCheck][colToCheck] === gameState.activePlayer) {
                        nInARow++;
                    } else {
                        chipMatchesExpected = false;
                    }
                } else {
                    chipMatchesExpected = false;
                }
                i++;
            }
        })

        if (nInARow >= 4) {
            setMessage(`Player ${gameState.activePlayer} Wins! Click 'Restart' to play again!`)
            setGameComplete();
        }

    })
}

function checkDraw() {
    let cont = true;
    gameState.chips.forEach(row => {
        if (cont) {
            row.forEach(cell => {
                if (cont) {
                    if (cell === 0) {
                        cont = false;
                    }
                }
            })
        }
    })

    if (cont) {
        setMessage("It's a draw! Click 'Restart to play again!");
        setGameComplete();
    }
}

function changeActivePlayer() {
    gameState.activePlayer = gameState.activePlayer === 1 ? 2 : 1;
    setMessage(`Player ${gameState.activePlayer} turn`);
}

function drawChip(player, active) {
    let playerClass = playerChipClasses[player][active];
    let chip = document.createElement("span");
    chip.classList.add("chip");
    chip.classList.add(playerClass);
    return chip;
}

function drawChipOnBoard(ri, ci, active) {
    let player = gameState.chips[ri][ci];
    return drawChip(player, active);
}

function drawChipEntry() {
    let chipEntryInner = document.createElement("table");
    chipEntryInner.classList.add("margin-auto");
    let tr = document.createElement("tr")

    for (let i=0; i < 7; i++) {
        let td = document.createElement("td");
        let chip = drawChip(gameState.activePlayer, "inactive");

        let activeClass = playerChipClasses[gameState.activePlayer]["active"];
        let inactiveClass = playerChipClasses[gameState.activePlayer]["inactive"];

        if (gameState.complete === false) {

            chip.addEventListener("mouseenter", event => {
                event.target.classList.remove(inactiveClass);
                event.target.classList.add(activeClass);
            });

            chip.addEventListener("mouseleave", event => {
                event.target.classList.remove(activeClass);
                event.target.classList.add(inactiveClass);
            });

            chip.addEventListener("click", () => submitMove(i));
        }

        td.appendChild(chip);
        tr.appendChild(td);
    }
    chipEntryInner.appendChild(tr);
    chipEntry.innerHTML = "";
    chipEntry.appendChild(chipEntryInner);
}

function drawBoard() {

    let boardInner = document.createElement("table");
    boardInner.classList.add("margin-auto");
    gameState.chips.forEach((row, ri) => {
        let tr = document.createElement("tr");
        row.forEach((col, ci) => {
            let td = document.createElement("td");
            let chip = drawChipOnBoard(ri, ci, "active");
            td.appendChild(chip);
            tr.appendChild(td);
        })
        boardInner.appendChild(tr);
    })
    board.innerHTML = "";
    board.appendChild(boardInner);
}

function drawGame() {
    drawChipEntry()
    drawBoard();
}

function restartGame() {
    gameState.complete = false;
    gameState.activePlayer = 1;
    gameState.chips = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    setMessage(`Player 1 turn`);
    drawGame();
}

drawGame();