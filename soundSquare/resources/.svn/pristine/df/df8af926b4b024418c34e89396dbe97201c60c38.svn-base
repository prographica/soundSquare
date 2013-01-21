var app = app || {};

createjs.DisplayObject.suppressCrossDomainErrors = true;
createjs.Ticker.setFPS(60);


$(document).ready(function(){

    //ステータスバーの初期化
    app.statusbar.init({
        stageWidth: app.config.screenWidth,
        stageHeight: app.config.screenHeight,
        blockCount: app.config.blockCount,
        blockWidth: app.config.blockWidth
    });
        
    //メインステージの描画
    app.main.createStage();

    //オンラインの場合
    if(navigator.onLine){

        //フェースブッククラスの初期化
        app.facebook.init({
            appid: app.config.fbappid,
            permission: app.config.fbperm,

            //初期化して認証を通して実行
            callback: function(res){

            	if (res.status === 'connected') {
            		app.register.complete(res);
                    return;
                }

                app.titlebar.notlogin();
                return;
            }
        });
    }
    //オフラインの場合
    else{
        //初期した状態に
        app.titlebar.notlogin();
    }

    //オフラインになったら実行
    $(window).on('offline', function (event) {
        app.titlebar.notlogin();
        return;
    });


    //オンラインになったら実行
    $(window).on('online', function (event) {
        //フェースブッククラスの初期化
        app.facebook.init({
            appid: app.config.fbappid,
            permission: app.config.fbperm,

            //初期化して認証を通して実行
            callback: function(res){

                if(res.status === 'connected'){
                    app.register.complete(res);
                    return;
                }
                return;
            }
        });

        return;
    });

    return;
});
