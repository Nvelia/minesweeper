var Board = {
        rows : 0,
        columns : 0,
        mines : 0,
        blocsMined : [],
        blocsNotMined : [],
        ratio : 1,

        init : function(x, y){
            var row = x;
            var column = 0;
            var dimension = x * y;
            var count = -1;
            var grid = $('#board');
            this.blocsMined = [];
            this.blocsNotMined = [];
            $('#blockTime').show();
            if(Game.bonus === true) { $('#playerBonuses').show(); }
            else { $('#playerBonuses').hide(); }
            $('#flashtag').hide();
            
            for(i = 0; i < dimension; i++){
                count++;
                row++;
                if(count % x == 0){
                    var line = document.createElement("div");
                    grid.append(line);
                    row = row - x;
                    column++;
                }
                bloc = document.createElement("div");
                $(bloc).addClass("bloc");
                bloc.dataset.row = row;
                bloc.dataset.column = column;
                $(bloc).addClass("hidden");
                $(bloc).addClass("hover");
                line.append(bloc);
            }
        },

        putMines : function(){
            var blocs = $(".bloc");
            var minesSet = 0;
        
            while(minesSet < this.mines){
                for(i = 0; i < blocs.length; i++){
                    var number =  Math.floor(Math.random() * Math.floor(10)); // Génération d'un nombre aléatoire pour choisir si l'on place une mine ou non sur la position courante.
                    if(number === 0 && minesSet < this.mines){
                        if($(blocs[i]).hasClass("mine")){
                            break;
                        }
                        $(blocs[i]).addClass("mine");
                        this.blocsMined.push(blocs[i]);
                        minesSet++;
                    }
                }
            }
    
            var notMined = $(".bloc:not(.mine)");
            for(i = 0; i < notMined.length; i++){
                this.blocsNotMined.push(notMined[i]);
            }
        },

        showMines : function(){     
            for(i=0; i < this.blocsMined.length; i++){
                $(this.blocsMined[i]).removeClass("hidden");
            }
    
            $(".bloc").removeClass("hover");
        },

        isMined : function(row, col){
            var mined = false;
    
            for(i=0; i < this.blocsMined.length; i++){
                if($(this.blocsMined[i]).data("row") === row && $(this.blocsMined[i]).data("column") === col){
                    mined = true;
                }
            }
    
            return mined;
        },

        checkArround : function(row, col){ // Vérification des cases alentours
            var minesNumber = 0;
    
            if(this.isMined(row-1,col-1)){ // Haut - gauche
                minesNumber++;
            }
            if(this.isMined(row-1,col)){ // Haut
                minesNumber++;
            }
            if(this.isMined(row-1,col+1)){ // Haut - droite
                minesNumber++;
            }
            if(this.isMined(row,col+1)){ // Droite
                minesNumber++;
            }
            if(this.isMined(row+1,col+1)){ // Bas - droite
                minesNumber++;
            }
            if(this.isMined(row+1,col)){ // Bas
                minesNumber++;
            }
            if(this.isMined(row+1,col-1)){ // Bas - gauche
                minesNumber++;
            }
            if(this.isMined(row,col-1)){ // Gauche
                minesNumber++;
            }
    
            return minesNumber;
        },

        unlockBonuses : function(){
            if(Game.bonus === false){
                return;
            }
            var index = 0;

            index = Math.floor(Math.random() * (51- this.ratio)) + this.ratio;
            this.ratio += 0.5; // augmentation des chances si aucun bonus débloqué
            
            if(index > 48){ // 4% de chance de débloquer un bonus Reveal
                if(index === 50){ // 2% de chance de débloquer un bonus Retry
                    if(Game.Player1.retryNumber < 1 && Game.Player1.alreadyRevived === false){
                        Game.Player1.retryNumber += 1;
                        Game.Player1.displayBonuses();
                    }
                }
                this.ratio = 1;
                if(Game.Player1.revealNumber < 3){
                    Game.Player1.revealNumber += 1;
                    Game.Player1.displayBonuses();
                }
                else{
                    return;
                }        
            }     
        },
    
        displayBloc : function(row, col, withoutBonus){          
                var bloc = $('*[data-row="'+ parseInt(row) +'"][data-column="'+ parseInt(col) +'"]');
                if($(bloc).hasClass("hidden")){
                    var mines = this.checkArround(row, col);
                    if(!$(bloc).hasClass('flagged')){
                        bloc.removeClass('hidden');
                        if(withoutBonus === true){ Board.unlockBonuses(); }
                        bloc.removeClass('hover');
                        if(mines !== 0){
                            $(bloc).text(mines)
                            $(bloc).addClass("textNumber")
                        }
                    }                
    
                    if(mines === 0){ // S'il n'y a aucune mine alentour, on rappelle la fonction sur chacune des cases adjacentes.
                        if(withoutBonus === true){
                            this.displayBloc(row+1,col-1, true);
                            this.displayBloc(row+1,col, true);
                            this.displayBloc(row+1,col+1, true);
                            this.displayBloc(row,col-1, true);
                            this.displayBloc(row,col+1, true);
                            this.displayBloc(row-1,col-1,true);
                            this.displayBloc(row-1,col, true);
                            this.displayBloc(row-1,col+1, true);
                        }
                        else{
                            this.displayBloc(row+1,col-1);
                            this.displayBloc(row+1,col);
                            this.displayBloc(row+1,col+1);
                            this.displayBloc(row,col-1);
                            this.displayBloc(row,col+1);
                            this.displayBloc(row-1,col-1);
                            this.displayBloc(row-1,col);
                            this.displayBloc(row-1,col+1);
                        }
                    }
                    Game.gameWon();
                }      
        },
    
        reveal : function(){
            $('body').on('click', '.bloc', function(){
                if(Game.firstClick === false){
                    Timer.init()
                    
                    Game.firstClick = true;
                }
                if(Game.end === true){
                    return;
                }
                if(!$(this).hasClass('flagged')){
                    var row = $(this).data("row");
                    var column = $(this).data("column");
                    var _this = $(this);
        
                    if(Board.isMined(row, column)){
                        Game.gameOver();
                    }
                    else{
                        Board.displayBloc(row, column, true)
        
                    }
                }
                else{
                    return false;
                }
                
            })
        }
    }