var isMobile = {
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

function orient(){
    if(window.orientation == 180 || window.orientation == 0){
        //$(".portrait-overlay").show();
    }
    if(window.orientation == 90 || window.orientation == -90){
        //$(".portrait-overlay").hide();
    }
}

function screenSize(){
    var screenRate  = 16 / 9 ;
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var validWidth;
    var validHeight;
    if(screenWidth / screenHeight > screenRate) {
        validWidth = Math.floor(screenHeight * screenRate);
        validHeight = Math.floor(screenHeight);
    }
    else {
        validWidth = Math.floor(screenWidth);
        validHeight = Math.floor(validWidth / screenRate);
    }
    $("#wrapper").css({
        width : validWidth,
        height : validHeight,
        marginTop: -validHeight/2
    });
}

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orient, false);

window.addEventListener('resize',function(){
    screenSize();
});


$(function(){
    function init(){
        screenSize();
    }
    init();
});