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

	var handup = function (Y, time, cb) {
		$hand.velocity({
			translateX: "10%",
			translateY: Y
		}, time, cb);
	};

	var handup2 = function (Y, time, cb) {
		$hand.velocity({
			translateX: "-10%",
			translateY: Y
		}, time, cb);
	};

	var handdown = function (cb) {
		$hand.velocity({
			translateY: "-28%"
		}, 1200, cb);
	};

	var endTransition = function () {
		$element.velocity({
			opacity: 0
		}, 1000, function () {
			$element.hide();
		});
		CAPTION.frame4();
		$nextFrame.trigger('start');
	};

	var animation_start = function () {

		if (ugc_image_url) {
			$ugc_pic.html('<img src="' + ugc_image_url + '"><div class="purpose haveImg">' + ugc_purpose + '</div>');
		}
		else {
			$ugc_pic.html('<div class="table"><div class="table-cell"><span class="ugc-name">' + ugc_name + '</span><span class="purpose">' + ugc_purpose + '</span></div></div>');
		}

		if (!isMobile.Android()) {
			$3dbox.css({
				"perspective-origin": "68% 50%"
			}, 0);
		}

		$bg_frame.add($model5).add($model6).velocity({
			"translateZ": "20px"
		}, 1000, function () {

			handup("-60%", 900, function () {
				if (!isMobile.Android()) {
					$3dbox.css({
						"perspective-origin": "40% 50%"
					}, 0);
				}

				handdown();

				$model5.velocity({
					"translateX": "70%",
					"translateZ": "70px"
				}, 1300);

				$model6.velocity({
					"translateX": "50%",
					"translateZ": "56px"
				}, 1300);

				$bg_frame.velocity({
					"translateZ": "40px"
				}, 1300, function () {

					handup2("-54%", 1000, function () {
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
						}, 800, "linear");

						CAPTION.frame3FadeOut();

						$shadow.velocity({
							opacity: 0
						}, 1300, "linear", function () {

							$bg_frame.delay(300).velocity({
								"translateZ": "76px"
							}, 1500, "easeInQuart", function () {
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