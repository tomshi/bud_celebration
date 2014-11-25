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

function getAndroidVersion(ua) {
    var ua = ua || navigator.userAgent;
    var match = ua.match(/Android\s([0-9\.]*)/);
    return match ? match[1] : false;
}

function orient() {
    if (window.orientation == 180 || window.orientation == 0) {
        $(".landscape-overlay").fadeIn();
    }
    if (window.orientation == 90 || window.orientation == -90) {
        $(".landscape-overlay").fadeOut();
    }
}

function screenSize() {
    var validWidth;
    var validHeight;
    var screenRate = 16 / 9;
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    if (screenWidth / screenHeight > screenRate) {
        validWidth = Math.floor(screenHeight * screenRate);
        validHeight = Math.floor(screenHeight);
    } else {
        validWidth = Math.floor(screenWidth);
        validHeight = Math.floor(validWidth / screenRate);
    }
    $("#wrapper").css({
        width: validWidth,
        height: validHeight,
        marginTop: -validHeight / 2
    });
}

function endingBtnEvent() {
    $("#buy").bind('click', function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf("micromessenger") > 0) {
            $(".buy-tip-overlay").fadeIn();
        } else {
            window.open("http://detail.tmall.com/item.htm?spm=0.0.0.0.Tapm2W&id=42489336931");
        }
    });
    $(".buy-tip-overlay").bind('click', function() {
        $(this).fadeOut();
    });
    $("#share").bind('click', function() {
        $(".sharing-box").fadeIn();
    });
    $(".close").bind('click', function() {
        $(".sharing-box").fadeOut();
    });
    $("#replay").bind('click', function() {
        if (getUrlParameterByName("id").length > 0) {
            window.location.reload();
        } else {
            window.location.href = window.location.href + "?id=" + ugc_vid;
        }
    });
    $("#redo").bind('click', function() {
        window.location.href = window.location.origin;
    });
}

$(function() {
    function init() {
        screenSize();
        endingBtnEvent();
        if (window.addEventListener) {
            configWxSharing();
            wxsharing();
            orient();
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orient, false);
        }
        $(window).resize(function() {
            screenSize();
        });
    }
    init();
});