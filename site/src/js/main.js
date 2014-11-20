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
        $(".landscape-overlay").fadeIn();
    }
    if(window.orientation == 90 || window.orientation == -90){
        $(".landscape-overlay").fadeOut();
    }
}

function screenSize(){
    var screenRate  = 16 / 9;
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

function wxsharing(){
    _WXShare('http://toast-365days.com/img/share.jpg',100,100,'百威','百威啤酒','','微信APPID(一般不用填)');
}

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orient, false);

window.addEventListener('resize',function(){
    screenSize();
});


function activeSubmitButton(){
    if($("#username").val() !== "" && $("#occasion").val() !== "" && $("#time").val() !== ""){
        $("#submit").addClass("active");
    }else {
        $("#submit").removeClass("active");
    }
}

$(function(){
    $(".input input").bind("focus", function(){
        var $this = $(this);
        var inputName = $this.attr("name");
        if (inputName == "occasion"){
            $("#type-list").slideDown();
        }else if (inputName == "time") {
            $this.attr("placeholder", "日日/月月");
        }else {}
        $this.parent().addClass("focus");
    }).bind("blur", function(){
        $(this).parent().removeClass("focus");
        $("#time").attr("placeholder", "在哪一天");
        $("#type-list").slideUp();
    }).bind("change", function(){
        activeSubmitButton();
    }).bind("keyup", function(){
        activeSubmitButton();
    });

    $("#type-list li").bind("click", function(){
        var val = $(this).text();
        $("#occasion").val(val);
        $("#type-list").slideUp();
    });

    $(".close-overlay").bind("click", function(){
        $(".overlay").fadeOut();
    });

    $(".avatar-save").bind("click", function(){
        $(".avatar-form").submit();
    });

    $("#submit").bind("click", function(){
        if ($("#submit").hasClass("active")) {
            $.ajax({
                type: "POST",
                url: "api/user/save.json",
                dataType: "json",
                data: {
                    username: $("#username").val(),
                    purpose: $("#occasion").val(),
                    date: $("#time").val(),
                    image: $("#avatarInput").val()
                },
                success: function(data) {
                    //
                }
            }).done(function( msg ) {
                alert( "Data Saved: " + msg );
                if (data == 0){
                    //
                }
            });
        }
    });
});

$(function(){
    function init(){
        screenSize();
        wxsharing();
        orient();
    }
    init();
});