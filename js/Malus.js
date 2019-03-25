var Malus = {

    decreaseFlags : function(player){
        Player.flags -= 5;
        if(Player.flags < 0){
            Player.flags = 0;
        }
    },

    deleteAll : function(){
        Game.Player1.bonus = [];
        Game.Player2.bonus = [];
    }



}