$(function () {

	var $element = $('#frame4');
	var $nextFrame = $('#bottle');

	var $pic = $('.pic', $element);

	var endTransition = function () {
		$element.velocity({
			opacity: 0
		}, 1000, function () {
			$element.hide();
		});
		$nextFrame.show().trigger('start');
	};

	var slide = function (i) {
		if (i > 4) {
			endTransition();
			return;
		}

		setTimeout(function () {
			$($pic[i]).hide();
			slide(++i);
		}, i < 4 ? 1000 : 300);
	};

	var animation_start = function () {
		$pic.show();
		slide(0);
	};

	$element.on('start', animation_start);
});