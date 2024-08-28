var row = 0;
var column = 24;
var color = 1;
var middle= "addPuzzlePieceToBoard(true, true,true,true,'middle')"
var topRight = "addPuzzlePieceToBoard(false, false, true, true, 'topRight')"
var bottomLeft = "addPuzzlePieceToBoard(true, true, false, false, 'bottomLeft')"
var topLeft = "addPuzzlePieceToBoard(false, true, true, false, 'topLeft')"
var bottomRight = "addPuzzlePieceToBoard(true, false, false, true, 'bottomRight')"
var topEdge = "addPuzzlePieceToBoard(false, true, true, true, 'topEdge')"
var bottomEdge = "addPuzzlePieceToBoard(true, true, false, true, 'bottomEdge')"
var rightEdge = "addPuzzlePieceToBoard(true, false, true, true, 'rightEdge')"
var leftEdge = "addPuzzlePieceToBoard(true, true, true, false, 'leftEdge')"

displaySquareButtons()

function displaySquareButtons() {
    createSquares('buttons', true, true, true, true, 1,"","", 'middle')
    createSquares('buttons', false, false, true, true, 1,"","", 'topRight')
    createSquares('buttons', true, true, false, false,1,"","", 'bottomLeft')
    createSquares('buttons', false, true, true, false,1,"","", 'topLeft')
    createSquares('buttons', true, false, false, true,1,"","",'bottomRight')
    createSquares('buttons', false, true, true, true,1,"","", 'topEdge')
    createSquares('buttons', true, true, false, true,1,"","", 'bottomEdge')
    createSquares('buttons', true, false, true, true,1,"","", 'rightEdge')
    createSquares('buttons', true, true, true, false,1,"","", 'leftEdge')
}

function createSquares(toId, hasTop, hasRight, hasBottom, hasLeft, color, leftPosition, topPosition, id) {
    var style = '';
    var top = hasTop ?`<span class="t"></span>` : '';
    var right = hasRight ? `<span class="r"></span>` : '';
    var bottom = hasBottom ? `<span class="b"></span>` : '';
    var left = hasLeft ? `<span class="l"></span>` : '';

    if (leftPosition !== undefined) {
        style = `left: ${leftPosition + 0.5}em; top: ${topPosition + 0.5}em`;
    }
    document.getElementById(toId).innerHTML += /*html*/`
    <div id='${id}' class="square${color} ${id}" style="${style}">
        ${top}
        ${right}
        ${bottom}
        ${left}
    </div>
    `;
    if (id === "topRight") {
        document.getElementById(id).setAttribute("onclick", topRight)
        return
    }
}

function addPuzzlePieceToBoard(hasTop,hasRight, hasBottom, hasLeft, id) {
    createSquares('board', hasTop, hasRight, hasBottom, hasLeft, color, column, row, id)

    column -= 6;

    if(column === -6) {
    column = 24;
    row += 6
    }

    if (color === 1) { color = 2 } else { color = 1 }
    activateSquare(id)
}


function activateSquare(id) {
    var lastId = id

    if(row === 0) {
        if(column <= 18 && column > 6 ) {
            removeOnclick(lastId)
            addOnClick('topEdge', topEdge)
        } else if (column === 0) { 
            removeOnclick(lastId)
            addOnClick('topLeft', topLeft)
        } 
    } else if (row === 24) {
        if (column === 24) {
            removeOnclick(lastId)
            addOnClick('bottomRight', bottomRight)
        } else if (column <= 18 && column > 6) {
            removeOnclick(lastId)
            addOnClick('bottomEdge', bottomEdge)
        } else if (column === 0) {
            removeOnclick(lastId)
            addOnClick('bottomLeft', bottomLeft)
        }
    } else {
        if (column === 24) {
            removeOnclick(lastId)
            addOnClick('rightEdge', rightEdge)
        } else if (column <= 18 && column > 6 ) {
            removeOnclick(lastId)
            addOnClick('middle', middle)
        } else if (column === 0) {
            removeOnclick(lastId)
            addOnClick('leftEdge', leftEdge)
        }
    }
    setTimeout(() => {
        winCondition()
    }, 500);
    
}

function removeOnclick(id) {
    var list = document.getElementsByClassName(id)
    for (let index = 0; index < list.length; index++) {
        list[index].removeAttribute('onclick')
    }
}

function addOnClick(newId, newIdVariable) {
    const newClass = document.getElementsByClassName(newId)
    return newClass[newClass.length-1].setAttribute('onclick', newIdVariable)
}

function winCondition() {
    if (row > 24) {
        var answer = confirm('Congratulations!'+' Start New Game?')
        if(answer === true) {
            location.reload()
        }
    }
}

