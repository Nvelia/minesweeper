var blinkID;

var Game = {
    end : null,
    firstClick : null,
    Player1 : null,
    bonus: false,
    tempName : null,

    createPlayer : function(name, flags, bonus){
        this.Player1 = Object.create(Player);
        this.Player1.name = name;
        this.Player1.flags = flags;
        $('#player').append("<div>Nom: " + this.Player1.name + " / Flags: " + this.Player1.flags + "</div>")
    },

    init : function(){
        var selectedDifficulty = $(".difficulty").val();
        this.end = false;
        this.firstClick = false;

        if ($('input[name="bonusCheckbox"]').is(":checked"))
        {
            this.bonus = true;
        }
        else{
            this.bonus = false;
        }
        
        switch(selectedDifficulty){
            case '':
                return;
            case 'veryEasy':
                Board.rows = 10;
                Board.columns = 10;
                Board.mines = 5;
                break;
            case 'easy':
                Board.rows = 10;
                Board.columns = 10;
                Board.mines = 10;
                break;
            case 'medium':
                Board.rows = 10;
                Board.columns = 10;
                Board.mines = 15;
                break;
            case 'hard':
                Board.rows = 10;
                Board.columns = 10;
                Board.mines = 25;
                break;
            default:
                alert("Aucune difficulté selectionnée.");
        }
        
        
        Board.init(Board.rows, Board.columns);
        Board.putMines();
        Board.reveal();
        if(this.tempName == null){
            this.tempName = prompt("Entrez votre nom: ");
        }
        
        this.createPlayer(this.tempName, Board.mines);
        Game.Player1.displayBonuses();
        Game.Player1.displayName();
        Game.Player1.displayFlags();
    },

    customGame : function(){

        var width = $('input[name="width"]').val();
        var height = $('input[name="height"]').val();
        var mines = $('input[name="mines"]').val();

        this.end = false;
        this.firstClick = false;

        if ($('input[name="bonusCheckbox"]').is(":checked"))
        {
            this.bonus = true;
        }
        else{
            this.bonus = false;
        }

        if ($('input[name="bonusCheckbox"]').is(":checked"))
        {
            this.bonus = true;
        }
        else{
            this.bonus = false;
        }

        if(width > 0 && height > 0 && mines > 0){
            if(width > 25){
                alert("Largeur trop importante. Veuillez entrer une valeur inférieure à 25.");
                return;
            }
            if(height > 25){
                alert("Largeur trop importante. Veuillez entrer une valeur inférieure à 25.");
                return;
            }
            if(mines > 200){
                alert("Largeur trop importante. Veuillez entrer une valeur inférieure à 100.");
                return;
            }
            if(mines > ((width * height) / 3)){
                alert("Trop Grand nombre de mine saisi. Vous ne pouvez avoir qu'au maximum 30% de la surface.");
                return;
            }
        }
        else{
            alert('Valeur incorrecte ou non remplie. Veuillez remplir tous les champs.');
            return;
        }

        Board.rows = height;
        Board.columns = width;
        Board.mines = mines;

        Board.init(Board.rows, Board.columns);
        Board.putMines();
        Board.reveal();
        this.createPlayer("Marc", Board.mines)
    },

    gameOver: function(){
        this.end = true;
        if(this.Player1.retryNumber === 1){
            clearInterval(timerID);
            blinkID = setInterval(function(){
                $('.bonus:last').toggleClass("blink")
            }, 1000)
        }
        else{
            Board.showMines();
            $('#flashtag').fadeIn("slow");
            $('#flashtag p').text('Partie perdue.');
            clearInterval(timerID);
        }

    },

    gameWon: function(){
        var hiddenBlocs = $('.bloc.hidden');
        if(Board.blocsMined.length === hiddenBlocs.length){
            this.end = true;
            Board.showMines();
            $('#flashtag').fadeIn("slow");
            $('#flashtag p').text('Félicitations, vous avez gagné!');
            clearInterval(timerID);
        }
        else{
            return;
        }
    }

}