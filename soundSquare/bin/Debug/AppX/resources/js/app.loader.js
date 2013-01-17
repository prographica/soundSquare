var app = app || {};
app.loader = {};


(function(){



    app.loader.init = function(config){
        config = config || {};
        if(!config.target) return false;
    
        var el = app.loader.create(config);
        el.appendTo($(config.target));
        return el;
    }



    app.loader.create = function(config){
        config = config || {};
    
        var el = $('<div class="loader"></div>');
        $('<div class="bg" />').appendTo(el);
        $('<div class="spinner" />').appendTo(el);
        el.hide();
        
        el.show = function(){
            sp();
            el.fadeIn();
            el.activity({color: '#FFF'});
        };

        el.hide = function(){
            el.fadeOut(null, function(){
                el.remove();
            });
            return;
        }

        var sp = function(){
            var x = (($(config.target).width() || $(window).width()) - el.width()) / 2;
            el.css('left', x);
            
            var y = (($(config.target).height() || $(window).height()) - el.height()) / 2;
            el.css('top', y);
        }
        $(window).resize(sp);

        return el;
    }



})();
