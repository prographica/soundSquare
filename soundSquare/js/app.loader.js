/**
 * app.loader.js
 *
 * このJSは必ず/resource以下にあるもの以降に読み込むこと
 */
var app = app || {};


(function () {


	/**
	 * ローダーを作る（HTML5ベースで作成）
	 */
	app.loader.create = function (config) {
		config = config || {};

		var el = $('<div class="loader"></div>');
		$('<div class="bg" />').appendTo(el);
		$('<progress class="spinner win-ring win-large"/>').appendTo(el);
		el.hide();

		el.show = function () {
			sp();
			el.fadeIn();
		};

		el.hide = function () {
			el.fadeOut(null, function () {
				el.remove();
			});
			return;
		}

		var sp = function () {
			var x = (($(config.target).width() || $(window).width()) - el.width()) / 2;
			el.css('left', x);

			var y = (($(config.target).height() || $(window).height()) - el.height()) / 2;
			el.css('top', y);
		}
		$(window).resize(sp);

		return el;
	}



})();