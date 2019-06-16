(function(){

timeCtrl = { 
    countDownForSecs :300,
    startTime : 0, 
    timerId : 0,
    countDownTxtSelector : '',
    timesUpCallback :{} };


timeCtrl.init = function(cdSec, selector)//倒數幾秒、倒數顯示在哪個元件上
{
    timeCtrl.countDownForSecs = cdSec;//倒數幾秒？
    timeCtrl.countDownTxtSelector = selector;

    var timerStr = timeCtrl.formatSecond(timeCtrl.countDownForSecs);
    $(timeCtrl.countDownTxtSelector).text(timerStr);

    timeCtrl.startTime = new Date();
    timeCtrl.timerId = setInterval(timeCtrl.timerTick, 1000);
}
timeCtrl.timerTick = function()
{
    var nowTime = new Date();
    var timeDiff = nowTime - timeCtrl.startTime; //毫秒
    timeDiff /= 1000;//毫秒 換成 秒
    var passedSec = Math.round(timeDiff);//取整數，秒

    if(passedSec >= timeCtrl.countDownForSecs )//超過30秒，停止timer
        clearTimeout(timeCtrl.timerId);

    var timerStr = timeCtrl.formatSecond(timeCtrl.countDownForSecs - passedSec);
    $(timeCtrl.countDownTxtSelector).text(timerStr);
}
timeCtrl.formatSecond = function(secs) {          
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = parseInt( secs - (hr * 3600) - (min * 60));

    while ((''+min).length < 2) { min = '0' + min; }//補零
    while ((''+sec).length < 2) { sec = '0' + sec; }

    var min_sec = min + ':' + sec;//分：秒
    return (hr ? hr+':'+ min_sec : min_sec);//若有時，顯示時分秒，若沒有，只顯示分秒
}
timeCtrl.setTimsUpCallback = function(func){
    timeCtrl.timesUpCallback = func;
}


}());