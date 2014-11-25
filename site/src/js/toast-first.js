$(function () {
	var $element = $('#toast-first');
	var $nextFrame = $('#form');
	var $mainHand = $('#hand');
	var $hand1 = $('.hand1', $element);
	var $hand2 = $('.hand2', $element);
	var $hand3 = $('.hand3', $element);
	var $hand4 = $('.hand4', $element);


	var time = 1600;


	var animation_start = function () {
		toast();
	};

	var toast = function () {

		$hand1.velocity({
			translateX: "93%",
			translateY: "-124%"
		}, {
			duration: time,
			easing: 'easeOutQuint'
		});
		$hand2.velocity({
			translateX: "100%",
			translateY: "-90%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

		$hand3.velocity({
			translateX: "-110%",
			translateY: "-90%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

		$hand4.velocity({
			translateX: "-90%",
			translateY: "-30%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

		$mainHand.velocity({
			translateY: "-80%"
		}, {
			duration: time,
			easing: 'easeOutQuint',
			complete: function () {
                if (isMobile.any()){
                    $nextFrame = $('#form-mobile');
                }
				$nextFrame.velocity('fadeIn', 1500, function(){
					$(".landscape-overlay").fadeOut();
					$element.remove();
				});
			}
		});
	};

	$element.on('start', animation_start);
});