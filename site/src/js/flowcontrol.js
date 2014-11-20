$(function() {
    controlFlow();
});

var ugc_name, ugc_purpose, ugc_date, ugc_image_url;

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

            // skip the first view
        }
        else{
            console.log(data.message);
        }
    }
    else{
        console.log("No UGC with id:" + videoId);
    }
}