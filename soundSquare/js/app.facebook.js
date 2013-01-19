var app = app || {};
app.facebook = app.facebook || {};

/**
 * Windows用Facebook認証
 */
(function(){



	app.facebook.init = function (config) {

		config = config || {};
		appid = config.appid;
		perm = config.permission;

		FB.init({
			appId: appid,
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