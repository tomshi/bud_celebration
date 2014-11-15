$(function () {
	var imageNames = [
		'img/frame1-bg.jpg',
		'img/frame1-bg2.jpg',
		'img/hand.png',
		'img/model1.png',
		'img/model2.png'
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
