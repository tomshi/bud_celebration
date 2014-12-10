$(function () {

	var $element = $('#bottle');
	var $bottle = $('.bottle', $element);
	var $shadow = $('.shadow', $element);

	var $shade = $('.bottle-shade', $element);
	var $printer = $('.printer');
	var $arm_h = $('.arm-h', $printer);
	var $arm_v = $('.arm-v', $printer);
	var $name = $('.ugc-name', $element);
	var $label = $('.label', $element);
	var $labelSpan = $('.label span', $element);

	var $darkness = $('.darkness', $element);
	var $bg = $('.bg', $element);
	var $foreground = $('.foreground', $element);

	var $light = $('.light', $element);
	var $bottleShadow = $('.bottle-shadow', $element);

	var $text1 = $('.text1');
	var $text2 = $('.text2');
	var $btns = $('.btns .item');

	var w = $element.width();
	var h = $element.height();

	var animation_start = function () {

		$name.text(ugc_name ? ugc_name : '');
		// TODO: Do we really need lettering
		$labelSpan.lettering();
		$bottle.velocity({translateY: "-120.0%"}, 0);
		$shadow.velocity({scale: 1.1}, 0);
		$bottleShadow.velocity({rotateZ: "0deg"}, 0);

		$bg.velocity({translateZ: '50px'}, 0);
		$foreground.velocity({translateZ: '56px'}, 0);
		$darkness.velocity({opacity: 0});
		$light.velocity({rotateZ: "-12deg", scale: 1.3, translateY: "-8%", translateX: "-3%", opacity: 0}, 0);
		$arm_h.velocity({"rotateZ": "0deg"}, 0);
		setTimeout(fall, 300);
	};

	var endTransition = function () {
		SaveTrackingLog(0);
	};

	var panorama = function () {
		$foreground.velocity({
			"translateZ": "1px"
		}, 1000, function () {

			$light.add($bottleShadow).show().velocity({
				opacity: 0.9
			}, 1000, function () {
				$light.velocity({rotateZ: "-2deg"}, 1000);

				$bottleShadow.velocity({
					rotateZ: "3deg"
				}, 1000, function () {
					endTransition();
				});
			});

			$("#ending").show();

			$text1.velocity({
				opacity: 1
			}, 800, function () {
				if ($('html').hasClass('canvas')) {
					$('#endingwrite').trigger('draw');
				}
			});

			$text2.velocity({
				opacity: 1
			}, {
				duration: 1000,
				delay: 5000
			});

			$($btns[0]).velocity({
				opacity: 1
			}, {
				duration: 1000,
				delay: 6000
			});

			$($btns[1]).velocity({
				opacity: 1
			}, {
				duration: 1000,
				delay: 6300
			});

			$($btns[2]).velocity({
				opacity: 1
			}, {
				duration: 1000,
				delay: 6600
			});

			$($btns[3]).velocity({
				opacity: 1
			}, {
				duration: 1000,
				delay: 6900
			});
		});

		$bg.velocity({
			"translateZ": "1px"
		}, 1000);
	};

	var night = function () {
		$darkness.delay(1100).velocity({
			opacity: 0.82
		}, 600);
	};

	var retreat = function () {
		$printer.velocity({
			"top": h,
			"left": w
		}, 800, function () {
			$printer.hide();
			panorama();
			CAPTION.bottleOut();
		});
	};


	var name_w;
	var name_h;

	var print = function () {
		var label_w = $shade.width();
		var length = $labelSpan.text().length;
		var speed = 300;
		var rotateSpeed = speed / 12;

		var average;

		if (length >= 2) {
			average = ($('.char2', $name).offset().left - $('.char1', $name).offset().left) / 5;
		} else {
			average = name_w / length / 4;
		}

		$shade.width((label_w - name_w) / 2 + name_w);

		var isFinish;
		var rotatTimes = 0;

		var rotatArm = function () {

			rotatTimes++;

			if (!isFinish) {
				$arm_h.velocity({
					"rotateZ": "-4deg"
				}, {
					easing: "linear",
					duration: rotateSpeed
				}).velocity('reverse', {
					duration: rotateSpeed,
					easing: "linear",
					complete: function () {

						if (rotatTimes % 3 === 0) {
							setTimeout(function () {
								rotatArm()
							}, 70);
						} else {

							rotatArm();
						}
					}
				});
			}
		};

		var printTimes = 0;
		var printing = function () {
			printTimes++;

			$printer.velocity({
				"left": "+=" + average + "px"
			}, speed / 5, "linear", function () {
				if (!isFinish) {
					printing();
				}
			});
		};

		$shade.velocity({
			"width": (label_w - name_w) / 2
		}, length * speed, "linear", function () {
			$shade.hide();
			isFinish = true;

			retreat();
			night();
		});

		printing();
		rotatArm();
	};

	var printGetReady = function () {
		name_w = $name.width();
		name_h = $name.height() * 2;

		var offset = $name.offset();
		var stage_pos = $element.offset();

		$printer.velocity({
			"top": offset.top - stage_pos.top - 2 * name_h,
			"left": offset.left - stage_pos.left
		}, 800, "linear", print);
	};

	var fall = function () {
		$bottle.velocity({
			"translateY": 0
		}, 900, function () {
			$label.show();
			printGetReady();
		});

		$shadow.delay(400).velocity({
			scale: "75%"
		}, 450, "linear");
	};

	$element.on('start', animation_start);
});