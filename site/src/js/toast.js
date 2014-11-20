$(function () {
	var $element = $('#toast');
	var $nextFrame = $('#frame1');

	var $bg = $('.bg', $element);
	var $dust = $('.dust', $element);

	var $mainHand = $('#hand');

	var $hand1 = $('.hand1', $element);
	var $hand2 = $('.hand2', $element);
	var $hand3 = $('.hand3', $element);
	var $hand4 = $('.hand4', $element);


	var endTransition = function () {
		$element.hide();
		$nextFrame.trigger('start');
	};

	var time = 2000;
	var reverseTime = 1800;


	var animation_start = function () {
		toast();
	};

	var toast = function () {
		$dust.velocity({
			translateY: "100%"
		}, 4000, 'linear');

		$hand1.velocity({
			translateX: "93%",
			translateY: "-124%"
		}, {
			duration: time,
			easing: [.37, 1.08, .43, 1.11]
		}).velocity({
			translateX: "0%",
			translateY: "0%"
		}, reverseTime, [.6, .06, .66, .2]);

		$hand2.velocity({
			translateX: "100%",
			translateY: "-90%"
		}, {
			duration: time + 200,
			easing: [ .34, 1.14, .39, 1.18]
		}).velocity('reverse', reverseTime, [.6, .06, .66, .2]);

		$hand3.velocity({
			translateX: "-110%",
			translateY: "-90%"
		}, {
			duration: time + 200,
			easing: [ .34, 1.14, .39, 1.19]
		}).velocity('reverse', reverseTime, [.6, .06, .66, .2]);
//
		$hand4.velocity({
			translateX: "-90%",
			translateY: "-30%"
		}, {
			duration: time + 200,
			easing: [ .34, 1.14, .39, 1.19]
		}).velocity('reverse', reverseTime, [.6, .06, .66, .2]);

		$mainHand.velocity({
			translateY: "-78%"
		}, {
			duration: time + 200,
			easing: [ .34, 1.14, .39, 1.19]
		}).velocity({
			translateY: "-22%"
		}, {
			duration: reverseTime,
			easing: [.6, .06, .66, .2],
			complete: endTransition,
			begin: function () {
				$bg.velocity({
					opacity: 0
				}, reverseTime);
				$nextFrame.show().velocity({
					opacity: 1
				}, 2000);
			}
		});
	};

	$element.on('start', animation_start);
});