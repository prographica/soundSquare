var app = app || {};
app.modal = {};


(function(){
    var base = null;



    /**
     * モーダルを表示 
     */
    app.modal.show = function(config){
        config = config || {};

        if(base){
            base.remove();
            base = null;
        }

        base = app.modal.create(); 

        if(config.color === "transparent"){
        	base.css('background-color', '#FFF');
        	base.css('opacity', .01);
        }else if(config.color){
            base.css('background-color', config.color);
        }else{
            base.css('background-color', '#000');
        }

        base.fadeIn(100);
        return base;
    }


    /**
     * モーダルを非表示 
     */
    app.modal.hide = function(){
        if(!base) return;
        base.fadeOut(100);
        return;
    }


    /**
     * モーダルを生成 
     */
    app.modal.create = function(){
        return $('<div class="modal-bg" />').appendTo($(document.body));
    }



    /**
     * ウィンドウを表示 
     */
    var _window = function(config){
        config = config || {};

        var m = app.modal.show();
        m.on('click', function(){
            app.modal.hide();
            base.fadeOut(200, function(){
                base.remove();
                return;
            });
            return;
        });

        var sh = app.config.screenHeight;
        var h = config.height || 120;

        var base = $('<div class="modal-win" />').appendTo($(document.body));
        base.css('width', app.config.screenWidth);

        if($.isFunction(config.render)){
            var inner = config.render.call(this, base);
            var h = inner.height();
            base.height(h);
        }

        base.bind('close', function(){
            m.trigger('click');
            return;
        });

        base.css('top', ((sh - h) / 2) < 0 ? 0 : ((sh - h) / 2));
        base.css('left', 0);
        return base;
    }



    app.modal.window = function(config){
        config = config || {};

        if(!config.tpl) return;

        var base = _window($.extend({
            render: function(base){
                var inner = $(
                    '<div style="text-align: center; margin: 0 auto;"/>'
                );
                inner.width(300);
                $(config.tpl).clone().appendTo(inner);

                inner.appendTo(base);
                return inner;
            },
            scope: this
        }, config));
        
        return base;
    }




    app.modal.alert = function(config){
        config = config || {};

        if(!config.message){
            return;
        }

        var base = _window($.extend({
            render: function(base){
                var inner = $(
                    '<div style="text-align: center; margin: 0 auto;"/>'
                ).appendTo(base);
                inner.width(300);

                ($('<p />').appendTo(inner)).html(config.message);
                
                var ul = $('<ul class="bar" style="width: 150px;"/>').appendTo(inner);
                
                ($(
                    '<li class="button" style="width: 149px;"/>'
                ).appendTo(ul)).text('OK').on('click', function(e){
                    base.trigger('close');
 
                    if(!$.isFunction(config.callback)) return;
                    config.callback.call(config.scope || this, 'OK');
                    return;
                });

                inner.append($('<div style="clear: both;" />'));
                return inner;
            },
            scope: this
        }, config));

        return base;
    }




    /**
     * 確認画面を表示 
     */
    app.modal.confirm = function(config){
        config = config || {};

        var base = _window($.extend({
            render: function(base){
                var inner = $(
                    '<div style="text-align: center; margin: 0 auto;"/>'
                ).appendTo(base);
                inner.width(300);

                ($('<p />').appendTo(inner)).html(config.message);
                
                var ul = $('<ul class="bar"/>').appendTo(inner);
                
                ($(
                    '<li class="button" style="width: 149px;"/>'
                ).appendTo(ul)).text('CANCEL').on('click', function(e){
                    base.trigger('close');
                    
                    if(!$.isFunction(config.callback)) return;
                    config.callback.call(config.scope || this, 'CANCEL');
                    return;
                });
                
                ($(
                    '<li class="button" style="width: 149px;"/>'
                ).appendTo(ul)).text('YES').on('click', function(e){
                    base.trigger('close');
                    
                    if(!$.isFunction(config.callback)) return;
                    config.callback.call(config.scope || this, 'YES');
                    return;
                });

                inner.append($('<div style="clear: both;" />'));

                return inner;
            },
            scope: this
        }, config));

        return base;
    }



})();
