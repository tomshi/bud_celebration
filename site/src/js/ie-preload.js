var getReady = function () {

	$("#loading").show();

	var imageNames = [
		'img/bottle.png',
		'img/bottle-desk.jpg',
		'img/bottle-desk-bg.jpg',
		'img/engrave.png',
		'img/hand.png',
		'img/hand1.png',
		'img/hand2.png',
		'img/hand3.png',
		'img/hand4.png',
		'img/hands-bg.jpg',
		'img/dust.png',
		'img/dust-toast.png',
		'img/bright.png',
		'img/model1.png',
		'img/model2.png',
		'img/model3.png',
		'img/model4.png',
		'img/model5.png',
		'img/model6.png',
		'img/light.png',
		'img/photo1.jpg',
		'img/photo2.jpg',
		'img/photo3.jpg',
		'img/photo4.jpg',
		'img/photo5.jpg',
		'img/frame1-bg.jpg',
		'img/frame2-bg.jpg',
		'img/frame3-bg.jpg',
		'img/share.jpg',
		'img/sharing-close.png',
		'img/sharing-douban.png',
		'img/sharing-qq.png',
		'img/sharing-qzone.png',
		'img/sharing-renren.png',
		'img/sharing-sina.png',
		'img/sharing-wechat.png'
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

var dataReady = function () {
    $('#form').fadeOut();
    TweenMax.to("#ie-frame1" , 2, {
        opacity: 1,
        delay: 0,
        ease: Sine.SineIn,
        onComplete: function(){
            TweenMax.to("#ie-frame1" , 2, {
                opacity: 0,
                delay: 3,
                ease: Sine.SineIn
            });
            TweenMax.to("#ie-frame2" , 2, {
                opacity: 1,
                delay: 3,
                ease: Sine.SineIn,
                onComplete: function(){
                    TweenMax.to("#ie-frame2" , 2, {
                        opacity: 0,
                        delay: 3,
                        ease: Sine.SineIn
                    });
                    TweenMax.to("#ie-frame3" , 2, {
                        opacity: 1,
                        delay: 3,
                        ease: Sine.SineIn,
                        onComplete: function(){
                            TweenMax.to("#ie-frame3" , 2, {
                                opacity: 0,
                                delay: 3,
                                ease: Sine.SineIn
                            });
                            TweenMax.to("#ie-frame4" , 2, {
                                opacity: 1,
                                delay: 3,
                                ease: Sine.SineIn,
                                onComplete: function(){
                                    TweenMax.to("#ie-frame4" , 2, {
                                        opacity: 0,
                                        delay: 3,
                                        ease: Sine.SineIn
                                    });
                                    TweenMax.to("#ie-frame5" , 2, {
                                        opacity: 1,
                                        delay: 3,
                                        ease: Sine.SineIn,
                                        onComplete: function(){
                                            TweenMax.to("#ie-frame5" , 2, {
                                                opacity: 0,
                                                delay: 3,
                                                ease: Sine.SineIn
                                            });
                                            TweenMax.to("#ie-frame6" , 2, {
                                                opacity: 1,
                                                delay: 3,
                                                ease: Sine.SineIn,
                                                onComplete: function(){
                                                    $("#ending").show();
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