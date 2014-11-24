$(function () {
	"use strict";
	if (!Array.prototype.find) {
		Array.prototype.find = function (predicate) {
			if (this == null) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;

			for (var i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return value;
				}
			}
			return undefined;
		};
	}

	var today;
	var fadeInTime = 1000;
	var fadeOutTime = 1000;

	var $caption = $('#caption');
	var $toast = $('.caption-toast', $caption);
	var $frame1 = $('.caption.frame1', $caption);
	var $frame2 = $('.caption.frame2', $caption);
	var $frame3 = $('.caption.frame3', $caption);
	var $frame4 = $('.caption.frame4', $caption);
	var $bottle = $('.caption.bottle', $caption);

	window.CAPTION = {
		getReady: function () {
			today = ugc_date.split('/');
			var month = today[0];
			var day = today[1];

			today = DATA_HISTORY.find(function (element, index, array) {
				return element.date == ugc_date
			});

			$('.ugc-name', $caption).text(ugc_name);
			$('.ugc-purpose', $caption).text(ugc_purpose);
			$('.month', $caption).text(month);
			$('.day', $caption).text(day);

			var formatHistory = function (history) {
				var history = history.split('|');
				return '<div class="today">' + history.shift() + '</div>' + history.join('<br/>');
			};

			$frame1.html(formatHistory(today.history1));
			$frame2.html(formatHistory(today.history2));
			$caption.show();
		},

		toast: function () {
			$toast.velocity("fadeIn", fadeInTime);
		},

		frame1: function () {
			$toast.velocity("fadeOut", fadeOutTime, function () {
				$frame1.velocity("fadeIn", fadeInTime);
			});
		},
		frame2: function () {
			$frame1.velocity("fadeOut", fadeOutTime, function () {
				$frame2.velocity("fadeIn", fadeInTime);
			});
		},
		frame3: function () {
			$frame2.velocity("fadeOut", fadeOutTime, function () {
				$frame3.velocity("fadeIn", fadeInTime);
			});
		},
		frame3FadeOut: function () {
			$frame3.velocity("fadeOut", fadeOutTime);
		},
		frame4: function () {
			$frame4.velocity("fadeIn", fadeInTime);
		},
		bottleIn: function () {
			$frame4.velocity("fadeOut", fadeOutTime, function () {
				$bottle.velocity("fadeIn", fadeInTime);
			});
		},
		bottleOut: function () {
			$bottle.velocity("fadeOut", fadeOutTime, function(){
				$caption.hide();
			});
		}
	};
});
