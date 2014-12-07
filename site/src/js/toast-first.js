$(function () {
	var $element = $('#toast-first');
	var $nextFrame = $('#form');
	var $hand1 = $('.hand1', $element);
	var $hand2 = $('.hand2', $element);
	var $hand3 = $('.hand3', $element);
	var $hand4 = $('.hand4', $element);
	var $hand5 = $('.hand5', $element);


	var time = 1600;


	var animation_start = function () {
		toast();
	};

	var toast = function () {

		$hand1.velocity({
			translateX: "93%",
			translateY: "-134%"
		}, {
			duration: time,
			easing: 'easeOutQuint'
		});
		$hand2.velocity({
			translateX: "99%",
			translateY: "-100%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

		$hand3.velocity({
			translateX: "-104%",
			translateY: "-100%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

		$hand4.velocity({
			translateX: "-84%",
			translateY: "-40%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

        $hand5.velocity({
            translateY: "-88%"
        }, {
			duration: time,
			easing: 'easeOutQuint',
			complete: function () {
                if (isMobile.phone()){
                    $nextFrame = $('#form-mobile');
                }
				$nextFrame.velocity('fadeIn', 1500, function(){
					$(".landscape-overlay").fadeOut();
					//$element.remove();
				});
			}
		});
	};

	$element.on('start', animation_start);
});