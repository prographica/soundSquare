var app = app || {};
app.register = {};



(function(){

    var base = null;


    app.register.show = function(config){
        config = config || {};

        var w = config.width || app.config.screenWidth;
        var sh = app.config.screenHeight;
        var h = config.height || 220;

        if(!base){
            base = app.register.create(config || {});
        }

        base.show();
        base.css('width', w);
        base.css('height', h);
            
        base.css('top', ((sh - h) / 2) < 0 ? 0 : ((sh - h) / 2));
        base.css('left', 0);

        var m = app.modal.show();
        m.on('click', function(){
            app.register.hide();
            return;
        });
        return base;
    }



    app.register.hide = function(){
        app.modal.hide();
        if(base) base.hide();
        return;
    }



    /**
     * 自分自身がログインしているか検査 
     */
    app.register.isLogin = function(){
        
        if(!user.me){
            return false;
        }
        
        return true;
    }




    /**
     * 自分自身の情報を取得 
     */
    var user = {};
    app.register.getUser = function(config)
    {
        config = config || {};
        var cb = config.success || null;
        var cbf = config.failure || null;

        if(user.me && navigator.onLine){
            if(cb) cb.call(this, user.me);
            return;
        }

        app.ajax.request({
            url: app.config.apiurl + "/index.php/user/me",
            success: function(res){

                if(!res.success || !res.result){
                    if(cb) cb.call(this, res);
                    return;
                }
            
                //キャッシュを保存
                user.me = res;
                
                if(cb) cb.call(this, res);
                return;
            },
            failure: function(){

                //連携していないまたは、オフライン等
                app.register.show();

                if(cbf) cbf.call(this, {success: false});
                return;
            },
            scope: config.scope || this
        }); 
    }




    /**
     * ログイン後・継続ログインしている場合に実行
     */
    app.register.complete = function (res) {

    	console.log(res);

        app.ajax.request({
            url: app.config.apiurl + "/index.php/user/me",
            success: function(res){

                if(!res.success || !res.result){
                    delete user.me;
                    app.titlebar.notlogin();
                    return;
                }

                //登録画面を非表示に
                app.register.hide();

                var v = res.result[0];

                //ステータスバーの表示
                app.statusbar.show({
                    image: v['imageurl'],
                    text: String.format('Welcome back, {0}!', v['name'])
                });

                //キャッシュに保存
                user.me = res;

                //ログインした状態に
                app.titlebar.login();
                return;
            }
        });
    
        return;
    }



    /**
     * ログインウィンドウを作成 
     */
    app.register.create = function(config){
        config = config || {};

        var r = $('#register-win').appendTo($(document.body));
        
        $('#button', $(r)).on('click', function(e){

            if(!navigator.onLine){
                alert(app.error.offline);
                return;
            }

            app.facebook.login({
                callback: function(res){
                    app.register.complete(res);
                    return;
                }
            });
            return;
        });
        
        return r;
    }



    /**
     * ログアウト 
     */
    app.register.logout = function(config){
        config = config || {};

        app.modal.confirm({
            message: 'Are you sure to logout?',
            callback: function(d){
                if(d !== 'YES') return;

                app.facebook.logout({
                    callback: function(e){
                        app.titlebar.notlogin();
                        user = {};
                        return;
                    },
                    scope: this
                });

                return;
            },
            scope: this
        });
    }



})();
