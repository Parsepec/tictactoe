let state = {
  board: Array.from(' '.repeat(9)),
  isClicked: [],
  turn: "x",
};
const app = document.getElementById("app");
/**
 * sets the global state object
 * @param {object} newState
 * @returns {object}
 */
const setState = (newState) => {
  state = newState;
};
/**
 * Performs variable number of checks on the state returns true if any of the checks return true
 * @param {Object} cState
 * @param {Array<function>} checks
 * @returns {boolean}
//  */
 const checkState = (cState, ...checks) => checks.reduce((falseCheck, check) => falseCheck || check(cState),false);
/**
 * Checks that the "rows"  assigned to the board key of the state corresponds the value of the "turn" key
 * @param {Object} cState
 * @returns {boolean}
 */
const checkRow = (cState) => {
  return (
    (cState.board[0] === cState.turn &&
      cState.board[1] === cState.turn &&
      cState.board[2] === cState.turn) ||
    (cState.board[3] === cState.turn &&
      cState.board[4] === cState.turn &&
      cState.board[5] === cState.turn) ||
    (cState.board[6] === cState.turn &&
      cState.board[7] === cState.turn &&
      cState.board[8] === cState.turn)
  );
};
/**
 * Checks that the "columns" assigned to the board key of the state corresponds to the value of the "turn" key
 * @param {object} cState
 * @returns {boolean}
 */
const checkCol = (cState) => {
  return (
    (cState.board[0] === cState.turn &&
     cState.board[3] === cState.turn &&
     cState.board[6] === cState.turn) ||
    (cState.board[1] === cState.turn &&
      cState.board[4] === cState.turn &&
      cState.board[7] === cState.turn) ||
    (cState.board[2] === cState.turn &&
      cState.board[5] === cState.turn &&
      cState.board[8] === cState.turn)
  );
};
/**
 * Checks that the "diagnals" assigned to the board key of the state corresponds to the value of the "turn" key
 * @param {object} cState
 * @returns {boolean}
 */
const checkDiag = (cState) => {
  return (
    (cState.board[0] === cState.turn &&
      cState.board[4] === cState.turn &&
      cState.board[8] === cState.turn) ||
    (cState.board[2] === cState.turn &&
      cState.board[4] === cState.turn &&
      cState.board[6] === cState.turn)
  );
};
/**
 * Checks that there are no empty spaces in the board array of the state, returns true if there are none
 * @param {Object} cState
 * @returns {boolean}
 */
const checkDraw = (cState) => Boolean(!cState.board.filter((cell) => cell == ' ')[0])

const refresh = () =>  document.location.reload()
/**
 *  Creates a HTML element with a variable text and a button that refreshes the page
 * @param {Object} cState
 * @returns {boolean}
 */
const popup = (text,elem) => {
  const div =  document.createElement("div");
  const txt = document.createElement("p");
  const btn = document.createElement('button');
  div.setAttribute('id','popup');
  txt.innerHTML = text
  div.appendChild(txt);
  btn.innerHTML = "Play again"
  btn.addEventListener('click',refresh)
  div.appendChild(btn);
  elem.replaceChild(div, document.getElementById('board'));
}
const onWin = (cState,elem) => {
  popup(`${cState.turn} won`,elem)
};
const onDraw = (elem) => {
  popup(`its a draw`,elem)
};


/**
 * Creates the "board" using the state but without affecting the DOM
 * @param {object} state
 * @returns {object} A HTML object
 */
const createBoard = (state) => {
  let board = document.createElement("div");
  board.setAttribute("id", "board");
  state.board.forEach((el, index) => {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.innerHTML = el;
    cell.setAttribute("id", String(index));
    board.appendChild(cell);
  });

  return board;
};
/** 
 * Appends the 'board' to the DOM, if the element with the id of 'board' already exists it replaces it
 * @param {Node} board DOM node to attach
 * @param {Node} element DOM node to attach to
 * @returns {undefined}
 */
const render = (board, element) => {
  !document.getElementById("board")
    ? element.appendChild(board)
    : element.replaceChild(board, document.getElementById("board"));
};
/**
 * Recursive function that creates the 'board', attaches it to the DOM and continually redefines the state based on user input until the game ends
 * @param {function} createBoard Creates the "board" using the state but without affecting the DOM
 * @param {function} render Appends the 'board' to the DOM, if the element with the id of 'board' already exists it replaces it
 * @param {function} updateState sets the global state object
 * @param {function} state state of the application
 * @param {function} app DOM element to attach the application to
 * @returns {undefined}
 */
const observe = (createBoard,render, updateState, state,app) => {
  render(createBoard(state), app);
  let cells = Array.from(board.children);
  // check for draw
  if(checkState(state,checkDraw)){
    onDraw(app)
  }
  // adds mouseover, mouseout and click event listeners to every 'cell'
  cells.forEach((cell, index) => {
    if (!state.isClicked[index]) {
      cell.addEventListener("mouseover", () => {
        cell.innerHTML = state.turn;
      });
      cell.addEventListener("mouseout", () => {
        cell.innerHTML = "";
      });
    }
    cell.addEventListener("click", () => {
      var newState = { ...state };
      console.log(checkState(newState, checkRow, checkDiag, checkCol));
      if (!newState.isClicked[index]) {
        newState.board[index] = newState.turn;
        newState.isClicked[index] = true;
        // Check for win
        if (checkState(newState, checkRow, checkDiag, checkCol)) {
          console.log(checkState(state, checkRow, checkDiag, checkCol));
          console.log('done')
          onWin(newState,app)
          // if no Win or Draw
        } else {
          newState.turn = newState.turn === "x" ? "o" : "x";
          // replace global state object with newState
          updateState(newState);
          console.log(state);
          observe(createBoard,render, updateState, newState,app);
        }
      }
    });
  });
};
observe(createBoard,render, setState, state,app);
