/**
 * Window用アップバー制御
 */

var app = app || {};
app.appbar = {};

(function () {



	app.appbar.init = function () {

		/*
		$('#appbar-play', $('#appBar')).on('click', function () {
			var s = app.main.getCurrentStage();
			if (!s.isPlaying()) {
				s.play();
				this.winControl.icon = 'pause';
				return;
			} else {
				s.play();
				this.winControl.icon = 'play';
				return;
			}

		});
		*/

		$('#appbar-reload', $('#appBar')).on('click', function () {
			var s = app.main.getCurrentStage();
			if (!s) return;

			s.unload();
			s.load();

			return;
		});
	}



})();