var Player = {
    name : "Unkown player",
    flags: 0,
    bestScore : null,

    revealNumber: 1,
    increaseFlagsNumber: 0,
    retryNumber : 0,
    alreadyRevived : false,

    displayBonuses : function(){
        $('#sideRevealNumber').text(this.revealNumber);
        $('#sideRetryNumber').text(this.retryNumber);
    },

    displayName : function(){
        $('#playerInfo span:first').text("Joueur: " + this.name);
    },

    displayFlags : function(){
        $('#playerInfo span:last').text(" / Marqueurs: " + this.flags);
    }
}