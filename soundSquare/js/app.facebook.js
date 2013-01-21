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
		config.expires = localStorage.getItem('fb_access_token_expires');

		app.facebook._setParams(config);

		FB.init({
			appId: app.facebook.appid,
			accessToken: app.facebook.token,
			expires: app.facebook.expires,
			status: true, // ステータスをチェックする。
			cookie: true, //クッキーを使えるようにする。
			xfbml: true  //XFBMLを使えるようにする。
		});

		app.facebook.getStatus({
			callback: function (res) {
				if (!$.isFunction(config.callback)) {
					return;
				}

				config.callback.call(config.scope || this, res);
				return;
			}
		});

		return;
	};



	/**
     * ログインステータスを取得 
     */
	app.facebook.getStatus = function (config) {
		config = config || {};

		var t = FB.getAccessToken();

		console.dir(t);

		//ログイン成功
		if (t) {

		    //サーバ側認証のためにTokenを送信
		    app.ajax.request({
		        url: app.config.apiurl + "/index.php/user/auth",
		        data: {
                    token: t
		        },
		        success: function (res) {

		            if (!res.success) {
		                config.callback.call(config.scope || this, {
		                    status: 'not_authorized'
		                });
		                return;
		            }

		            var res = {
		                status: 'connected',
		                session: {
		                    access_token: FB.getAccessToken(),
		                    expires: FB.getAccessTokenExpires(),
		                }
		            };

		            app.facebook.islogin = res;

		            if(!$.isFunction(config.callback)) {
		                return;
		            }

		            config.callback.call(config.scope || this, res);
		            return;
		        }
		    });
		}
        //そもそもトークンがない場合
		else {
		    config.callback.call(config.scope || this, {
                status: 'not_authorized'
		    });
		};

		return;
	}



})();