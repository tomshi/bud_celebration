var ugc_name, ugc_purpose, ugc_date, ugc_image_url, ugc_vid, hostname;

hostname = "http://budquality-bud.stor.sinaapp.com/";

function controlFlow(){
    // check the param 'vid'
    var videoId = getUrlParameterByName("id");
    if(videoId){
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
    }else {
        $("#form").show();
    }
}

function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function processUserLoadData(data){
    if(data){
        if(data.is_success){
            ugc_name = data.data.name;
            ugc_purpose = data.data.purpose;
            ugc_date = data.data.date;
            if (data.data.image_url == "" || data.data.image_url == null){
                ugc_image_url = "img/blank.gif";
            }
            else {
                ugc_image_url = hostname + data.data.image_url;
            }
            ugc_vid = data.data.user_id;
            console.log(ugc_image_url);
            wxsharing();
            $("#form").hide();
            getReady();
        }
        else{
            console.log(data.message);
        }
    }
    else{
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
            date: day + "/" + month,
            image: $("#avatarInput").val()
        }
    }).done(function(data) {
        processUserLoadData(data);
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
    if ($("#username").val() !== "" && $("#occasion").val() !== "" && $("#time-d").val() !== "" && $("#time-m").val() !== "") {
        $("#submit").addClass("active");
    } else {
        $("#submit").removeClass("active");
    }
}

function validateInput(){
    var name = $.trim($("#username").val());
    var purpose = $.trim($("#purpose").val());
    var day = $.trim($("#time-d").val());
    var month = $.trim($("#time-m").val());

    if(name.length <= 0 || name.length > 8){
        $(".name").addClass("error");
        console.log("The name " + name + " is not valid.");
        return false;
    }

    if(purpose.length <= 0|| purpose.length > 8){
        $(".name").removeClass("error");
        $(".purpose").addClass("error");
        console.log("The purpose " + purpose + " is not valid.");
        return false;
    }

    var intDay = parseInt(day);
    var intMonth = parseInt(month);

    if(intDay != day){
        $(".name").removeClass("error");
        $(".purpose").removeClass("error");
        $(".time").addClass("error");
        console.log("The day " + day + " is not valid.");
        return false;
    }

    if(intMonth != month){
        $(".name").removeClass("error");
        $(".purpose").removeClass("error");
        $(".time").addClass("error");
        console.log("The month " + month + " is not valid.");
        return false;
    }

    if(intDay <= 0 || intDay > 31){
        $(".name").removeClass("error");
        $(".purpose").removeClass("error");
        $(".time").addClass("error");
        console.log("The day " + day + " is not valid.");
        return false;
    }

    if(intMonth <= 0 || intMonth > 12){
        $(".name").removeClass("error");
        $(".purpose").removeClass("error");
        $(".time").addClass("error");
        console.log("The month " + month + " is not valid.");
        return false;   
    }

    return true;
}

function hasPlaceholderSupport(){
    var attr = "placeholder";
    var input = document.createElement("input");
    return attr in input;
}

function addPlaceholder(){
    var support = hasPlaceholderSupport();
    if(!support){
        $(".input input").bind("focus", function(){
            if($(this).val() == this.defaultValue){
                $(this).val("");
            }
        }).bind("blur", function(){
            if ($(this).val() == "") {
                $(this).val(this.defaultValue);
            }
        });
    }else {
        $(".input input").val("");
    }

    $(".input input").bind("focus", function() {
        $(this).parent().addClass("focus");
    }).bind("blur", function() {
        $(this).parent().removeClass("focus");
    }).bind("change", function() {
        activeSubmitButton();
    }).bind("keyup", function() {
        activeSubmitButton();
    });

    var type = $("#purpose-list");
    $("#purpose").bind("focus", function() {
        type.slideDown();
    }).bind("blur", function() {
        type.slideUp();
    });

    $(".time-placeholder").bind("click", function() {
        $(".time").addClass("focus");
        $("#time-d").focus();
    });

    type.find("li").bind("click", function() {
        $("#purpose").val($(this).text());
        type.slideUp();
    });
}

$(function() {
    controlFlow();
    addPlaceholder();

    $(".close-avatar-crop-overlay").bind("click", function() {
        $(".avatar-crop-overlay").fadeOut();
        $("#avatarInput").val("");
    });

    $(".avatar-save").bind("click", function() {
        $(".avatar-form").submit();
    });

    $("#submit").bind("click", function(){
        if ($(this).hasClass("active")) {
            if(validateInput()){
                submitUserData();    
            }
            else{
                console.log("Validation failed.");
            }
        }
    });
});