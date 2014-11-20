$(function () {
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
		'img/bright.png'
	];

	// Setting first animation here
	var $FIRST_FRAME = $('#frame1');

	var imagesCount = imageNames.length;
	var loadedImagesCount = 0;
	var images = [];

	for (var i = 0; i < imagesCount; i++) {
		images[i] = new Image();
		images[i].src = imageNames[i];
		images[i].onload = function () {

			var progress = Math.ceil(100 * (++loadedImagesCount / imagesCount));

			if (loadedImagesCount >= imagesCount) {
				setTimeout(function () {

					$FIRST_FRAME.show().trigger('start');

				}, 300);
			}
		};
	}
});
