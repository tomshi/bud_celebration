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
        'img/dust-toast.png',
        'img/bright.png',
        'img/model1.png',
        'img/model2.png',
        'img/frame1-bg.jpg',
        'img/model3.png',
        'img/model4.png',
        'img/frame2-bg.jpg',
		    'img/model5.png',
		    'img/model6.png',
		    'img/frame3-bg.jpg',
	      'img/light.png',
	      'img/photo1.jpg',
		    'img/photo2.jpg',
		    'img/photo3.jpg',
		    'img/photo4.jpg',
	      'img/photo5.jpg'
    ];

    // Setting first animation here
    var $FIRST_FRAME = $("#toast");

    var imagesCount = imageNames.length;
    var loadedImagesCount = 0;
    var images = [];

    for (var i = 0; i < imagesCount; i++) {
        images[i] = new Image();
        images[i].src = imageNames[i];
        images[i].onload = function () {
            var progress = Math.ceil(100 * (++loadedImagesCount / imagesCount));
            $("#loading-now").css("width", progress + "%");
            if (loadedImagesCount >= imagesCount) {
                $("#loading").fadeOut();
                setTimeout(function () {
                    $FIRST_FRAME.show().trigger('start');
                }, 400);
            }
        };
    }
};