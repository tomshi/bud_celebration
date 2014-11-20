$(function () {

	var $element = $('#frame3');
	var $nextFrame = $('#frame4');

	var $3dbox = $('.box3d', $element);
	var $bg_frame = $('.bg', $element);

	var $ugc_pic = $('.ugc-pic', $element);
	var $shadow = $('.shadow', $element);

	var $model5 = $('.model5', $element);
	var $model6 = $('.model6', $element);

	var $hand = $('#hand');

	var handup = function (cb) {
		$hand.velocity({
			translateX: "2%",
			translateY: "-54%"
		}, 1000, cb);
	};

	var handdown = function (cb) {
		setTimeout(function () {
			$hand.velocity({
				translateY: "-22%"
			}, 1000, cb);
		}, 300);
	};

	var endTransition = function () {
		$element.velocity({
			opacity: 0
		}, 1000, function () {
			$element.hide();
		});
		$nextFrame.show().trigger('start');
	};

	var animation_start = function () {
//		var ugc_image_url = "img/mock_ugc.jpg";
//		var ugc_purpose = "生日快乐";
//		var ugc_name = "周杰伦";

		if (ugc_image_url) {
			$ugc_pic.html('<img src="' + ugc_image_url + '"><div class="purpose haveImg">' + ugc_purpose + '</div>');
		}
		else {
			$ugc_pic.html('<div class="ugc-name">' + ugc_name + '</div><div class="purpose">' + ugc_purpose + '</div>');
		}

		if (!isMobile.Android()) {
			$3dbox.css({
				"perspective-origin": "68% 50%"
			}, 0);
		}

		$bg_frame.add($model5).add($model6).velocity({
			"translateZ": "20px"
		}, 1500, function () {

			handup(function () {
				if (!isMobile.Android()) {
					$3dbox.css({
						"perspective-origin": "40% 50%"
					}, 0);
				}

				handdown();

				$model5.velocity({
					"translateX": "70%",
					"translateZ": "70px"
				}, 1700);

				$model6.velocity({
					"translateX": "50%",
					"translateZ": "56px"
				}, 1500);

				$element.velocity({
					"translateZ": "40px"
				}, 1600, function () {

					handup(function () {
						$hand.velocity({
							translateY: "0%"
						}, 1000);

						if (!isMobile.Android()) {
							$3dbox.css({
								"perspective-origin": "50% 33.5%"
							}, 0);
						}

						$model5.velocity({
							"translateZ": "90px"
						}, 500, "linear");

						$model6.velocity({
							"translateX": "50%",
							"translateZ": "90px"
						}, 1000, "linear");

						$shadow.velocity({
							opacity: 0
						}, 1600, "linear", function(){

							$bg_frame.velocity({
								"translateZ": "76px"
							}, 1000, "linear", function () {
								endTransition();
							});
						});

					});
				});
			});
		});
	};

	$element.on('start', animation_start);
});