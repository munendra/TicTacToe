var game = {
    moveCount: 0,
    totalCell: 9,
    message: '',
    init: function (player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    },
    hasPlayer: function () {
        if (this.player1 && this.player2) {
            return true;
        }
        return false;
    },
    move: function (index) {
        var player;
        if (this.moveCount == 9) {
            alert('invalid move');
            return;
        }
        if (this.moveCount % 2 == 0) {
            player = this.player1;
        } else {
            player = this.player2;
        }
        var $cell = $('#cell-' + index);
        if (this.isCellEmpty($cell)) {
            this.cellMark(player, $cell);
            var res = this.winCheck($cell.text());
            if (!res) {
                this.moveCount = this.moveCount + 1;
                this.displayMove();
                if (this.moveCount == 9) {
                    this.draw();
                }
            }
        }
    },
    displayMove: function () {
        var name = '';
        if (this.moveCount % 2 == 0) {
            name = this.player1.name;
        } else {
            name = this.player2.name;
        }
        $('#displayMove').text('Move: ' + name)

    },
    draw: function () {
        $('#displayRes').text('Game draw');
        this.resetGame();
    },
    cellMark: function (player, $cell) {
        $cell.text(player.symbol);
        $cell.data('info', player.name);
    },
    isCellEmpty: function ($cell) {
        if ($cell.text()) {
            return false;
        }
        return true;
    },
    winCheck: function (symbol) {
        var wincells = this.winCells();
        for (var i = 0; i < wincells.length; i++) {
            var fcell = $('#cell-' + wincells[i][0]).text();
            var scell = $('#cell-' + wincells[i][1]).text();
            var tcell = $('#cell-' + wincells[i][2]).text();
            if (symbol == fcell && symbol == scell && symbol == tcell) {
                this.win(symbol);
                return true;
                break;
            }
        }
        return false;
    },
    win: function (symbol) {
        if (this.player1.symbol == symbol) {
            $('#displayRes').text('Winner: ' + this.player1.name);
            this.player1.score += 1;
        }
        if (this.player2.symbol == symbol) {
            $('#displayRes').text('Winner: ' + this.player2.name);
            this.player2.score += 1;
        }
        this.updateScore();
        this.resetGame();
    },
    updateScore: function () {
        $('#Displayplayer1Score').text(this.player1.score);
        $('#Displayplayer2Score').text(this.player2.score);
        $('#TotalMatch').text(this.player2.score + this.player1.score);
    },
    resetScore: function () {
        $('#Displayplayer1Score').text('0');
        $('#Displayplayer2Score').text('0');
        $('#TotalMatch').text('0');
        $('#displayRes').text('Winner: ' + '');
        this.player1.score = 0;
        this.player2.score = 0;
    },
    resetGame: function () {
        for (var i = 0; i <= this.totalCell; i++) {

            this.clearCell(i);
        }
        this.moveCount = 0;

    },
    clearCell: function (index) {
        $cell = $('#cell-' + index);
        $cell.text('');
    },

    undoMove: function () {
        if (this.moveCount >= 1) {
            this.moveCount -= 1;
            this.displayMove();
            this.clearCell(this.moveCount);
        }
    },

    winCells: function () {
        var winCells = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ];
        return winCells;
    }
}