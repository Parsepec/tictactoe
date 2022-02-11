/* Application State, a two dimentional with each internal array representing  a row,
 and a turn holding of two variables 'x' or 'o' defaults to 'x' as x always plays first */
const state = {
    board: [[], [], []],
    turn : 'x'
};


/**
 * Description
 * @param {object} newState
 * @returns {object}
 */
const setState = (newState) => {
    state = newState
};

/**
 * Performs 3 checks on a data structure
 * @param {object} cState
 * @param {function} check1
 * @param {function} check2
 * @param {function} check3
 * @returns {boolean}
 */
const check = (cState, check1, check2, check3) => {
    return check1(cState) || check2(cState) || check3(cState)
 }


/**
 * Checks that the "rows" in a two dimentional array assigned to the board key, corrsponds to the value of the "turn" key
 * @param {Object} cState
 * @returns {boolean}
 */
const checkRow = (cState) => {
    return  (cState.board[0][0] && cState.board[0][1] && cState.board[0][2] === cState.turn) ||
            (cState.board[1][0] && cState.board[1][1] && cState.board[1][2] === cState.turn) ||
            (cState.board[2][0] && cState.board[2][1] && cState.board[2][2] === cState.turn)
}

/**
 * Checks that the "columns" in a two dimentional array assigned to the board key, corrsponds to the value of the "turn" key
 * @param {object} cState
 * @returns {boolean}
 */
const checkCol = (cState) => {
    return  (cState.board[0][0] && cState.board[1][0] && cState.board[2][0] === cState.turn) ||
            (cState.board[0][1] && cState.board[1][1] && cState.board[2][1] === cState.turn) ||
            (cState.board[0][2] && cState.board[1][2] && cState.board[2][2] === cState.turn)
}

/**
 * Checks that the "diagnals" in a two dimentional array assigned to the board key, corrsponds to the value of the "turn" key
 * @param {object} cState
 * @returns {boolean}
 */
const checkDiag = (cState) => {
    return (cState.board[0][0] && cState.board[1][1] && cState.board[2][2] === cState.turn) ||
            (cState.board[0][2] && cState.board[1][1] && cState.board[2][0] === cState.turn)
}

 
const cells = document.getElementsByClassName('cell')
const app = document.getElementById('app');
const cell = document.createElement('div');
cell.setAttribute('class','cell')
app.appendChild(cell)


for (const cell of cells) {
    cell.addEventListener('click', () => {})
    cell.addEventListener('mouseover', () => { cell.innerHTML = 'x' })
    cell.addEventListener('mouseout', () => { cell.innerHTML = '' })
}
