$(function () {

	var $element = $('#bottle');
	var $bottle = $('.bottle', $element);
	var $shade = $('.shade', $element);
	var $printer = $('.printer', $element);
	var $name = $('.ugc-name', $element);
	var $label = $('.label span', $element);
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;

	var animation_start = function () {

		// TODO: Do we really need lettering
		$label.lettering();

		setTimeout(fall, 300)
	};


	var isFinish;
	var printing1 = function () {
		$printer.velocity({
			"top": "-=40px",
			"left": "+=12px"
		}, 70, function () {
			if (!isFinish) {
				printing2();
			}
		});
	};

	var printing2 = function () {
		$printer.velocity({
			"top": "+=40px",
			"left": "+=12px"
		}, 70, function () {
			if (!isFinish) {
				printing1();
			}
		});
	};

	var retreat = function () {
		$printer.velocity({
			"top": h,
			"left": w
		}, 1000);
	};

	var print = function () {
		var name_w = $name.width();
		var label_w = $shade.width();
		$shade.width((label_w - name_w) / 2 + name_w);

		var length = $label.text().length;
		var speed = (1750 / 10);

		$shade.velocity({
			"width": (label_w - name_w) / 2
		}, length * speed, "linear", function () {
			isFinish = true;

			retreat();
		});
		printing1();
	};

	var printGetReady = function () {

		var offset = $name.offset();

		$printer.velocity({
			"top": offset.top,
			"left": offset.left
		}, 700, "linear", print);
	};

	var fall = function () {
		$bottle.velocity({
			"bottom": "83px"
		}, 600, "easeOutQuint", printGetReady);
	};

	$element.on('start', animation_start);
});