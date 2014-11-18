$(function () {
	var $element = $('#hands');

	var $hand1 = $('.hand1', $element);
	var $hand2 = $('.hand2', $element);
	var $hand3 = $('.hand3', $element);

	var $hand4 = $('.hand4', $element);
	var $hand5 = $('.hand5', $element);
	var $hand6 = $('.hand6', $element);


	var time = 800;
	var delayTime = 600;
	var reverseTime = 900;

	var animation_start = function () {
		$hand1.velocity({
			translateX: "103%"
		}, time).delay(delayTime).velocity('reverse', reverseTime, 'linear');

		$hand2.velocity({
			translateX: "100%",
			translateY: "-100%"
		}, time).delay(delayTime).velocity('reverse', reverseTime, 'linear');

		$hand3.velocity({
			translateX: "-112%",
			translateY: "-100%"
		}, time).delay(delayTime).velocity('reverse', reverseTime, 'linear');

		$hand4.velocity({
			translateX: "-102%",
			translateY: "-101%"
		}, time).delay(delayTime).velocity('reverse', reverseTime, 'linear');

		$hand5.velocity({
			translateX: "-100%",
			translateY: "-70%"
		}, time).delay(delayTime).velocity('reverse', reverseTime, 'linear');

		$hand6.velocity({
			translateX: "-100%"
		}, time).delay(delayTime).velocity('reverse', reverseTime, 'linear');
	};

	$element.on('start', animation_start);
});