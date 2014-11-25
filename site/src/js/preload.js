var getReady = function () {
	$("#loading").show();

//	$(".frame").not('#form').not('#mobile-play').show();

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

	for (var i = 0; i < 76; i++) {
		imageNames.push("img/endingwrite/endingtextwriting_000" + (i < 10 ? '0' + i : i) + ".png");
	}


	var imagesCount = imageNames.length;
	var resourceCount = imagesCount;
	var loadedResourceCount = 0;
	var images = [];


	var count = function () {
		if (loadedResourceCount >= resourceCount) {
			$("#loading").fadeOut();
			start();
		}
	};

	var start = function () {

		audiojs.events.ready(function () {
			audiojs.createAll();
		});

		setTimeout(function () {
			if (isMobile.any() || audiojs.instances.audiojs0) {
				controlFlow();
			}
			else {
				start();
			}
		}, 600);
	};

	for (var i = 0; i < imagesCount; i++) {
		images[i] = new Image();
		images[i].src = imageNames[i];
		images[i].onload = function () {
			var progress = Math.ceil(100 * (++loadedResourceCount / resourceCount));
			$("#loading-now").css("width", progress + "%");
			count();
		};
	}
};

var movie_start = function () {
	SaveTrackingLog(1);
	// Setting first animation here
	var $FIRST_FRAME = $("#bottle");
	$FIRST_FRAME.show().trigger('start');
	CAPTION.getReady();
	if (!isMobile.any()) {
		audiojs.instances.audiojs0.play();
	}
	else {
		$('#bgmusic')[0].play();
	}
	$('#mobile-play').fadeOut();
};

var dataReady = function () {
    if (isMobile.any()) {
        $('#mobile-play').show()
    }
    else {
        movie_start();
    }
};