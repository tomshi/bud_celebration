$(function () {

	var $frame1 = $('#frame1');

	var $nextFrame = $('#frame2');
	var $3dbox = $('.box3d', $frame1);
	var $bg_frame1 = $('.bg1', $frame1);
	var $model1 = $('.model1', $frame1);
	var $model2 = $('.model2', $frame1);

	var $hand = $('#hand');

	var handup = function (Y, time, cb) {
		$hand.velocity({
			translateX: "10%",
			translateY: Y
		}, time, cb);
	};

	var handdown = function (cb) {

		setTimeout(function () {
			$hand.velocity({
				translateY: "-22%"
			}, 1000, cb);
		}, 100);
	};

	var endTransition = function () {
		$frame1.velocity({
			opacity: 0
		}, 1000, function(){
			$frame1.hide();
		});
		CAPTION.frame2();
		$nextFrame.show().trigger('start');
	};

	var animation_start = function () {
		$bg_frame1.add($model1).add($model2).velocity({
			"translateZ": "18px"
		}, 1300, function () {

			handup("-64%", 900, function () {

				if (!isMobile.Android()) {
					$3dbox.css({
						"perspective-origin": "20% 50%"
					}, 0);
				}

				handdown();

				$model1.velocity({
					"translateX": "50%",
					"translateZ": "70px"
				}, 1500);

				$model2.velocity({
					"translateZ": "39px"
				}, 1200);


				$bg_frame1.velocity({
					"translateZ": "20px"
				}, 1000, function () {
					handup("-55%", 900,function () {
						handdown();

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
							"translateZ": "76px"
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