$(function () {
	if (window.location.pathname.indexOf('ie') === -1) {
		var $element = $('#endingwrite');

		var can = document.getElementById('endingwrite');
		var ctx = can.getContext('2d');

		var requestAnimationFrame = (function () {
			var lastTime = 0;
			return  window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
				function (callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function () {
							callback(currTime + timeToCall);
						},
						timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
		})();

		var imageReady = function (src) {
			var img = new Image();
			var isReady = $.Deferred();
			img.onload = function () {
				isReady.resolve(img);
			};
			img.src = src;
			return isReady.promise();
		};

		var imagesPath = [];
		for (var i = 1; i < 76; i++) {
			imagesPath.push(imageReady("img/endingwrite/endingtextwriting_000" + (i < 10 ? '0' + i : i) + ".png"));
		}


		var when = function () {
			var deferredList = [];
			for (var i = 0; i < arguments.length; i++) {
				if (!$.isFunction(arguments[i])) {
					deferredList = deferredList.concat(arguments[i]);
				}
			}
			return $.when.apply($, deferredList);
		};


		var paint = function () {

			when($, imagesPath).done(function () {
				var width = can.width;
				var height = can.height;

				var i = 0;
				var imgs = arguments;
				var length = imgs.length;

				var startTime = null;
				var speed = 50;

				var draw = function (timestamp) {
					var img = imgs[i];

					if (startTime === null) startTime = timestamp;
					var progress = timestamp - startTime;
					if ((progress / speed) > i) {
						ctx.clearRect(0, 0, width, height);
						ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
						i++;
					}

					if (i < length) {
						requestAnimationFrame(draw);
					}
				};

				requestAnimationFrame(draw);
			});
		};


		var animation_start = function () {
			var width = $('#bottle').width() * 0.45625;
			can.width = width;
			can.height = width / 4.866666667;

			paint();
		};

		$element.on('draw', animation_start);

	}
});
