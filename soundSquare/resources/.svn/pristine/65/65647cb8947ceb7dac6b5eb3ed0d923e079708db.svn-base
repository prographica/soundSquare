var app = app || {};
app.player = {};

(function(){


    /**
     * プレイヤーサインを表示 
     */
    app.player.sign = function(config)
    {
        config = config || {};
        if(!config.target || !config.status) return false;
        
        var el = $('<div class="player"></div>');
        $('<div class="bg" />').appendTo(el);
        $('<div class="'+config.status+'" />').appendTo(el);
        el.hide();

        var sp = function(){
            var x = (($(config.target).width() || $(window).width()) - el.width()) / 2;
            el.css('left', x);
            
            var y = (($(config.target).height() || $(window).height()) - el.height()) / 2;
            el.css('top', y);
        }
        $(window).resize(sp);
 
        el.appendTo($(config.target));
        sp();

        //表示
        el.show();
        el.css('opacity', 0);
        el.css('scale', 0.95);
        el.transition({scale: 1, opacity: 1});
        el.transition({scale: 1.2, opacity: 0}, function(){
            el.remove();
        });

        return el;
    };



})();
