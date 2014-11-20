$(function () {

	var $frame1 = $('#frame1');
	var $3dbox = $('.box3d', $frame1);
	var $bg_frame1 = $('.bg1', $frame1);
	var $model1 = $('.model1', $frame1);
	var $model2 = $('.model2', $frame1);

	var $hand = $('#hand');

	var handup = function (cb) {
		$hand.velocity({
			translateX: "10%",
			translateY: "-64%"
		}, 1000, cb);
	};

	var handdown = function (cb) {
		setTimeout(function () {
			$hand.velocity({
				translateY: "-22%"
			}, 1000, cb);
		}, 300);
	};


	var animation_start = function () {
		$bg_frame1.add($model1).add($model2).velocity({
			"translateZ": "18px"
		}, 1500, function () {

			handup(function () {

				if (!isMobile.Android()) {
					$3dbox.css({
						"perspective-origin": "26% 50%"
					}, 0);
				}

				handdown();

				$model1.velocity({
					"translateX": "70%",
					"translateZ": "70px"
				}, 1700);

				$model2.velocity({
					"translateZ": "39px"
				}, 1500);


				$bg_frame1.velocity({
					"translateZ": "10px"
				}, 1600, function () {
					handup(function () {
						handdown();

						if (!isMobile.Android()) {
							$3dbox.css({
								"perspective-origin": "50% 50%"
							}, 0);
						}

						$('.model1', $frame1).velocity({
							"translateZ": "90px"
						}, 500, "linear");

						$('.model2', $frame1).velocity({
							"translateZ": "90px"
						}, 1000, "linear");

						$bg_frame1.velocity({
							"translateZ": "76px"
						}, 1500, "linear", function () {

							$('#frame2').trigger('start');

						});
					});
				});
			});
		});
	};

	$frame1.on('start', animation_start);
});