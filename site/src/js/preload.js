var getReady = function () {
	$("#loading").show();

	var imageNames = [
		'img/bottle.png',
		'img/bottle-desk.jpg',
		'img/bottle-desk-bg.jpg',
		'img/engrave.png',
		'img/hand.png',
		'img/hand1.png',
		'img/hand2.png',
		'img/hand3.png',
		'img/hand4.png',
		'img/hands-bg.jpg',
		'img/dust.png',
		'img/dust-toast.png',
		'img/bright.png',
		'img/model1.png',
		'img/model2.png',
		'img/model3.png',
		'img/model4.png',
		'img/model5.png',
		'img/model6.png',
		'img/light.png',
		'img/photo1.jpg',
		'img/photo2.jpg',
		'img/photo3.jpg',
		'img/photo4.jpg',
		'img/photo5.jpg',
		'img/frame1-bg.jpg',
		'img/frame2-bg.jpg',
		'img/frame3-bg.jpg',
		'img/share.jpg',
		'img/sharing-close.png',
		'img/sharing-douban.png',
		'img/sharing-qq.png',
		'img/sharing-qzone.png',
		'img/sharing-renren.png',
		'img/sharing-sina.png',
		'img/sharing-wechat.png'
	];

	// Setting first animation here
	var $FIRST_FRAME = $("#toast");
	var imagesCount = imageNames.length;
	var resourceCount = imagesCount + 1;
	var loadedResourceCount = 0;
	var images = [];


	var count = function () {
		if (loadedResourceCount >= resourceCount) {
			audiojs.events.ready(function () {
				audiojs.createAll();
			});
			$("#loading").fadeOut();
			SaveTrackingLog(1);
			start();
		}
	};

	var start = function () {

		setTimeout(function () {
			console.log(audiojs.instances.audiojs0);
			if (audiojs.instances.audiojs0) {
				$FIRST_FRAME.show().trigger('start');
				audiojs.instances.audiojs0.play();
			}
			else{
				start();
			}
		}, 400);
	};

	var bgMusic = document.createElement('script');
	bgMusic.onload = function () {

		++loadedResourceCount;
		count();
	};

	bgMusic.src = "music/36s.js";
	document.getElementsByTagName("head")[0].appendChild(bgMusic);

	for (var i = 0; i < imagesCount; i++) {
		images[i] = new Image();
		images[i].src = imageNames[i];
		images[i].onload = function () {
			var progress = Math.ceil(100 * (++loadedResourceCount / resourceCount));
			$("#loading-now").css("width", progress + "%");
			count();
		};
	}


	CAPTION.getReady();
};