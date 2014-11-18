$(function () {

	var $element = $('#bottle');
	var $bottle = $('.bottle', $element);
	var $shadow = $('.shadow', $element);

	var $shade = $('.bottle-shade', $element);
	var $printer = $('.printer', $element);
	var $name = $('.ugc-name', $element);
	var $label = $('.label span', $element);

	var $darkness = $('.darkness', $element);
	var $bg = $('.bg', $element);
	var $foreground = $('.foreground', $element);

	var w = $element.width();
	var h = $element.height();

	var animation_start = function () {
		// TODO: Do we really need lettering
		$label.lettering();

		$bg.velocity({translateZ: '50px'}, 0);
		$foreground.velocity({translateZ: '56px'}, 0);

		setTimeout(fall, 300)
	};

	var endTransition = function () {
		$element.hide();
		$('#hands').show().trigger('start');
	};

	var panorama = function () {
		$foreground.velocity({
			"translateZ": "1px"
		}, 1300, function () {
			console.log('END')
		});

		$bg.velocity({
			"translateZ": "1px"
		}, 1300);
	};

	var night = function () {
		$darkness.velocity({
			opacity: 0.9
		}, 1300);
	};

	var retreat = function () {
		$printer.velocity({
			"top": h,
			"left": w
		}, 800, panorama);
	};

	var print = function () {
		var name_w = $name.width();
		var label_w = $shade.width();
		var length = $label.text().length;
		var speed = 140;

		var average;

		if (length >= 2) {
			average = ($('.char2', $name).offset().left - $('.char1', $name).offset().left) / 2;
		} else {
			average = name_w / length / 2;
		}

		$shade.width((label_w - name_w) / 2 + name_w);

		var isFinish;
		var printing1 = function () {
			$printer.velocity({
				"top": "-=36px",
				"left": "+=" + average + "px"
			}, speed / 2, "linear", function () {
				if (!isFinish) {
					printing2();
				}
			});
		};

		var printing2 = function () {
			$printer.velocity({
				"top": "+=36px",
				"left": "+=" + average + "px"
			}, speed / 2, "linear", function () {
				if (!isFinish) {
					printing1();
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
		printing1();
	};

	var printGetReady = function () {

		var offset = $name.offset();
		var stage_pos = $element.offset();

		$printer.velocity({
			"top": offset.top - stage_pos.top,
			"left": offset.left - stage_pos.left
		}, 700, "linear", print);
	};

	var fall = function () {
		$bottle.velocity({
			"translateY": 0
		}, 600, function () {
			$('.label', $element).show();
			printGetReady();
		});

		$shadow.velocity({
			scale: "70%"
		}, 900, "linear");
	};

	$element.on('start', animation_start);
});