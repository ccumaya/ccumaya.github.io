
//Global site tag (gtag.js) - Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-5007622-2');


//ready
$(function () {
    console.log("ready!");

    //以下是有參數的狀況才會觸發
    var t = getUrlParameter('t'); //idxType
    var i = getUrlParameter('i'); //idx
    var p = getUrlParameter('p'); //prepare，預備的對手劇本

    //var timgurl = imgUrl(hauntNum, true);
    var imgUrl = 'https://raw.githubusercontent.com/ccumaya/BetrayalAtHouseOnTheHillHauntSelector/master/HauntImg/'+
        (t=='s' ? 'survival(1-101)' : 'traitor(1-101)') + '/' +
        i + '.jpg';

        
        
    $('#hauntTypeTxt').text( (t==='t') ? '叛徒手冊' : '英雄手冊');
        
    $('#imgHaunt').attr('src', imgUrl);//劇本主圖

    //new Image(imgUrl); // preloads the image
    //var h1 = document.getElementsByTagName('h1')[0];
    //h1.innerHTML = '<img src="'+imgUrl+'" alt="' + h1.innerHTML + '" class="hauntImg">';

    $('#imgDonate').attr('src', 'image/donateDes.png');
    $('#loadingImg').attr('src', 'image/loading.gif');
    $('#aDonate').attr('href', 'stickershop_imgmap.html');

    //蓋板說明
    if(t=='s')
    {
        $('#survivalTodo').css('display', 'inline-block');
    }
    else
    {
        $('#traitorTodo').css('display', 'inline-block');
    }

    //開始閱讀鈕
    $('#startReadBtn').click(function(){
        $('#popupPnl').css('display','none');

        //ga事件
        gtag('event', '閱讀劇本', {
            'send_to': 'UA-5007622-2',
            'event_category': (t=='s' ? '英雄' : '叛徒'),
            //eventAction: 'click',
            'event_label': i
        });

        //啟動閱讀倒數
        //timeCtrl.init(300, '#countDownTxt');
        //timeCtrl.setTimsUpCallback(timesUpPlay);

        if(t=='s')
        {
            survivalTimeSlot_3min();
        }else{
            traitorTimeSlot_5min();
        }

    });

    //延遲5s再顯示
    //delayedSpanDiv
    setTimeout(function(){ 
        $('.msg2').css('color','#000000');
        $('.msg2h').css('color','#ff7300');
        delayShowMsg3();
     }, 5000);

     //劇本角色對換鈕
    $('#hauntTypeTxt').click(switchHauntRole);
     


});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');
    var sParameterName;
    var i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function delayShowMsg3()
{
    setTimeout(function(){ 
        $('.msg3').css('color','#000000');
        $('.msg3h').css('color','#ff7300');
        delayShowMsg4();
     }, 2000);
}
function delayShowMsg4()
{
    setTimeout(function(){ 
        $('.msg4').css('color','#000000');
        $('.msg4h').css('color','#ff7300');
        delayShowBtn();
     }, 1000);
}
function delayShowBtn()
{
    setTimeout(function(){ 
        $('#startReadPnl').css('color','#000000');
        $('#loadingImgDiv').toggle();//切換可視
        $('#startReadPnl').toggle();//切換可視
     }, 2000);
}
/*     function setTimesUpPlay()
{
    setTimeout(timesUpPlay, 1000 * 60 * 5 );
} */
function timesUpPlay(){
         //沒辦法先預載，時間到了再播。只好要播時，再載
        $('#timesUpAudio').attr('src', 'image/TheXFilesTheme.mp3');//開始閱讀再下載音訊，避免搶主圖頻寬       
}
function timesUpAudio1(){
         //沒辦法先預載，時間到了再播。只好要播時，再載
        $('#timesUpAudio').attr('src', 'image/cricketNight.mp3');
        survivalTimeSlot_2min();//蟲叫了，再接2分鐘
}
function timesUpAudio2(){
         //沒辦法先預載，時間到了再播。只好要播時，再載
        $('#timesUpAudio').attr('src', 'image/thunderstorm.mp3');
}

function survivalTimeSlot_3min()//英雄3分鐘後接2分鐘閱讀時間加討論
{
    timeCtrl.init(180, '#countDownTxt');
    timeCtrl.setTimsUpCallback(timesUpAudio1);
}
function survivalTimeSlot_2min()
{
    timeCtrl.init(120, '#countDownTxt');
    timeCtrl.setTimsUpCallback(timesUpAudio2);
}

function traitorTimeSlot_5min()//叛徒5分鐘閱讀時間
{
    timeCtrl.init(300, '#countDownTxt');
    timeCtrl.setTimsUpCallback(timesUpAudio2);        
}



function forceCloseTransition()//強制關閉轉場引導div（有手機無法觸發引到，卡住）
{
    event.stopPropagation();//避免事件冒泡
    $('#popupPnl').css('display','none');
}

function switchHauntRole()//同劇本編號，轉換角色
{
    var t = getUrlParameter('t'); //idxType
    var i = getUrlParameter('i'); //idx
    var p = getUrlParameter('p'); //prepare，預備的對手劇本
    if(t==='s')
    {
        window.location.href = window.location.href
        .replace('t=s', 't=t')
        .replace('i='+i, 'p='+i)
        .replace('p='+p, 'i='+p);
    }
    else if(t==='t')
    {
        window.location.href = window.location.href
        .replace('t=t', 't=s')
        .replace('i='+i, 'p='+i)
        .replace('p='+p, 'i='+p);
    }

}


