$(function(){

    $(document).on('click', '#solo', function(){
         $('#solo').after(soloDiv);
         $('#soloDiv').toggle();
    });

    $(document).on('click', '#customLink', function(){
        $('#settings').toggle();
        $('#customSettings').toggle();
        $('input[name="bonusCheckbox"]').prop('checked',false);
    });

    $(document).on('click', '#difficultyLink', function(){
        $('#settings').toggle();
        $('#customSettings').toggle();
        $('input[name="bonusCheckbox"]').prop('checked',false);
    });

    $(document).on("contextmenu", ".bloc", function(e){
        if(Game.firstClick === false){
            Timer.init()
            Game.firstClick = true;
        }

        if(Game.end === true){
            return false;
        }
    
        if($(this).hasClass('flagged')){
            $(this).removeClass('flagged');
            $(this).toggleClass('hover');
            Game.Player1.flags += 1;
            Game.Player1.displayFlags();
            return false;
        }
        else{
            if($(this).hasClass('hidden') && Game.Player1.flags > 0){
                $(this).addClass('flagged');
                $(this).toggleClass('hover');
                Game.Player1.flags -= 1;
                Game.Player1.displayFlags();
            }
            return false;
        }
        return false;  
    })

    
    $(document).on('click', '#difficultyBtn', function(){
        $('#game').load('game.html', function(){
            clearInterval(timerID);
            timeBlock.text("0:0:0");
            Game.init();
        });
    });
    

    $(document).on('click', '#customBtn', function(){
        $('#game').load('game.html', function(){
            clearInterval(timerID);
            timeBlock.text("0:0:0");
            Game.customGame();
        });
    });

    $(document).on('click', '.bonus:first', function(){
        if(Game.Player1.revealNumber > 0){
            Bonus.reveal();
            Game.Player1.revealNumber -=1;
            Game.Player1.displayBonuses();
        }
        else{
            $('#flashtag').fadeIn("slow");
            $('#flashtag p').text('Vous n\'avez pas de bonus "Reveal"');
            setTimeout(function(){
                $('#flashtag p').text();
                $('#flashtag').fadeOut("slow");
            }, 3000);
            
        }
    });

    $(document).on('click', '.bonus:last', function(){
        if(Game.end === true){
            if(Game.Player1.retryNumber > 0){
                Bonus.retry();
                Game.Player1.retryNumber -=1;
                Game.Player1.displayBonuses();
            }
        }
        else{
            $('#flashtag').fadeIn("slow");
            $('#flashtag p').text('Vous ne pouvez pas utiliser le bonus "Retry". La partie est en cours.');
            setTimeout(function(){
                $('#flashtag p').text();
                $('#flashtag').fadeOut("slow");
            }, 5000);
        }
    })

});