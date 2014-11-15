$(function () {

	var $frame1 = $('#frame1');
	var $bg_frame1 = $('.bg1', $frame1);
	var $model1 = $('.model1', $frame1);
	var $model2 = $('.model2', $frame1);

	var $hand = $('#hand');

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


	var animation_start = function () {
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

	$frame1.on('start', animation_start);
});