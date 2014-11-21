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

$(function() {
    controlFlow();
    $("#submit").bind("click", function(){
        if ($(this).hasClass("active")) {
            submitUserData();
        }
    });
});