var ugc_name, ugc_purpose, ugc_date, ugc_image_url, ugc_id;

function controlFlow(){
    // check the param 'vid'
    var videoId = getUrlParameterByName("vid");
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
            ugc_image_url = data.data.image_url;
            ugc_id = data.data.user_id;
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
            purpose: $.trim($("#occasion").val()),
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
    var day = $.trim($("#time-d").val());
    var month = $.trim($("#time-m").val());
    var name = $.trim($("#username").val());
    var purpose = $.trim($("#occasion").val());

    if(name.length <= 0 || name > 8){
        console.log("The name " + name + " is not valid.");
        return false;
    }

    if(purpose.length <= 0|| purpose > 8){
        console.log("The purpose " + purpose + " is not valid.");
        return false;
    }

    var intDay =parseInt(day);
    var intMonth =parseInt(month);

    if(intDay != day){
        console.log("The day " + day + " is not valid.");
        return false;
    }

    if(intMonth != month){
        console.log("The month " + month + " is not valid.");
        return false;
    }

    if(intDay <=0 || intDay > 31){
        console.log("The day " + day + " is not valid.");
        return false;
    }

    if(intMonth <=0 || intMonth > 12){
        console.log("The month " + month + " is not valid.");
        return false;   
    }

    return true;
}

$(function() {
    controlFlow();

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


    $(".close-avatar-crop-overlay").bind("click", function() {
        $(".avatar-crop-overlay").fadeOut();
    });

    $(".avatar-save").bind("click", function() {
        $(".avatar-form").submit();
    });
    
    $("#type-list li").bind("click", function() {
        var val = $(this).text();
        $("#occasion").val(val);
        $("#type-list").slideUp();
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