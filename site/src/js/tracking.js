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
function flood(src) {
    var spotpix = new Image();
    spotpix.src = src;
}

function requestNielsenTracking(htsinfo) {
	var src = "http://s.cr-nielsen.com/hat?_t=r&_htsinfo=" + htsinfo;
	flood(src);
}

// Baidu
function addBaiduTracking() {
    $(document).on("click", "[baidu_category][baidu_label]", function() {
        var category = $(this).attr("baidu_category");
        var label = $(this).attr("baidu_label");
        requestBaiduTracking(category, label);
    });
}

function requestBaiduTracking(category, label) {
    if(category !== undefined && category !== "" && label !== undefined && label !== ""){
        _hmt.push(['_trackEvent', category, 'click', label]);
    }
}


// Admaster
function requestAdmasterTracking(category, action, label){

}


