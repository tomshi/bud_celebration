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
    var screenRate = 16 / 9;
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var validWidth;
    var validHeight;
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

function wxsharing() {
    _WXShare('http://toast-365days.com/img/share.jpg', 100, 100, '百威', '百威啤酒', '', '微信APPID(一般不用填)');
}

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orient, false);

window.addEventListener('resize', function() {
    screenSize();
});


function activeSubmitButton() {
    if ($("#username").val() !== "" && $("#occasion").val() !== "" && $("#time-d").val() !== "" && $("#time-m").val() !== "") {
        $("#submit").addClass("active");
    } else {
        $("#submit").removeClass("active");
    }
}

$(function() {
    $("#buy").bind('click', function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.indexOf("micromessenger") > 0){
            $(".buy-tip-overlay").fadeIn();
        }else {
            window.location.href = "http://detail.tmall.com/item.htm?spm=0.0.0.0.Tapm2W&id=42489336931";
        }
    });
    $("#share").bind('click', function(){
        $(".sharing-box").fadeIn();
    });
    $(".close").bind('click', function(){
        $(".sharing-box").fadeOut();
    });
    $("#replay").bind('click', function(){
        window.location.href = window.location.href + "?vid=" + ugc_id;
    });
    $("#redo").bind('click', function(){
        window.location.href = window.location.origin;
    });


    $(".input input").bind("focus", function() {
        var $this = $(this);
        var inputName = $this.attr("name");
        if (inputName == "occasion") {
            $("#type-list").slideDown();
        }
        $this.parent().addClass("focus");
    }).bind("blur", function() {
        $(this).parent().removeClass("focus");
        //$("#time").attr("placeholder", "在哪一天");
        $("#type-list").slideUp();
    }).bind("change", function() {
        activeSubmitButton();
    }).bind("keyup", function() {
        activeSubmitButton();
    });

    $("#type-list li").bind("click", function() {
        var val = $(this).text();
        $("#occasion").val(val);
        $("#type-list").slideUp();
    });

    $(".close-overlay").bind("click", function() {
        $(".overlay").fadeOut();
    });

    $(".avatar-save").bind("click", function() {
        $(".avatar-form").submit();
    });

    $("#submit").bind("click", function() {
        if ($("#submit").hasClass("active")) {
            $.ajax({
                type: "POST",
                url: "api/user/save",
                dataType: "json",
                data: {
                    name: $("#username").val(),
                    purpose: $("#occasion").val(),
                    date: $("#time-d").val() + "/" + $("#time-m").val(),
                    image: $("#avatarInput").val()
                }
            }).done(function(data) {
                $("#form").hide();
                getReady();
                //alert( "success" );
            }).fail(function(jqXHR, textStatus, errorThrown) {
                $.ajax({
                    url: "api/json/user_save.json",
                    cache: false
                }).done(function(json) {
                    console.log("JSON: " + json);
                });
            });
        }
    });
});

$(function() {
    function init() {
        screenSize();
        wxsharing();
        orient();
    }
    init();
});