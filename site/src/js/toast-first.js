$(function () {
	var $element;
    var $nextFrame;
    if (isMobile.phone()){
        $element = $('#toast-first-mobile');
        $nextFrame = $('#form-mobile');
    }else {
        $element = $('#toast-first');
        $nextFrame = $('#form');
    }

	var $hand1 = $('.hand1', $element);
	var $hand2 = $('.hand2', $element);
	var $hand3 = $('.hand3', $element);
	var $hand4 = $('.hand4', $element);
	var $hand5 = $('.hand5', $element);

	var time = 1600;

	var animation_start = function () {
        if (isMobile.phone()){
            toastMobile();
        }else {
            toast();
        }
	};

	var toastMobile = function () {
		$hand1.velocity({
			translateX: "75%",
			translateY: "-120%"
		}, {
			duration: time,
			easing: 'easeOutQuint'
		});
		$hand2.velocity({
			translateX: "97%",
			translateY: "-90%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

		$hand3.velocity({
			translateX: "-79%",
			translateY: "-96%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

		$hand4.velocity({
			translateX: "-12%",
			translateY: "-112%"
		}, {
			duration: time + 200,
			easing: 'easeOutQuint'
		});

        $hand5.velocity({
            translateX: "0",
            translateY: "-82%"
        }, {
			duration: time,
			easing: 'easeOutQuint',
		    complete: function () {
				$nextFrame.velocity('fadeIn', 1500, function(){
					$(".landscape-overlay").fadeOut();
				});
			}
		});
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

        $hand5.velocity({
            translateY: "-80%"
        }, {
			duration: time,
			easing: 'easeOutQuint',
		    complete: function () {
				$nextFrame.velocity('fadeIn', 1500, function(){
					$(".landscape-overlay").fadeOut();
				});
			}
		});
	};

    console.log($element);
	$element.on('start', animation_start);
});