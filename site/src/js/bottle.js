$(function () {

	var $element = $('#bottle');
	var $bottle = $('.bottle', $element);
	var $shade = $('.shade', $element);

	// TODO: Do we really need lettering
	$('.label span', $element).lettering();


	var animation_start = function () {
		setTimeout(fall, 300)
	};


	var fall = function () {
		$bottle.velocity({
			"bottom": "83px"
		}, 500, "linear", print);
	};


	var print  = function () {
		$shade.velocity({
			"width": "0%"
		}, 1500, "linear");
	};

	$element.on('start', animation_start);
});