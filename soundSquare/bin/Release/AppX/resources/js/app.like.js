var app = app || {};
app.like = {};


(function () {
    "use strict";

    var cn = null;



    app.like.createStage = function(config){
        config = config || {};

        //実行
        var stage = new lib.stage({
            id: "stage3",
            omit: [0, 1, 2, 3, 4],
            listeners: $.extend({
                init: function(c){
                    //タイトルバーの表示
                    app.like.titlebar.show({
                        width: c.w * 5,
                        height: c.w * 1,
                        callback: function(){
                            //ダウロード総数を送付
                            c.load({
                                url: app.config.apiurl + "/index.php/like/feed"
                            });
                            return;
                        }
                    });
                    
                    return;
                },
                blockmouseup: function(c){
                    c.play();
                    return;
                },
                blockmousedown: function(c){
                    //app.like.titlebar.hide();
                    return;
                },
                prepare: function(c, info){
                    //ステータスバーの表示
                    app.statusbar.hide();
                    var prepare = app.statusbar.show({
                        activity: true,
                        text: String.format('再生の準備中...'),
                        duration: 30000
                    });
                    return;
                },
                ready: function(c, info){
                    app.statusbar.hide();
                    return;
                },
                play: function(c, info){
                    //app.like.titlebar.hide();
                    
                    //ステータスバーの表示
                    app.statusbar.show({
                        image: info['imageurl'],
                        text: String.format(
                            '<strong>{0}</strong>&nbsp;{1}',
                            info['name'], info['artist_name']
                        ),
                        duration: 5000
                    });
                    return;
                },
                pause: function(c){
                    app.like.titlebar.show();
                    return;
                },
                complete: function(c){
                    app.like.titlebar.show();
                    return;
                }
            }, config.listeners || {})
        });

        return stage;
    }

    
    
    app.like.titlebar = {};
    app.like.titlebar.show = function(config){
        config = config || {};

        //タイトルの表示
        if(!cn){
            cn = app.like.titlebar.create(config);

            cn.css('opacity', 0);
            cn.animate({
                opacity: 1
            }, 800, null, function(){
                if($.isFunction(config.callback)){
                    config.callback.call(config.scope || this);
                } 
                return;
            });
            //app.titlebar.login();
            return;
        }else{
            cn.animate({
                top: 0 
            }, 400);
        }

        return cn;
    }



    /**
     * タイトルバーを非表示に
     */
    app.like.titlebar.hide = function(config)
    {
        config = config || {};

        if(!cn) return cn;

        cn.animate({
            top: -200
        }, 400);
    }



    /**
     * タイトルを表示 
     */
    app.like.titlebar.create = function(config){
        config = config || {};

        var w = config.width;
        var h = config.height;

        var t = $('<div class="titlebar" />');
        t.css('width', w);
        t.css('height', h);

        var a = $('<div class="icon-right-arrow" />').appendTo(t);
        a.css('position', 'absolute').css('top', 5).css('left', 5);
        a.on('click', function(){
            return;
        });

        var pr = $('<div class="profile" />').appendTo(t);
        pr.width(w - 70);
        pr.css('position', 'absolute').css('top', 5).css('left', 65);
        
        if(app.register.isLogin()){
            app.register.getUser({
                success: function(res){
                    if(!res.success || !res.result){
                        return;
                    }
                    
                    var r = res.result[0] || {};

                    var bl = $('<div class="left" />').appendTo(pr);
                    var img = $('<img />').appendTo(bl);
                    img.attr('src', r.imageurl);

                    var main = $('<div class="main" />');
                    var name = $('<div class="name" />').appendTo(main);
                    name.text(r.name);

                    var desc = $('<div class="desc" />').appendTo(main);
                    desc.text('Likes');
                    
                    main.appendTo(pr);

                    return;
                }
            });
        }
        
        t.appendTo($(document.body));
        return t;
    }




})();
