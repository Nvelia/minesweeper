var timerID;
var timeBlock = $("#timer");

var Timer = {
    min: null,
    sec: null,
    mSec : null,
    time: null,

    init: function(){

            min = 00;
            sec = 00;
            mSec = 0;

        time = min + ":" + sec + ":" + mSec;
        timeBlock.text(time);
        timerID = setInterval(this.timer, 100);
        
    },
    
    timer: function(){
        if(mSec < 9){
            mSec++;
        }
        else{
            mSec = 0;
            if(sec < 59){
                sec++;
                if (sec < 10){
                    sec = "0" + sec;
                }
            }
            else{
                sec = "00";
                min++;
        
                if(min < 10){
                    min = "0" + min;
                }
            }

        }
        
        time = min + ":" + sec + ":" + mSec;
        timeBlock.text(time);
    }
}