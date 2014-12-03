$(function () {

	var $frame1 = $('#frame1');

	var $nextFrame = $('#frame2');
	var $3dbox = $('.box3d', $frame1);
	var $bg_frame1 = $('.bg1', $frame1);
	var $model1 = $('.model1', $frame1);
	var $model2 = $('.model2', $frame1);

	var $hand = $('#hand');

	var moveHand = function (X, Y, time, cb) {
		$hand.velocity({
			translateX: X,
			translateY: Y
		}, time, cb);
	};

	var endTransition = function () {
		$frame1.velocity({
			opacity: 0
		}, 1000, function(){
			$frame1.hide();
		});
		CAPTION.frame2();
		$nextFrame.trigger('start');
	};

	var animation_start = function () {
		$model1.add($model2).velocity({
			"translateZ": "18px"
		}, 1300, function () {

			moveHand("20%", "-70%", 900, function () {

				if (!isMobile.Android()) {
					$3dbox.css({
						"perspective-origin": "20% 50%"
					}, 0);
				}

				

				$model1.velocity({
					"translateX": "50%",
					"translateZ": "70px"
				}, 1500);

				$model2.velocity({
					"translateZ": "29px"
				}, 1200);

				$bg_frame1.velocity({
					"translateZ": "20px"
				}, 1200);

				moveHand("28%", "-36%", 950, function () {
					moveHand("4%", "-60%", 900,function () {
						moveHand("7%", "0%", 1100);

						if (!isMobile.Android()) {
							$3dbox.css({
								"perspective-origin": "50% 50%"
							}, 0);
						}

						$('.model1', $frame1).velocity({
							"translateZ": "90px"
						}, 600, "linear");

						$('.model2', $frame1).velocity({
							"translateX": "0%",
							"translateZ": "90px"
						}, 1300, "linear");

						$bg_frame1.velocity({
							"translateZ": "75px"
						}, 1600, "linear", function () {
							endTransition();
						});
					});
				});
			});
		});
	};

	$frame1.on('start', animation_start);
});