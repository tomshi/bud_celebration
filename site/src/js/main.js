var isMobile = {
    Android: function() {
        return /Android/i.test(window.navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(window.navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
    },
    iPhone: function() {
        return /iPhone|iPod/i.test(window.navigator.userAgent);
    },
    Windows: function() {
        return /IEMobile/i.test(window.navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    },
    phone: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iPhone() || isMobile.Windows());
    },
    wechat: function() {
        return /micromessenger/i.test(window.navigator.userAgent.toLowerCase());
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
function setOrient(){
    if (window.addEventListener) {
        orient();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orient, false);
    }
}

function screenSize() {
    var validWidth;
    var validHeight;
    var screenRate = 16 / 9;
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    if (window.location.pathname.indexOf('ie') === -1){
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
}

function endingBtnEvent() {
    $("#buy").bind('click', function() {
        if (isMobile.wechat()) {
            $(".buy-tip-overlay").fadeIn();
        } else {
            window.open("http://detail.tmall.com/item.htm?spm=0.0.0.0.Tapm2W&id=42489336931");
        }
    });
    $(".buy-tip-overlay").bind('click', function() {
        $(this).fadeOut();
    });
    $(".show-share-box").bind('click', function() {
        $(".sharing-box").fadeIn();
        $("#current-url").text(window.location.href);
    });
    $(".close").bind('click', function() {
        $(".sharing-box").fadeOut();
    });
    $("#replay").bind('click', function() {
        window.location.reload();
    });
    $("#redo").bind('click', function() {
        if(window.location.pathname.indexOf('ie') >= 0){
            window.location.href = "/"
        }else {
            window.location.href = window.location.origin;
        }
    });
    if($("#wechat-share").length > 0){
        if(isMobile.any()){
            $("#wechat-share").hide();
        }
        if(isMobile.wechat()){
            $("#wechat-share").show();
        }
        $("#wechat-share").bind('click', function() {
            if (isMobile.wechat()){
                $(".share-tip-overlay").fadeIn();
            }else {
                if (window.location.pathname.indexOf('ie') > 0){
                    $("#qrcode-output").qrcode({
                        render: "table",
                        width: 200,
                        height: 200,
                        text: window.location.href
                    });
                }else {
                    $("#qrcode-output").qrcode({
                        width: 200,
                        height: 200,
                        text: window.location.href
                    });
                }
                $("#qrcode").fadeIn();
            }
        });
    }
    $(".share-tip-overlay").bind('click', function() {
        $(this).fadeOut();
    });
    $("#qrcode").bind('click', function() {
        $(this).hide();
        $("#qrcode-output").html("");
    });
}

$(function() {
    function init() {
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g,"") == "MSIE8.0" && window.location.pathname.indexOf('ie') === -1){
            if (getUrlParameterByName("id").length > 0) {
                window.location.href = "ie.html" + "?id=" + getUrlParameterByName("id");
            } else {
                window.location.href = "ie.html";
            }
        }
        if (navigator.appName != "Microsoft Internet Explorer" && window.location.pathname.indexOf('ie') >= 0){
            if (getUrlParameterByName("id").length > 0) {
                window.location.href = "index.html" + "?id=" + getUrlParameterByName("id");
            } else {
                window.location.href = "index.html";
            }
        }

        if (isMobile.phone()){
            $("#form").remove();
        }else {
            $("#form-mobile").remove();
        }
        screenSize();
        endingBtnEvent();
        if (isMobile.wechat()){
            configWxSharing();
        }
    }
    $(window).resize(function() {
        screenSize();
    });
    init();
});