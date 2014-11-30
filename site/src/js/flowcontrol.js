var ugc_name, ugc_purpose, ugc_date, ugc_image_url, ugc_vid, hostname, image_url;
var console = window.console || {
	log: $.noop
};
image_url = "";
hostname = "http://budquality-bud.stor.sinaapp.com/";

function controlFlow() {
    // check the param 'vid'
    var videoId = getUrlParameterByName("id");
    if (videoId) {
        $.ajax({
            url: "api/user/load/" + videoId
        }).done(function(data) {
            processUserLoadData(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $.ajax({
                url: "api/json/user_load.json",
                cache: false
            }).done(function(json) {
                console.log("user load JSON: " + json);
                processUserLoadData(json);
            });
        });
    } else {
        if (window.location.pathname.indexOf('ie') > 0){
            $('#form').fadeIn(800);
        }else {
            $("#toast-first").show().trigger('start');
        }
    }
}

function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function processUserLoadData(data) {
    if (data) {
        if (data.is_success) {
            ugc_name = data.data.name;
            ugc_purpose = data.data.purpose;
            ugc_date = data.data.date;
            ugc_image_url = data.data.image_url;
            if (ugc_image_url) {
                ugc_image_url = hostname + ugc_image_url;
            }
            ugc_vid = data.data.user_id;
            if (isMobile.any()){
                wxsharing();
                setOrient();
            }
            if (window.location.pathname.indexOf('ie') > 0){
                dataReadyByIE();
            }else {
                dataReady();
                $("#form").add('#toast-first').remove();
            }
        } else {
            console.log(data.message);
        }
    } else {
        console.log("No UGC with id:" + videoId);
    }
}

function submitUserData() {
    var day = "0" + $.trim($("#time-d").val());
    var month = "0" + $.trim($("#time-m").val());
    day = day.substring(day.length - 2);
    month = month.substring(month.length - 2);
    $.ajax({
        type: "POST",
        url: "api/user/save",
        dataType: "json",
        data: {
            name: $.trim($("#username").val()),
            purpose: $.trim($("#purpose").val()),
            date: month + "/" + day,
            image: image_url
        }
    }).done(function(data) {
        processUserLoadData(data);
        if (isMobile.wechat()){
            window.location.href = getSharingUrl();
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        $.ajax({
            url: "api/json/user_save.json",
            cache: false
        }).done(function(json) {
            console.log("JSON: " + json);
            processUserLoadData(json);
        });
    });
}



function activeSubmitButton() {
    if ($("#username").val() !== "" && $("#purpose").val() !== "" && $("#time-m").val() !== "" && $("#time-d").val() !== "" && $("#username").val() != "为谁欢庆" && $("#purpose").val() != "庆祝什么") {
        $("#submit").addClass("active");
    } else {
        $("#submit").removeClass("active");
    }
}

function calcLength(input) {
    var length = 0;
    if (input && input.length > 0) {
        $.each(input.split(""), function(index, val) {
            if (isChinese(val)) {
                length = length + 3;
            } else {
                length = length + 1;
            }
        });
    }

    return length;
}

function isChinese(temp) {
    var re = /[^\u4e00-\u9fa5]/;
    if (re.test(temp)) return false;
    return true;
}

function validateInput() {
    var name = $.trim($("#username").val());
    var purpose = $.trim($("#purpose").val());
    var day = $.trim($("#time-d").val());
    var month = $.trim($("#time-m").val());

    if (name.length <= 0 || calcLength(name) > 15) {
        $(".name").addClass("error");
        $(".name-error").show();
        console.log("The name " + name + " is not valid.");
        return false;
    }
    else{
        $(".name").removeClass("error");
        $(".name-error").hide();
    }

    if (purpose.length <= 0 || calcLength(purpose) > 15) {
        $(".purpose").addClass("error");
        $(".purpose-error").show();
        console.log("The purpose " + purpose + " is not valid.");
        return false;
    }
    else{
        $(".purpose").removeClass("error");
        $(".purpose-error").hide();
    }

    var intDay = parseInt(day);
    var intMonth = parseInt(month);

    if (intDay != day) {
        $(".time").addClass("error");
        console.log("The day " + day + " is not valid.");
        return false;
    }
    else{
        $(".time").removeClass("error");
    }

    if (intMonth != month) {
        $(".time").addClass("error");
        console.log("The month " + month + " is not valid.");
        return false;
    }
    else{
        $(".time").removeClass("error");
    }

    if (intDay <= 0 || intDay > 31) {
        $(".time").addClass("error");
        console.log("The day " + day + " is not valid.");
        return false;
    }
    else{
        $(".time").removeClass("error");
    }

    if (intMonth <= 0 || intMonth > 12) {
        $(".time").addClass("error");
        console.log("The month " + month + " is not valid.");
        return false;
    }
    else{
        $(".time").removeClass("error");
    }

    return true;
}

function hasPlaceholderSupport() {
    var attr = "placeholder";
    var input = document.createElement("input");
    return attr in input;
}

function addPlaceholder() {
    var support = hasPlaceholderSupport();
    if (!support) {
        $(".input input").bind("focus", function() {
            if ($(this).val() == this.defaultValue) {
                $(this).val("");
            }
        }).bind("blur", function() {
            if ($(this).val() == "") {
                $(this).val(this.defaultValue);
            }
        });
    } else {
        $(".input input").val("");
    }

    $(".input input").bind("focus", function() {
        $(this).parents(".input").addClass("focus");
    }).bind("blur", function() {
        $(this).parents(".input").removeClass("focus");
    }).bind("change", function() {
        activeSubmitButton();
    }).bind("keyup", function() {
        activeSubmitButton();
    });

    if (!isMobile.Android()) {
        var type = $(".purpose-list");
        $("#purpose").bind("focus", function() {
            type.slideDown();
        }).bind("blur", function() {
            type.slideUp();
        });
        type.find("li").bind("click", function() {
            $("#purpose").val($(this).text());
            type.slideUp();
        });
    }

    $(".time-placeholder").bind("click", function() {
        $(".time").addClass("active");
        $("#time-m").focus();
    });

    if (isMobile.any()) {
        $(".time").addClass("active");
    }
}

$(function() {
    if (window.location.pathname.indexOf('ie') > 0){
        getReadyByIE();
    }else {
	    controlFlow();
    }
    addPlaceholder();

    $(".close-avatar-crop-overlay").bind("click", function() {
        $(".avatar-crop-overlay").fadeOut();
        $("#avatarInput").val("");
    });

    $(".avatar-save").bind("click", function() {
        $(".avatar-form").submit();
    });

    $("#submit").bind("click", function() {
        if ($(this).hasClass("active")) {
            if (validateInput()) {
                submitUserData();
            } else {
                console.log("Validation failed.");
            }
        }
    });
});
