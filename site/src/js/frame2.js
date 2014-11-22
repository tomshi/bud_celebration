$(function () {

	var $element = $('#frame2');
	var $3dbox = $('.box3d', $element);
	var $bg_frame2 = $('.bg', $element);

	var $nextFrame = $('#frame3');
	var $model3 = $('.model3', $element);
	var $model4 = $('.model4', $element);

	var $hand = $('#hand');

	var handup = function (cb) {
		$hand.velocity({
			translateX: "2%",
			translateY: "-80%"
		}, 800, cb);
	};

	var handdown = function (cb) {
		setTimeout(function () {
			$hand.velocity({
				translateY: "-22%"
			}, 1100, cb);
		}, 200);
	};

	var endTransition = function () {
		$element.velocity({
			opacity: 0
		}, 1000, function () {
			$element.hide();
		});
		CAPTION.frame3();

		$nextFrame.show().trigger('start');
	};

	var animation_start = function () {

		if (!isMobile.Android()) {
			$3dbox.css({
				"perspective-origin": "26% 50%"
			}, 0);
		}

		$bg_frame2.add($model3).add($model4).velocity({
			"translateZ": "25px"
		}, 1000, function () {

			handup(function () {

				if (!isMobile.Android()) {
					$3dbox.css({
						"perspective-origin": "66% 50%"
					}, 0);
				}

				handdown();

				$model3.velocity({
					"translateX": "-70%",
					"translateZ": "70px"
				}, 1700);

				$model4.velocity({
					"translateZ": "39px"
				}, 1500);

				$bg_frame2.velocity({
					"translateZ": "35px"
				}, 1600, function () {

					handup(function () {
						handdown();

						if (!isMobile.Android()) {
							$3dbox.css({
								"perspective-origin": "52% 50%"
							}, 0);
						}

						$('.model3', $element).velocity({
							"translateZ": "90px"
						}, 500, "linear");

						$('.model4', $element).velocity({
							"translateX": "50%",
							"translateZ": "90px"
						}, 1000, "linear");

						$bg_frame2.velocity({
							"translateZ": "76px"
						}, 1000, "easeInQuad", function () {
							endTransition();
						});
					});
				});
			});
		});
	};

	$element.on('start', animation_start);
});