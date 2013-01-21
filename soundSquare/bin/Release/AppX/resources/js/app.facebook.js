var app = app || {};
app.facebook = {};


(function(){


	app.facebook.islogin = null;


    app.facebook.config = {};
    app.facebook.appid = null;
    app.facebook.perm = null;



    app.facebook._setParams = function (config) {
    	config = config || {};

    	app.facebook.config = config || {};
    	app.facebook.appid = config.appid;
    	app.facebook.perm = config.permission;
    	app.facebook.token = config.token || null;

    	return;
    }



    /**
     * SDKの実行等 
     */
    app.facebook.init = function(config){
    	config = config || {};

    	app.facebook._setParams(config);


        //javascriptSDKがロード完了したら呼び出し
        window.fbAsyncInit = function(){
        	var p = {
        		appId: app.facebook.appid,
        		status: true, // ステータスをチェックする。
        		cookie: true, //クッキーを使えるようにする。
        		xfbml: true  //XFBMLを使えるようにする。
        	};
            
        	if (app.facebook.token) {
        		p.accessToken = app.facebook.token;
        	}

            FB.init(p);

            app.facebook.getStatus({
                callback: function(res){
                    if(!$.isFunction(config.callback)){
                        return;
                    }
                    
                    config.callback.call(config.scope || this, res);
                    return;
                }
            });
            return;
        }

        //FacebookSDKを読み込み
        var el = document.createElement('script');
        el.src = document.location.protocol + '//connect.facebook.net/ja_JP/all.js';
        document.getElementById('fb-root').appendChild(el);
        return;
    }




    /**
     * ログインステータスを取得 
     */
    app.facebook.getStatus = function(config){
        config = config || {};
        
        FB.getLoginStatus(function(res){
            app.facebook.islogin = res;
            
            if(!$.isFunction(config.callback)){
                return;
            }

            config.callback.call(config.scope || this, res);
            return;
        });
        return;
    }



    /**
     * JSベースでログインを実行 
     */
    app.facebook.login = function(config){
        config = config || {};
        FB.login(function(res){
        
            if(!$.isFunction(config.callback)){
                return;
            }

            config.callback.call(config.scope || this, res);
            return;
        },{scope: app.facebook.perm});
    }



    /**
     * JSベースでログアウトを実行 
     */
    app.facebook.logout = function(config){
        config = config || {};

        FB.logout(function(res){
        
            if(!$.isFunction(config.callback)){
                return;
            }

            config.callback.call(config.scope || this, res);
            return;
        });
    }



    app.facebook.send = function(config){
        config = config || {};
        FB.ui($.extend({method: 'send'}, config));
    }



})();
