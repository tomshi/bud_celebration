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
    if (screenHeight < 320){
        validHeight = 320;
    }else {
        if (screenWidth / screenHeight > screenRate) {
            validWidth = Math.floor(screenHeight * screenRate);
            validHeight = Math.floor(screenHeight);
        } else {
            validWidth = Math.floor(screenWidth);
            validHeight = Math.floor(validWidth / screenRate);
        }
    }
    $("#wrapper").css({
        width: validWidth,
        height: validHeight,
        marginTop: -validHeight / 2
    });
}
var wxData = {
    "appId": "", // 服务号可以填写appId
    "imgUrl" : 'http://toast-365days.com/img/share.jpg',
    "link" : document.location.href,
    "desc" : '',
    "title" : ""
};

function configWxSharing(){
    WeixinApi.ready(function(Api) {

        // 分享的回调
        var wxCallbackFriend = {
            // 分享操作开始之前
            confirm : function() {
                requestBaiduTracking("video,share", "chat");
                requestNielsenTracking("video,share,chat");
                requestGATracking("video,share", "chat");
            }
        };

        var wxCallbackTimeline = {
            // 分享操作开始之前
            confirm : function() {
                requestBaiduTracking("video,share", "moments");
                requestNielsenTracking("video,share,moments");
                requestGATracking("video,share", "moments");
            }
        };

        // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
        Api.shareToFriend(wxData, wxCallbackFriend);

        // 点击分享到朋友圈，会执行下面这个代码
        Api.shareToTimeline(wxData, wxCallbackTimeline);

    });
}

function getSharingUrl(){
    var url = document.location.href;

    if(url.indexOf("?id=") <0 && ugc_vid !== undefined){
        if(url.indexOf("?") < 0){
            url = url + "?id=" + ugc_vid;
        }
        else{
            url = url + "&id=" + ugc_vid;
        }
    }

    return url;
}

function wxsharing() {
    var name = ugc_name !== undefined ? $.trim(ugc_name) : "";
    var purpose = ugc_purpose !== undefined ? $.trim(ugc_purpose) : "";
    
    wxData.link = getSharingUrl();
    wxData.imgUrl = 'http://toast-365days.com/img/share.jpg';

    if (name.length > 0 && purpose.length > 0) {
        wxData.title = '酿造' + name + '的欢庆时刻';
        wxData.desc = name + '独一无二的百威欢庆视频 ，快来围观，为TA的' + purpose + '举杯！';
    } else {
        wxData.title = '用你的故事，打造独一无二的百威定制啤酒';
        wxData.desc = '你的故事，值得历久弥新。百威推出专属定制瓶啤酒，为生命中每个珍贵瞬间举杯';
    }
}

$(function() {
    $("#buy").bind('click', function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf("micromessenger") > 0) {
            $(".buy-tip-overlay").fadeIn();
        } else {
            window.open("http://detail.tmall.com/item.htm?spm=0.0.0.0.Tapm2W&id=42489336931");
        }
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
});

$(function() {
    function init() {
        screenSize();
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