$(function () {

	var $frame1 = $('#frame1');
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


	$frame1.velocity({
//		"translateX": "-160px",
//		"translateZ": "20px",
		scale: 1.2
	}, 1500, function () {
		handup(function () {

			$('.model1', $frame1).velocity({
				"translateX": "70px",
				"translateY": "20px",
				"translateZ": "50px",
				"scale": 1.8
			}, 1500);
			handdown();

			$frame1.velocity({
				scale: 1.8
			}, 1600, function () {
				handup(function () {
					handdown();

					$('.model1', $frame1).velocity({
						"translateX": "100px",
						"translateY": "90px"
					}, 1500);

					$('.model2', $frame1).velocity({
						"translateX": "-80px",

						"translateZ": "50px"
					}, 1500);
					$frame1.velocity({
						scale: 3.5
					}, 1900);
				});
			});

		});
	});
});