var movieReady = function () {
	$('#hand').velocity({
		translateY: "0%"
	}, 0);
	$(".frame").not('#form').not('#loading').show();

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
		'img/sharing-wechat.png',
		'img/btn-movie-ready.png'
	];

	for (var i = 1; i < 76; i++) {
		imageNames.push("img/endingwrite/endingtextwriting_000" + (i < 10 ? '0' + i : i) + ".png");
	}

	var imagesCount = imageNames.length;
	var resourceCount = imagesCount;
	var loadedResourceCount = 0;
	var images = [];


	var count = function () {
		// console.log(loadedResourceCount, resourceCount);
		if (loadedResourceCount >= resourceCount) {

			$movie_preload.addClass('ready');
			$('#movie-loading').one('click', function () {
				movie_start();
			});
		}
	};

	var $movie_preload = $('#loading-bar-wrapper');
	var $loading_bar_top = $('.loading-bar.loading-bar-top', $movie_preload);
	var $loading_bar_right = $('.loading-bar.loading-bar-right', $movie_preload);
	var $loading_bar_bottom = $('.loading-bar.loading-bar-bottom', $movie_preload);
	var $loading_bar_left = $('.loading-bar.loading-bar-left', $movie_preload);

	var w = $movie_preload.width();
	var h = $movie_preload.height();

	var perimeter = 2 * (w + h);


	var approximate100 = function (x) {
		return (100 - x) < 9 ? 100 : x;
	};

	var boundaryX = w / perimeter;
	var boundaryY = h / perimeter;
	var boundary2 = (w + h) / perimeter;
	var boundary3 = ((2 * w) + h) / perimeter;

	for (var i = 0; i < imagesCount; i++) {
		images[i] = new Image();
		images[i].src = CDN ? CDN + imageNames[i]:imageNames[i];
		$(images[i]).one('load', function () {

			var progress = ++loadedResourceCount / resourceCount;
			if (progress < boundaryX) {
				$loading_bar_top.css("width", approximate100(Math.ceil(100 * (progress / boundaryX))) + "%");
			}
			else if (progress < boundary2) {
				$loading_bar_right.css("height", approximate100(Math.ceil(100 * (progress - boundaryX) / boundaryY)) + "%");
			}
			else if (progress < boundary3) {
				$loading_bar_bottom.css("width", approximate100( Math.ceil(100 * (progress - boundary2) / boundaryX)) + "%");
			}
			else {
				$loading_bar_left.css("height", approximate100(Math.ceil(100 * (progress - boundary3) / boundaryY)) + "%");
			}

			count();
		});

	}

};

var movie_start = function () {
	SaveTrackingLog(1);
	var player = new MediaElementPlayer('#bgmusic');
	player.play();

	// Setting first animation here
	var $FIRST_FRAME = $("#toast");
	$FIRST_FRAME.show().trigger('start');
	CAPTION.getReady();

	$('#movie-loading').hide();
};

var dataReady = function () {

	var backgroundImg = new Image();
	backgroundImg.onload = function () {
		$("#form-mobile").hide();
		$("#form").add('#toast-first').remove();
		movieReady();
	};
	backgroundImg.src = CDN ? CDN + "img/btn-movie-loading.png":"img/btn-movie-loading.png";
};