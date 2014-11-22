/**
 * Description:微信分享通用代码
 * 使用方法：_WXShare('分享显示的LOGO','LOGO宽度','LOGO高度','分享标题','分享描述','分享链接','微信APPID';
 **/
var e, c, j, g, f, b, h;

function _WXShare(e, c, j, g, f, b, h) {
	e = e || "http://www.00ok.cc/ico-share.png";
	c = c || 100;
	j = j || 100;
	g = g || document.title;
	f = f || document.title;
	b = b || document.location.href;
	h = '';

	function i() {
		WeixinJSBridge.invoke("sendAppMessage", {
			appid: h,
			img_url: e,
			img_width: c,
			img_height: j,
			link: b,
			desc: f,
			title: g
		}, function(l) {
			requestBaiduTracking("video,share", "chat");
			requestNielsenTracking("video,share,chat");
			requestGATracking("video,share", "chat");
		});
	}

	function a() {
		WeixinJSBridge.invoke("shareTimeline", {
			img_url: e,
			img_width: c,
			img_height: j,
			link: b,
			desc: f,
			title: g
		}, function(l) {
			requestBaiduTracking("video,share", "moments");
			requestNielsenTracking("video,share,moments");
			requestGATracking("video,share", "moments");
		});
	}

	function d() {
		WeixinJSBridge.invoke("shareWeibo", {
			content: f,
			url: b
		}, function(l) {
			console.log('shareWeibo');
		});
	}

	document.addEventListener("WeixinJSBridgeReady", function k() {
		WeixinJSBridge.on("menu:share:appmessage", function(l) {
			i();
		});
		WeixinJSBridge.on("menu:share:timeline", function(l) {
			a();
		});
		WeixinJSBridge.on("menu:share:weibo", function(l) {
			d();
		});
	}, false);
}