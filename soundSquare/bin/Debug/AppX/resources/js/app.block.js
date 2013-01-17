var app = app || {};
app.block = {};


(function(){


    /**
     * ブロックの表示 
     */
    app.block.show = function(box, data)
    {
        var cn = app.block.create(box, data);
        return cn;
    }



    app.block.hide = function(){
    }



    /**
     * ブロックの生成 
     */
    app.block.create = function(box, data){
        var scale = 1;
        var sw = box.width;
        var w = sw * scale;
        var m = 0;

        //コンテナの作成
        var cn = new createjs.Container();

        var subcn = new createjs.Container();
        var bg = new createjs.Shape();
        bg.x = (box.width - w) / 2;
        bg.y = (box.height - w) / 2;
        bg.graphics.beginFill('#000').drawRect(0,0,w,w);
        bg.shadow = new createjs.Shadow("#000", 0, 0, 20);
        subcn.addChild(bg);

        //メインビットマップをロード
        var b = new createjs.Bitmap(data.imageurl);
        b.visible = false;
        b.image.onload = function(){
            b.scaleX = (w - m * 2) / b.image.width;
            b.scaleY = (w - m * 2) / b.image.height;
        
            b.x = (box.width - w) / 2 + m;
            b.y = (box.height - w) / 2 + m;
            
            init();
            return;
        }
        subcn.addChild(b);
        cn.addChild(subcn);

        var infocn = _createInfobar(box, data);
        infocn.x = sw;
        infocn.y = 0;
        cn.addChildAt(infocn, 0);

        var init = function(){
            //スタートの描写
            b.alpha = 0;
            b.visible = true;
            
            createjs.Tween.get(b).to({alpha: 1}, 300);
        }
        return cn;
    }



    _createInfobar = function(box, data){
        var sw = box.width;
        var bw = sw * 2;

        //情報ウィンドウの表示
        var cn = new createjs.Container();
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#000').drawRect(0, 0, bw, sw);
        bg.shadow = new createjs.Shadow("#000", 0, 0, 20);
        cn.addChildAt(bg);

        //サブコンテナの用意
        var subcn = new createjs.Container();
        subcn.x = 10;
        subcn.y = 3;

        //titleの表示
        var title = new createjs.Text(data.name || "No title", "bold 12px Arial", "#FFF");
        title.lineWidth  = bw;
        var s = new createjs.Shape();
        s.graphics.beginFill('#000').drawRect(0, 0, bw - 15, 14);
        s.visible = false;
        title.mask = s;
        subcn.addChild(title);
        
        //artistの表示
        var artist = new createjs.Text(data.artist_name || "No artist", "normal 10px Arial", "#FFF");
        var s = new createjs.Shape();
        s.graphics.beginFill('#000').drawRect(0, 15, bw - 15, 12);
        s.visible = false;
        artist.mask = s;
        artist.y = 15;
        
        subcn.addChild(artist);
        
        //categoryの表示
        var cat = new createjs.Text(data.category_name || "No category", "normal 10px Arial", "#FFF");
        
        var s = new createjs.Shape();
        s.graphics.beginFill('#000').drawRect(0, 28, bw - 15, 12);
        s.visible = false;
        cat.mask = s;
        cat.y = 28;
        subcn.addChild(cat);

        var w = 65;
        var bt = app.button.create({text: "Like", size: 20, width: w});
        bt.x = bw - w - w - 1;
        bt.y = (sw) - 24;
        bt.onClick = function(){
            app.block.addLike({
                data: data,
                callback: function(res){
                
                }
            });
            return;
        };
        cn.addChild(bt);

        var bt = app.button.create({text: "Buy", size: 20, width: w});
        bt.x = bw - w;
        bt.y = (sw) - 24;
        bt.onClick = function(){
            window.open(data.page_url);
            return;
        };
        cn.addChild(bt);

        cn.addChild(subcn);
        return cn;
    }



    /**
     * お気に入りに登録 
     */
    app.block.addLike = function(config){
        config = config || {};
        var data = config.data || {};

        //ログインしているかどうかを検査
        app.register.getUser({
            success: function(res){

                var inte = setTimeout(function(){
                    app.statusbar.hide();
                    app.statusbar.show({
                        activity: true,
                        text: String.format('{0}を登録中...', data.name),
                        duration: 30000
                    });
                    return;
                }, 800);

                app.ajax.request({
                    url: app.config.apiurl + "/index.php/user/like",
                    data: {
                        songid: data.id
                    },
                    success: function(res){

                        //インターバルを削除
                        clearTimeout(inte);

                        app.statusbar.hide();
                        app.statusbar.show({
                            image: data.imageurl,
                            text: String.format('{0}をお気に入りに登録しました', data.name),
                            duration: 5000
                        });

                        //コールバックを実行
                        if($.isFunction(config.callback)){
                            config.callback(res);
                        }

                        return;
                    }
                });

                return;
            }
        });
        return;
    }



})();
