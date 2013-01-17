var app = app || {};
app.statusbar = {};



(function(){

    var stage = null;
    var main = null;

    var count = 17;

    var stagex = 1024;
    var stagey = 768;
    var w = Math.ceil(stagex / count);

    var block = null;
    var inte = null;

    var stack = [];

    /**
     * 初期化 
     */
    app.statusbar.init = function(config){
        config = config || {};

        stagex = config.stageWidth;
        stagey = config.stageHeight;

        count = config.blockCount;
        w = config.blockWidth;

        return;
    }



    /**
     * ステータスバーを表示 
     */
    app.statusbar.show = function(config){
        config = config || {};

        //ブロックがない場合は作成
        if(!block){
            block = app.statusbar.create(config);
        }

        //まだ表示している場合
        if(inte){
            stack.push(config);
            return block;
        }

        block.css('top', w / 2 * -1);
        block.css('right', 0);

        $('.text', block).html(config.text || "");

        var img = $('.image', block);
        img.empty();

        if(config.image){
            $(String.format('<img src="{0}" />', config.image)).appendTo(img);
            img.show();
        }else{
            img.hide();
        }

        if(config.activity){
            $('.activity', block).show();
        }else{
            $('.activity', block).hide();
        }
        
        block.show();
        block.animate({
            top: 0
        }, 800, "easeInQuad");


        block.next = function(){
            block.animate({
                top: w / 2 * -1
            }, 300, "easeInQuad", function(){
                block.hide();
            
                inte = null;
                
                //スタックが存在する場合は表示
                if(stack.length > 0){
                    app.statusbar.show(stack.shift());
                    return;
                }
            
                return;
            });
            
            return;
        }


        inte = setTimeout(function(){
            block.next();
        }, config.duration || 3000);

        return block;
    }


    app.statusbar.hide = function(){
        if(!block) return;

        block.hide();
        clearTimeout(inte);
        inte = null;

        //スタックが存在する場合は表示
        if(stack.length > 0){
            app.statusbar.show(stack.shift());
            return;
        }

        return;
    }



    app.statusbar.create = function(config){
        config = config || {};

        var block = $('<div class="statusbar" id="statusbar"></div>').appendTo(document.body);
        block.css('position', 'fixed');
        block.css('height', w / 2);
        block.css('width', w * 4);
        block.css('z-index', 10000);
        block.hide();
        
        var act = $('<div class="activity"></div>').appendTo(block);
        act.activity({segments: 10, width:2, space: 0, length: 5, color: '#fff', speed: 1.5});
        act.hide();

        var image = $('<div class="image"></div>').appendTo(block);
        image.hide();
        
        var text = $('<p class="text"></p>').appendTo(block);

        return block;
    }



})();
