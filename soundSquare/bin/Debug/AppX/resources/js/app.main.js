var app = app || {};
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
                                        
                                        app.like.createStage({
                                            listeners: {
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
                pause: function(c){
                    app.titlebar.show();
                    return;
                },
                complete: function(c){
                    app.titlebar.show();
                    return;
                }
            }, config.listeners || {})
        });
    
        return;
    }



})();
