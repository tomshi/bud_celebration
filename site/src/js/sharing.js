function shareSNS(type, link, image, text) {
    var img = encodeURIComponent(window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1) + image);
    text = encodeURIComponent(text);
    if (link == "") {
        link = encodeURIComponent(window.location.href);
    } else {
        link = encodeURIComponent(link);
    }
    var content, p, s, i;
    switch (type) {
        case 'sina': //sina weibo
            var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + text + '&url=' + link + '&content=utf-8&sourceUrl=' + link + '&pic=' + img;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
            break;
        case 'renren': //renren weibo
            var sharesinastring = "http://widget.renren.com/dialog/share?resourceUrl=" + link + "&srcUrl=" + link + "&title=" + text + "&images=" + img + "&charset=UTF-8&description=" + text;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
            break;
        case 'douban': //douban weibo
            var sharesinastring = "http://shuo.douban.com/!service/share?image=" + img + "&href=" + link + "&name=百威-酿造你的欢庆时刻" + "&text=" + text;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
            break;
        case 'qq': //qq
            p = {
                url: link,
                /*获取URL，可加上来自分享到QQ标识，方便统计*/
                title: text,
                desc: text,
                /*分享摘要(可选)*/
                pics: img,
                /*分享图片(可选)*/
                flash: '',
                /*视频地址(可选)*/
                site: link,
                /*分享来源(可选) 如：QQ分享*/
                style: '201',
                width: 32,
                height: 32
            };
            s = [];
            for (i in p) {
                s.push(i + '=' + p[i] || '');
            }
            window.open('http://connect.qq.com/widget/shareqq/index.html?' + s.join('&'), '_blank', 'scrollbars=no,width=730,height=600,left=75,top=20,status=no,resizable=yes');
            void 0;
            break;
        case 'qzone': //qzone
            p = {
                url: link,
                title: text,
                summary: text,
                /*分享标题(可选)*/
                site: link,
                /*分享来源 如：腾讯网(可选)*/
                pics: img,
                /*分享图片的路径(可选)*/
                style: '203',
                width: 98,
                height: 22
            };
            s = [];
            for (i in p) {
                s.push(i + '=' + p[i] || '');
            }
            var sharingUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
            if (isMobile.any()) {
                sharingUrl = 'http://openmobile.qq.com/oauth2.0/m_jump?page=qzshare.html&loginpage=loginindex.html&logintype=qzone&';
            }
            window.open(sharingUrl + s.join('&'), '_blank', 'scrollbars=no,width=610,height=550,left=75,top=20,status=no,resizable=yes');
            void 0;
            break;
    }
}

var wxData = {
    "appId": "", // 服务号可以填写appId
    "imgUrl" : 'http://toast-365days.com/img/share.jpg',
    "link" : document.location.href,
    "desc" : "",
    "title" : ""
};

function configWxSharing(){
    WeixinApi.ready(function(Api) {
        // 分享的回调
        var wxCallbackFriend = {
            // 分享操作开始之前
            ready : function() {
                requestBaiduTracking("video,share", "chat");
                requestNielsenTracking("video,share,chat");
                requestGATracking("video,share", "chat");

            }
        };
        var wxCallbackTimeline = {
            // 分享操作开始之前
            ready : function() {
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
    if(url.indexOf("?id=") < 0 && ugc_vid !== undefined){
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
    wxData.imgUrl = 'http://bud1.sonicboomsh.com/img/share.jpg';
    if (name.length > 0 && purpose.length > 0) {
        wxData.title = '酿造' + name + '的欢庆时刻';
        wxData.desc = name + '#酿造你的欢庆时刻# 独一无二的百威欢庆视频 ，快来围观，为TA的' + purpose + '举杯！';
    } else {
        wxData.title = '用你的故事，打造独一无二的百威定制啤酒';
        wxData.desc = '#酿造你的欢庆时刻# 你的故事，值得历久弥新。百威推出专属定制瓶啤酒，为生命中每个珍贵瞬间举杯';
    }
}

$(function() {
    $(".share").on("click", function() {
        var name = ugc_name !== undefined ? ugc_name : "";
        var purpose = ugc_purpose !== undefined ? ugc_purpose : "";
        var $this = $(this),
            type = $this.attr("share-platform"),
            link = getSharingUrl(),
            image = $this.attr("share-img"),
            text = $this.attr("share-text").replace("{name}", name).replace("{purpose}", purpose);
        shareSNS(type, link, image, text);
    });
});