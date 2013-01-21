var app = app || {};
app.facebook = app.facebook || {};

/**
 * Windows用Facebook認証
 */
(function(){



	/**
	 * 初期化関数
	 */
	app.facebook.init = function (config) {
		config = config || {};

		config.token = localStorage.getItem('fb_access_token');

		app.facebook._setParams(config);

		FB.init({
			appId: app.facebook.appid,
			status: true, // ステータスをチェックする。
			cookie: true, //クッキーを使えるようにする。
			xfbml: true  //XFBMLを使えるようにする。
		});

		if ($.isFunction(config.callback)) {
			config.callback.call(config.scope || this, { status: 'disconnected' });
		}
		return;
	};



})();