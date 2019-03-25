var Bonus = {

    reveal : function(){
        var condition = false;
        while(condition == false){
            var randomRow  = Math.floor(Math.random() * Board.rows) + 1;
            var randomCol  = Math.floor(Math.random() * Board.columns) + 1;
            var bloc = $('*[data-row="'+ parseInt(randomRow) +'"][data-column="'+ parseInt(randomCol) +'"]');
            if(Board.isMined(randomRow, randomCol)){
                condition = false;
            }
            else if(!$(bloc).hasClass('hidden')){
                condition = false;
            }
            else{
                condition = true
            }
        }
        Board.displayBloc(randomRow, randomCol);
    },

    increaseFlags : function(player){
        Player.flags += 5;
        if(Player.flags > Board.mines){
            Player.flags = Board.mines;
        }
        
    },

    retry : function(){
        if(Game.end !== true){
            return;
        }

        Game.end = false;
        clearInterval(blinkID);
        $('.bonus:last').removeClass("blink");
        timerID = setInterval(Timer.timer, 100);
    }

}
