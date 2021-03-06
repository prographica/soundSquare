﻿var app = app || {};
app.main ={};


(function(){


	var stage = null;


	app.main.getCurrentStage = function () {
		return stage.getCurrentStage();
	}



    /**
     * ステージを作成 
     */
    app.main.createStage = function(config){
        config = config || {};

        //実行
        stage = new lib.stage({
            id: "stage",
            listeners: $.extend({
                show: function(){
                    app.titlebar.show();
                    return;
                },
                //cは自分自身（stage）が戻ってくる
                init: function(c){

                    //タイトルバーの表示
                    app.titlebar.show({
                        target: c,
                        width: c.w * 5,
                        height: c.w * 2,
                        callback: function(){
                            stage.load({
                                url: app.config.apiurl + "/index.php/song/feed"
                            });
                            return;
                        },
                        listeners: {
                            //登録ボタン
                            register: function(){
                                app.register.show();
                                return;
                            },
                            //設定ボタン
                            settings: function(){
                                app.setting.show({
                                    width: 400,
                                    height: app.config.screenHeight
                                });
                                return;
                            },
                            //チュートリアルボタン
                            tutorial: function(){
                                app.tutorial.show();
                                return;
                            },
                            //お気に入りボタン
                            likes: function(){
                                app.titlebar.hide();
                                c.hide({
                                    callback: function(){
                                        
                                        //お気に入り画面を作成
                                        app.like.createStage({
                                            listeners: {
                                                hide: function(se){
                                                    se.destroy();
                                                    c.show();
                                                    return;
                                                }
                                            }
                                        });
                                        return;
                                    }
                                });
                                return;
                            }
                        },
                        scope: this
                    });
                },
                blockmouseup: function(c){
                    c.play();
                    return;
                },
                blockmousedown: function(c){
                    app.titlebar.hide({
                        callback: function(cn){
                        
                            //stage.removeChild(cn);
                            //stage.update();
                            return;
                        }
                    });
                },
                prepare: function(comp, c, info){
                    //ステータスバーの表示
                    app.statusbar.hide();
                    var prepare = app.statusbar.show({
                        activity: true,
                        text: String.format('再生の準備中...'),
                        duration: 30000
                    });
                    return;
                },
                ready: function(comp, c, info){
                    app.statusbar.hide();
                    return;
                },
                play: function(comp, c, info){
                    app.titlebar.hide();
                    
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
                pause: function(comp, c){
                    app.titlebar.show();
                    return;
                },
                complete: function(comp, c){
                    app.titlebar.show();
                    return;
                }
            }, config.listeners || {})
        });
    
        return;
    }



})();
