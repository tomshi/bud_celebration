var CDN ='http://toast-365days.b0.upaiyun.com/';
var getReady = function () {
	$("#loading").show();
	
	var imageNames = [
		'img/hand.png',
		'img/hand1.png',
		'img/hand2.png',
		'img/hand3.png',
		'img/hand4.png',
		'img/hands-bg.jpg'
	];

	var imagesCount = imageNames.length;
	var resourceCount = imagesCount;
	var loadedResourceCount = 0;
	var images = [];


	var count = function () {
		if (loadedResourceCount >= resourceCount) {
			$("#loading").fadeOut();
			$("#toast-first").show().trigger('start');
		}
	};

	for (var i = 0; i < imagesCount; i++) {
		images[i] = new Image();

		images[i].src = CDN ? CDN + imageNames[i]:imageNames[i];
		images[i].onload = function () {
			var progress = Math.ceil(100 * (++loadedResourceCount / resourceCount));
			$("#loading-now").css("width", progress + "%");
			count();
		};
	}
};