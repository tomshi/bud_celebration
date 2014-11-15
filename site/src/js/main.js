$(function () {

	var $frame1 = $('#frame1');
	var $bg_frame1 = $('.bg1', $frame1);
	var $model1 = $('.model1', $frame1);
	var $model2 = $('.model2', $frame1);

	var $hand = $('#hand');


	var preload = function () {
		var imageNames = [
			'img/frame1-bg.jpg',
			'img/frame1-bg2.jpg',
			'img/hand.png',
			'img/model1.png',
			'img/model2.png'
		];

		var imagesCount = imageNames.length;
		var loadedImagesCount = 0;
		var $preloader = $('.preload');
		var images = [];

		for (var i = 0; i < imagesCount; i++) {
			images[i] = new Image();
			images[i].src = imageNames[i];
			images[i].onload = function () {

				$preloader.find('p').text('正在加载：' + Math.ceil(100 * (++loadedImagesCount / imagesCount)) + '%');

				if (loadedImagesCount >= imagesCount) {
					setTimeout(function () {
						$frame1.show().trigger('start');
					}, 300);
				}
			};
		}
	};


	var handup = function (cb) {
		$hand.velocity({
			translateY: "-90%"
		}, 1000, cb);
	};

	var handdown = function (cb) {
		setTimeout(function () {
			$hand.velocity({
				translateY: "0%"
			}, 1000, cb);
		}, 300);
	};


	var frame1_start = function () {
		$bg_frame1.add($model1).add($model2).velocity({
			"translateZ": "180px"
		}, 1500, function () {


			handup(function () {

				handdown();

				$model1.velocity({
					"translateZ": "800px"
				}, 1700);

				$model2.velocity({
					"translateZ": "390px"
				}, 1500);

				$bg_frame1.velocity({
					"translateZ": "300px"
				}, 1600, function () {

					handup(function () {
						handdown();

						$('.model1', $frame1).velocity({
							"translateZ": "1200px"
						}, 500, "linear");

						$('.model2', $frame1).velocity({
							"translateZ": "1000px"
						}, 1000, "linear");

						$bg_frame1.velocity({
							"translateZ": "499px"
						},400, "linear", function () {

							$bg_frame1.addClass('bg2').css({
								transform: 'translateZ(0px)'
							}).removeData().velocity({
								"translateZ": "800px"
							}, 700, "easeOutSine");
						});
					});
				});

			});
		});
	};


	$frame1.on('start', frame1_start);
	preload();
});