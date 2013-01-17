var app = app || {};
app.facebook = {};


(function(){

    var login = null;

    var appid = null;
    var perm = null;



    /**
     * SDKの実行等 
     */
    app.facebook.init = function(config){
        config = config || {};
        appid = config.appid;
        perm = config.permission;

        //javascriptSDKがロード完了したら呼び出し
        window.fbAsyncInit = function(){
            FB.init({
                appId  : appid,
                status : true, // ステータスをチェックする。
                cookie : true, //クッキーを使えるようにする。
                xfbml  : true  //XFBMLを使えるようにする。
            });

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



    if (window.WinJS) {
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
                config.callback.call(config.scope || this, { status: 'disconnected'});
            }
            return;
        };
    }




    /**
     * ログインステータスを取得 
     */
    app.facebook.getStatus = function(config){
        config = config || {};
        
        FB.getLoginStatus(function(res){
            login = res;
            
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
        },{scope: perm});
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
