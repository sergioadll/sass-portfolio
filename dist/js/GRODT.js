let gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let money = 0;
let billQuantity = 20;
let bombQuantity = 2;
let billsFound = 0;
let deaths = 0;
window.onload = function () {
  initializeBoard();
  let buttonDiv = document.querySelector(".board__stats__reset");
  buttonDiv.addEventListener("click", () => {
    document.querySelector(".board__stats__money").innerHTML = 0;
    document.querySelector(".board__stats__deaths").innerHTML = 0;
    endGame();
  });
};
function initializeBoard() {
  setBoard();
  billsFound = 0;
  let row = document.querySelectorAll(".board__yAxis"); //traemos todas las filas (array) del tablero por su clase
  for (let i = 0; i < row.length; i++) {
    //recorremos todas las filas
    for (let j = 0; j < gameBoard[0].length; j++) {
      //recorremos cada celda del tablero/matriz "gameBoard"
      let cell = document.createElement("div"); //creamos cada cell y añadimos la classe cell para css
      cell.classList.add("board__cell");
      // cell.innerHTML = gameBoard[i][j];
      cell.value = gameBoard[i][j]; //aqui asignamos a cada celda el valor correspondiente del tablero. Ejemplo: gameboard[2][3]=0  ->  fila 2, clolumna 3

      cell.addEventListener("click", (e) => {
        dig(e.target);
      });
      row[i].appendChild(cell);
    }
  }
}
function setBoard() {
  for (let i = 0; i < billQuantity; i++) {
    gameBoard[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 1;
  }
  for (let i = 0; i < bombQuantity; i++) {
    gameBoard[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 3;
  }
}

function endGame() {
  let previousGame = document.querySelectorAll(".board__cell");
  previousGame.forEach((cell) => cell.remove());
  gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  initializeBoard();
}
function dig(rowDiv) {
  if (rowDiv.value == 1) {
    rowDiv.value = 2;
    rowDiv.style.background = "lightgreen";
    rowDiv.innerHTML = '<i class="fas fa-dollar-sign fa-lg"></i>';
    money++;
    billsFound++;
    console.log(billsFound);

    let moneyEarnedDiv = document.querySelector(".board__stats__money");
    moneyEarnedDiv.innerHTML = money;
    if (billsFound == billQuantity) {
      alert("You won!");
      endGame();
    }
  } else if (rowDiv.value == 0) {
    rowDiv.style.background = "#a84a14";
  } else if (rowDiv.value == 3) {
    rowDiv.style.background = "red";
    rowDiv.innerHTML = '<i class="fas fa-bomb fa-lg"></i>';
    deaths++;
    let deathsDiv = document.querySelector(".board__stats__deaths");
    deathsDiv.innerHTML = deaths;
    alert("You died!");
    endGame();
  }
}
