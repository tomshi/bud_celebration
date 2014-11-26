var getReadyByIE = function () {

	$("#loading").show();

	var imageNames = [
		'img/ie/0.jpg',
        'img/ie/1.jpg',
        'img/ie/2.jpg',
        'img/ie/3.jpg',
        'img/ie/4.jpg',
        'img/ie/5.jpg',
        'img/ie/6.jpg',
        'img/ie/7.jpg',
        'img/ie/8.jpg',
        'img/ie/9.jpg',
        'img/ie/10.jpg',
        'img/ie/11.jpg'
	];

	var imagesCount = imageNames.length;
	var resourceCount = imagesCount;
	var loadedResourceCount = 0;
	var images = [];

	for (var i = 0; i < imagesCount; i++) {
		images[i] = new Image();
		images[i].src = imageNames[i];
		images[i].onload = function () {
			var progress = Math.ceil(100 * (++loadedResourceCount / resourceCount));
			$("#loading-now").css("width", progress + "%");
            if (loadedResourceCount >= resourceCount) {
                $("#loading").fadeOut();
                $('#form').fadeIn();
            }
		};
	}
};

var dataReadyByIE = function () {
    var today = ugc_date.split('/');
    var month = today[0];
    var day = today[1];
    today = DATA_HISTORY.find(function (element, index, array) {
        return element.date == ugc_date
    });
    $(".ugc-name").text(ugc_name);
    $(".ugc-purpose").text(ugc_purpose);
    $(".month").text(month);
    $(".day").text(day);
    var formatHistory = function (history) {
        var history = history.split('|');
        return '<div class="today">' + history.shift() + '</div>' + history.join('<br/>');
    };
    $("#ie-frame2-text").html(formatHistory(today.history1));
    $("#ie-frame3-text").html(formatHistory(today.history2));

    $('#form').fadeOut();
    TweenMax.to("#ie-frame1" , 2, {
        opacity: 1,
        delay: 0,
        ease: Sine.SineIn,
        onComplete: function(){
            TweenMax.to("#ie-frame1" , 2, {
                opacity: 0,
                delay: 1.5,
                ease: Sine.SineIn
            });
            TweenMax.to("#ie-frame2" , 2, {
                opacity: 1,
                delay: 1.5,
                ease: Sine.SineIn,
                onComplete: function(){
                    TweenMax.to("#ie-frame2" , 2, {
                        opacity: 0,
                        delay: 1.5,
                        ease: Sine.SineIn
                    });
                    TweenMax.to("#ie-frame3" , 2, {
                        opacity: 1,
                        delay: 1.5,
                        ease: Sine.SineIn,
                        onComplete: function(){
                            TweenMax.to("#ie-frame3" , 2, {
                                opacity: 0,
                                delay: 1.5,
                                ease: Sine.SineIn
                            });
                            TweenMax.to("#ie-frame4" , 2, {
                                opacity: 1,
                                delay: 1.5,
                                ease: Sine.SineIn,
                                onComplete: function(){
                                    TweenMax.to("#ie-frame4" , 1, {
                                        opacity: 0,
                                        delay: 0.8,
                                        ease: Sine.SineIn
                                    });
                                    TweenMax.to("#ie-frame5" , 1, {
                                        opacity: 1,
                                        delay: 0.8,
                                        ease: Sine.SineIn,
                                        onComplete: function(){
                                            TweenMax.to("#ie-frame5" , 1, {
                                                opacity: 0,
                                                delay: 0.8,
                                                ease: Sine.SineIn
                                            });
                                            TweenMax.to("#ie-frame6" , 1, {
                                                opacity: 1,
                                                delay: 0.8,
                                                ease: Sine.SineIn,
                                                onComplete: function(){
                                                    TweenMax.to("#ie-frame6" , 1, {
                                                        opacity: 0,
                                                        delay: 0.8,
                                                        ease: Sine.SineIn
                                                    });
                                                    TweenMax.to("#ie-frame7" , 1, {
                                                        opacity: 1,
                                                        delay: 0.8,
                                                        ease: Sine.SineIn,
                                                        onComplete: function(){
                                                            TweenMax.to("#ie-frame7" , 1, {
                                                                opacity: 0,
                                                                delay: 0.8,
                                                                ease: Sine.SineIn
                                                            });
                                                            TweenMax.to("#ie-frame8" , 1, {
                                                                opacity: 1,
                                                                delay: 0.8,
                                                                ease: Sine.SineIn,
                                                                onComplete: function(){
                                                                    TweenMax.to("#ie-frame8" , 1, {
                                                                        opacity: 0,
                                                                        delay: 0.8,
                                                                        ease: Sine.SineIn
                                                                    });
                                                                    TweenMax.to("#ie-frame9" , 1, {
                                                                        opacity: 1,
                                                                        delay: 0.8,
                                                                        ease: Sine.SineIn,
                                                                        onComplete: function(){
                                                                            TweenMax.to("#ie-frame9" , 1, {
                                                                                opacity: 0,
                                                                                delay: 0.8,
                                                                                ease: Sine.SineIn
                                                                            });
                                                                            TweenMax.to("#ie-frame10" , 1, {
                                                                                opacity: 1,
                                                                                delay: 0.8,
                                                                                ease: Sine.SineIn,
                                                                                onComplete: function(){
                                                                                    TweenMax.to("#ie-frame10" , 2, {
                                                                                        opacity: 0,
                                                                                        delay: 2,
                                                                                        ease: Sine.SineIn
                                                                                    });
                                                                                    TweenMax.to("#ending" , 2, {
                                                                                        opacity: 1,
                                                                                        delay: 2,
                                                                                        ease: Sine.SineIn,
                                                                                        onComplete: function(){
                                                                                            TweenMax.to(".endtext", 1, {
                                                                                                opacity: 1,
                                                                                                delay: 0.7,
                                                                                                ease: Sine.SineIn
                                                                                            });
                                                                                            TweenMax.to(".btns .item", 1, {
                                                                                                opacity: 1,
                                                                                                delay: 1.8,
                                                                                                ease: Sine.SineIn
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};