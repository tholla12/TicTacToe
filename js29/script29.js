$(document).ready(function () {
    const arrayGameBoard = Array.from($('.col'));
    const showAllPlayer = document.querySelector('.show-Allplayer');
    const resetButton = document.querySelector('#replay');
    let announcer = document.querySelector('.win');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winLines = winningLines[i];
            const a = board[winLines[0]];
            const b = board[winLines[1]];
            const c = board[winLines[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        if (!board.includes(''))
            announce(TIE);

    }
    const announce =function (type) {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">⭕</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">❌</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Draw❌⭕';
        }
        announcer.classList.remove('hide');
      };
      const isValidAction =function (tile)  {
        if (tile.innerText === 'X' )
        {
            return false;
        }
        if(tile.innerText === 'O'){
            return false;
        }
      
        return true;
      };
      // ||
      const updateBoardGame = function (index)  {
        board[index] = currentPlayer;
      }

      const changePlayer =function ()  {
        showAllPlayer.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        showAllPlayer.innerText = currentPlayer;
        showAllPlayer.classList.add(`player${currentPlayer}`);
      }
      const userAction = function (tile, index)  {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoardGame(index);
            handleResultValidation();
            changePlayer();
        }
      }
      const resetBoardGame = function () {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.innerText = '';
        if (currentPlayer === 'O') {
            changePlayer();
        }
        arrayGameBoard.forEach(function (tile)  {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        }); 
      }
      arrayGameBoard.forEach( function (tile, index)  {
        tile.addEventListener('click', () => userAction(tile, index));
      });
      
      resetButton.addEventListener('click', resetBoardGame);
      });
      

