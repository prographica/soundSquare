﻿var app = app || {};
app.setting = {};



(function(){

    var cn = null;


    app.setting.show = function(config){
        config = config || {};

        if(!cn){
            cn = app.setting.create(config);
            cn.appendTo($(document.body));
            cn.css('top', 0).css('left', app.config.screenWidth);
        }

        //ログインしているか、していないかで出し分け
        if(app.register.isLogin()){
            cn.trigger('login');
        }else{
            cn.trigger('logout');
        }

		//透明のモーダルウィンドウを表示
        var m = app.modal.show({
            color: 'transparent'
        });
        m.on('click', function(){
            app.modal.hide();
            app.setting.hide();
            return;
        });
        cn.animate({top: 0, left: app.config.screenWidth - cn.width()}, 200);
        return;
    }



    app.setting.hide = function(){
        if(!cn) return;
        cn.animate({top: 0, left: app.config.screenWidth}, 100, function(){
            cn.remove();
            cn = null;
            return;
        });
    }



    /**
     * 設定画面を描画 
     */
    app.setting.create = function(config){
        config = config || {};
        
        var el = $('<div class="setting"/>');
        $('<div class="bg" />').appendTo(el);

        //ログイン情報を表示
        var bd = $('<div class="body"/>');
        var pr = $('<div class="profile" />').appendTo(bd);

        //ユーザー情報から情報を取得して表示
        if(app.register.isLogin()){
        }

        var p = {
        	about: 'このサービスについて',
			privacy: 'プライバシーポリシー',
            invite: '友達を誘う',
            logout: 'ログアウト',
            register: '登録/ログイン'
        };

        var ul = $('<ul class="list"/>').appendTo(bd);
        $.each(p, function(k, v){
            var li = $('<li></li>').appendTo(ul);
            li.attr('id', k);
            li.text(v);

            li.css('cursor', 'pointer');
            li.on('click', function(e){
                app.modal.hide();
                app.setting.hide();

                switch(k){
                    case 'logout':
                        app.register.logout();
                        break;

                    case 'register':
                        app.register.show();
                        break;

                    case 'invite':
                        app.facebook.send({
                            name: app.config.name,
                            link: app.config.url
                        });
                        break;

                    case 'about':
                        app.modal.window({
                            tpl: $('#about-win')
                        });
                        break;

                	case 'privacy':
                		window.open(app.config.privacyurl);
                		break;
                }
            });
        });

        bd.appendTo(el);
        el.width(config.width);
        el.height(config.height);

        //ログインしている状態であれば実行
        el.on('login', function(){
            app.register.getUser({
                success: function(res){
                    if(!res.success || !res.result){
                        return;
                    }
                    
                    var r = res.result[0] || {};

                    var bl = $('<div class="left" />').appendTo(pr);
                    var img = $('<img />').appendTo(bl);
                    img.attr('src', r.imageurl);

                    var name = $('<div class="main" />');
                    name.text(r.name);
                    name.appendTo(pr);

                    return;
                },
                scope: this
            });
        
            $.each(p, function(k, v){
                $('#'+k, bd).hide();
            });
            
            $('#about', bd).show();
            $('#privacy', bd).show();
            $('#invite', bd).show();
            $('#logout', bd).show();
            return;
        });

        //ログインしていない場合
        el.on('logout', function(){
            $('#profile', cn).hide();

            $.each(p, function(k, v){
                $('#'+k, bd).hide();
            });

            $('#about', bd).show();
            $('#privacy', bd).show();
            $('#register', bd).show();
            return;
        });

        return el;
    }



})();
