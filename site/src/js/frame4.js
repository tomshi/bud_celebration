$(function () {

	var $element = $('#frame4');
	var $nextFrame = $('#bottle');

	var $pic = $('.pic', $element);
	var length = $pic.length - 1;

	var endTransition = function () {
		$element.velocity('fadeOut', 1000);
		CAPTION.bottleIn();
		$nextFrame.trigger('start');
	};

	var slide = function (i) {
		if (i >= length) {
			endTransition();
			return;
		}

		setTimeout(function () {
			$($pic[i]).hide();
			slide(++i);
		}, i < 4 ? 800 : (900-110*i));
	};

	var animation_start = function () {
		$pic.show();
		slide(0);
	};

	$element.on('start', animation_start);
});