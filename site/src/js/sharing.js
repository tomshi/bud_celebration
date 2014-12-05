function shareSNS(type) {
    var img = encodeURIComponent("http://www.toast-365days.com/img/share_wechat.png");
    var link = encodeURIComponent(window.location.href);
    var title, text;
    if (getUrlParameterByName("id").length > 0) {
        title = encodeURIComponent("酿造" + ugc_name + "的欢庆时刻");
        text = encodeURIComponent("#酿造你的欢庆时刻#" + ugc_name + "独一无二的百威欢庆视频 ，小伙伴们快来围观，为TA的" + ugc_purpose + "举杯！");
    } else {
        title = encodeURIComponent("用你的故事，打造独一无二的百威定制啤酒");
        text = encodeURIComponent("#酿造你的欢庆时刻# 你的故事，值得历久弥新。百威推出专属镌刻瓶啤酒，酿造你的欢庆时刻，为生命中的每个珍贵瞬间举杯！");
    }

    var content, p, s, i;
    switch (type) {
        case 'sina': //sina weibo
            var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + text + '&url=' + link + '&content=utf-8&sourceUrl=' + link + '&pic=' + img;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
            break;
        case 'renren': //renren weibo
            var sharesinastring = "http://widget.renren.com/dialog/share?resourceUrl=" + link + "&srcUrl=" + link + "&title=" + title + "&images=" + img + "&charset=UTF-8&description=" + text;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
            break;
        case 'douban': //douban weibo
            var sharesinastring = "http://shuo.douban.com/!service/share?image=" + img + "&href=" + link + "&name="+ title + "&text=" + text;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
            break;
        case 'qq': //qq
            p = {
                url: link,
                /*获取URL，可加上来自分享到QQ标识，方便统计*/
                title: title,
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
                title: title,
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
    "link" : document.location.href,
    "imgUrl" : "http://toast-365days.b0.upaiyun.com/img/share_wechat.png",
    "title" : "用你的故事，打造独一无二的百威定制啤酒",
    "desc" : "你的故事，值得历久弥新。百威推出专属定制瓶啤酒，为生命中每个珍贵瞬间举杯",
    "moment" : "用你的故事，打造独一无二的百威定制啤酒"
};

function configWxSharing(){
    WeixinApi.ready(function(Api) {
        // 分享的回调
        var wxCallbackFriend = {
            // 分享操作开始之前
            ready : function() {
                requestBaiduTracking("video,share", "chat");
                requestGATracking("video,share", "chat");

            }
        };
        var wxCallbackTimeline = {
            // 分享操作开始之前
            ready : function() {
                requestBaiduTracking("video,share", "moments");
                requestGATracking("video,share", "moments");
            }
        };
        // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
        Api.shareToFriend(wxData, wxCallbackFriend);
        // 点击分享到朋友圈，会执行下面这个代码
        Api.shareToTimeline(wxData, wxCallbackTimeline);
    });
}

function wxsharing() {
    wxData.link = window.location.href;
    wxData.imgUrl = 'http://toast-365days.b0.upaiyun.com/img/share_wechat.png';
    if (getUrlParameterByName("id").length > 0) {
        wxData.title = '酿造' + ugc_name + '的欢庆时刻';
        wxData.desc = ugc_name + '独一无二的百威欢庆视频 ，快来围观，为TA的' + ugc_purpose + '举杯！';
        wxData.moment = ugc_name + '独一无二的百威欢庆视频 ，围观为TA举杯！';
    } else {
        wxData.title = '用你的故事，打造独一无二的百威定制啤酒';
        wxData.desc = '你的故事，值得历久弥新。百威推出专属定制瓶啤酒，为生命中每个珍贵瞬间举杯';
        wxData.moment = '用你的故事，打造独一无二的百威定制啤酒';
    }
}

$(function() {
    $(".share[share-platform]").on("click", function() {
        var type = $(this).attr("share-platform");
        shareSNS(type);
    });
});