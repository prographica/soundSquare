var app = app || {};
app.titlebar = {};



(function(){

    var cn = null;


    app.titlebar.show = function(config){
        config = config || {};

        //タイトルの表示
        if(!cn){
            cn = app.titlebar.create(config);

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



    app.titlebar.hide = function(config)
    {
        config = config || {};

        var title = cn;
        if(!cn) return cn;

        cn.animate({
            top: -200
        }, 400);
    }



    app.titlebar.login = function()
    {
        if(!cn) return; 

        var s1 = $('#login', cn);
        var s2 = $('#notlogin', cn);
        if(!s1 || !s2) return;
    
        s1.show();
        s2.hide();
    
        $('#likes', s1).css('opacity', 0);
        $('#friends', s1).css('opacity', 0);
        $('#settings', s1).css('opacity', 0);

        $('#logo', cn).animate({top: -100}, 0).animate({top: 0}, 800, 'easeOutBounce', function(){
            $('#likes', s1).animate({opacity: 1}, 500, 'easeOutBounce');
            $('#friends', s1).delay(300).animate({opacity: 1}, 500, 'easeOutBounce');
            $('#settings', s1).delay(600).animate({opacity: 1}, 500, 'easeOutBounce');
        });
        return;
    }
    
    
    
    app.titlebar.notlogin = function()
    {
        if(!cn) return; 
        
        var s1 = $('#login', cn);
        var s2 = $('#notlogin', cn);
        if(!s1 || !s2) return;
    
        s1.hide();
        s2.show();

        $('#register', s2).css('opacity', 0);
        $('#tutorial', s2).css('opacity', 0);
        $('#settings', s2).css('opacity', 0);

        $('#logo', cn).animate({top: -100}, 0).animate({top: 0}, 800, 'easeOutBounce', function(){
            $('#tutorial', s2).animate({opacity: 1}, 500, 'easeOutBounce');
            $('#register', s2).delay(300).animate({opacity: 1}, 500, 'easeOutBounce');
            $('#settings', s2).delay(600).animate({opacity: 1}, 500, 'easeOutBounce');
        });
        return;
    }



    /**
     * タイトルを表示 
     */
    app.titlebar.create = function(config){
        config = config || {};

        var lis = config.listeners || {};
        var target = config.target;

        var w = config.width;
        var h = config.height;

        var t = $('#titlebar');
        t.css('width', w);
        t.css('height', h);
        
        var s1 = $('#login', t);
        var s2 = $('#notlogin', t);

        //新規登録がクリックされたとき
        $('#register', s2).on('click', function(){
            var fn = lis.register;

            if(!$.isFunction(fn)) return;
            fn.call(target);
            return;
        });
        
        //チュートリアルがクリックされたとき
        $('#tutorial', s2).on('click', function(){
            var fn = lis.tutorial;
            
            if(!$.isFunction(fn)) return;
            fn.call(target);
            return;
        });

        //設定がクリックされたとき
        $('#settings', s2).on('click', function(){
            var fn = lis.settings;
            
            if(!$.isFunction(fn)) return;
            fn.call(target);
            return;
        });

        $('#likes', s1).on('click', function(){
            var fn = lis.likes;
            
            if(!$.isFunction(fn)) return;
            fn.call(target);
            return;
        });

        //設定がクリックされたとき
        $('#settings', s1).on('click', function(){
            var fn = lis.settings;
            
            if(!$.isFunction(fn)) return;
            fn.call(target);
            return;
        });

        t.appendTo($(document.body));
        return t;
    }


})();
