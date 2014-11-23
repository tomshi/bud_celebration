$(function() {
    addGATracking();
    addNielsenTracking();
    addBaiduTracking();
});

// Backend Tracking
function SaveTrackingLog(is_start){
    var source = getUrlParameterByName("source");
    var channel = getUrlParameterByName("channel");
    if (source == ""){
        source = "website";
    }
    $.ajax({
        type: "POST",
        url: "api/tracking/save",
        dataType: "json",
        data: {
            source: source,
            channel: channel,
            user_id: ugc_vid,
            is_start: is_start
        }
    }).done(function(data) {
        console.log( "save tracking log" );
    }).fail(function(jqXHR, textStatus, errorThrown) {
        $.ajax({
            url: "api/json/tracking_save.json",
            cache: false
        }).done(function(json) {
            console.log("tracking save JSON: " + json);
        });
    });
}

// GA
function addGATracking() {
    $(document).on("click", "[ga_category][ga_action]", function() {
        var category = $(this).attr("ga_category");
        var action = $(this).attr("ga_action");
        var label = $(this).attr("ga_label");
        var value = $(this).attr("ga_value");

        requestGATracking(category, action, label, value);
    });
}

function requestGATracking(category, action, label, value) {
    if (category !== undefined && category !== "" && action !== undefined && action !== "") {
        ga('send', 'event', category, action, label, value);
    }
}

// Nielsen
function addNielsenTracking() {
    $(document).on("click", "[nl_key]", function() {
        var key = $(this).attr("nl_key");

        requestNielsenTracking(key);
    });
}

function flood(src) {
    if(src){
        var spotpix = new Image();
        spotpix.src = src;    
    }
}

function requestNielsenTracking(key) {
    var htsinfo = nielsenCodes[key];
    if(htsinfo){
        var src = "http://s.cr-nielsen.com/hat?_t=r&_htsinfo=" + htsinfo;
        flood(src);    
    }
}

var nielsenCodes={
    'index,create':                 'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzI5Jock',
    'index,img_upload':             'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMwJtj3',
    'index,tnc':                    'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMxJiTz',
    'index,rules':                  'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMyJmD8',
    'index,tap_into_beers':         'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzMzJpz4',
    'video,purchase':               'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM0Juji',
    'video,share,weibo':            'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM1JhTm',
    'video,share,tencent':           'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM2JlDp',
    'video,share,qzone':            'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM3Jqzt',
    'video,share,douban':           'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM4Jrjd',
    'video,share,renren':           'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzM5JkTZ',
    'video,share,wechat':           'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzQwJhMC',
    'video,replay':                 'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzQxJu8G',
    'video,recreate':               'http://s.cr-nielsen.com/hat?_t=r&_htsinfo=QyYyJjgwMDAwMzQ3JjEwMDA1MzczJjMwMDk1NzQyJqsJ'
};

// Baidu
function addBaiduTracking() {
    $(document).on("click", "[baidu_category][baidu_action]", function() {
        var category = $(this).attr("baidu_category");
        var action = $(this).attr("baidu_action");
        requestBaiduTracking(category, action);
    });
}

function requestBaiduTracking(category, action) {
    if(category !== undefined && category !== "" && action !== undefined && action !== ""){
        _hmt.push(['_trackEvent', category, action]);
    }
}


// Admaster
function requestAdmasterTracking(category, action, label){

}


