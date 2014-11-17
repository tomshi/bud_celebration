$(function () {

	var $element = $('#bottle');
	var $bottle = $('.bottle', $element);
	var $shade = $('.shade', $element);
	var $printer = $('.printer', $element);
	var $name = $('.ugc-name', $element);
	var $label = $('.label span', $element);
	var $desk = $('.desk', $element);

	var w = $element.width();
	var h = $element.height();

	var animation_start = function () {

		// TODO: Do we really need lettering
		$label.lettering();

		setTimeout(fall, 300)
	};

	var endTransition = function(){
		$element.hide();
		$('#hands').show();
	};

	var retreat = function () {
		$printer.velocity({
			"top": h,
			"left": w
		}, 800, endTransition);
	};

	var print = function () {
		var name_w = $name.width();
		var label_w = $shade.width();
		var length = $label.text().length;
		var speed = 120;
		var average = name_w / length / 2;

		$shade.width((label_w - name_w) / 2 + name_w);


		var isFinish;
		var printing1 = function () {
			$printer.velocity({
				"top": "-=42px",
				"left": "+=" + average + "px"
			}, speed / 2, function () {
				if (!isFinish) {
					printing2();
				}
			});
		};

		var printing2 = function () {
			$printer.velocity({
				"top": "+=42px",
				"left": "+=" + average + "px"
			}, speed / 2, function () {
				if (!isFinish) {
					printing1();
				}
			});
		};


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
		var stage_pos =  $element.offset();

		$printer.velocity({
			"top":  offset.top - stage_pos.top,
			"left": offset.left - stage_pos.left
		}, 700, "linear", print);
	};

	var fall = function () {
		$bottle.velocity({
			"bottom": ((h - $desk.position().top) / 2 / h) * 100 + "%"
		}, 600, "easeOutQuint", printGetReady);
	};

	$element.on('start', animation_start);
});