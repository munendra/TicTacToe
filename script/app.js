$(document).ready(function () {
    $("button").click(function () {
        var isValid = custForm.validate();
        if (!isValid) {
            //  $("input").addClass('error');
        } else {
            $("input").removeClass('error');
            var player1 = new Player($('#player1Name').val(), 'X', 0);
            var player2 = new Player($('#player2Name').val(), 'O', 0);
            $('#Displayplayer1Name').text(player1.name + '(' + player1.symbol + ')');
            $('#Displayplayer2Name').text(player2.name + '(' + player2.symbol + ')');
            $('#displayMove').text('Move: ' + player1.name)
            game.init(player1, player2);
            game.resetScore();
        }
    });
    $('.cell').click(function () {
        if (game.hasPlayer()) {
            var index = $(this).attr('data-index');
            game.move(index);
        }
    });
    $('#btnUndo').click(function () {
        if (game.hasPlayer()) {
            game.undoMove();
        }
    });
});