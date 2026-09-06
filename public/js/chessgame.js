const socket = io();
const chess = new Chess()

const boardElements = document.querySelector('.chessboard')
let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;
const getPiecesUnicode =(piece) => {
    const unicodePieces = {
        p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔',
        P: '♟', R: '♜', N: '♞', B: '♝', Q: '♛', K: '♚',
    }
    return unicodePieces[piece.type] || "";
}

const renderBoard = () => {
    const board = chess.board()
    boardElements.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement('div')
            squareElement.classList.add('square', 
                (rowindex + squareindex) % 2 === 0? 'light': 'dark')
            squareElement.dataset.row = rowindex
            squareElement.dataset.col = squareindex;
            if(square){
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece', square.color === 'w'? 'white': 'black', )
                pieceElement.innerHTML = getPiecesUnicode(square)
                pieceElement.draggable = playerRole === square.color;
                pieceElement.addEventListener('dragstart', (e) => {
                    if(pieceElement.draggable){
                        draggedPiece = pieceElement;
                        sourceSquare = {row: rowindex, col: squareindex}; 
                        e.dataTransfer.setData('text/plain', "")
                    }
                })
                pieceElement.addEventListener('dragend', (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                })
                squareElement.appendChild(pieceElement);
            }
            squareElement.addEventListener('dragover', (e)=>{
                e.preventDefault()
                if(draggaedPiece){
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    }
                    handleMove(sourceSquare, targetSquare)
                }
            })
            boardElements.appendChild(squareElement)
        })
    })
}


const handleMove = () => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to : `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q',
    }    
}

renderBoard();