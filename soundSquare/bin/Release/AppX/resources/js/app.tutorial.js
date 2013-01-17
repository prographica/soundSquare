var app = app || {};
app.tutorial = {};

(function(){



    /**
     * チュートリアルの表示 
     */
    app.tutorial.show = function(config){
        config = config || {};

        var w = config.width || app.config.screenWidth;
        var sh = app.config.screenHeight;
        var h = config.height || 220;

        var base = app.modal.window({
            tpl: '#tutorial'        
        });
        
        var m = app.modal.show();
        m.on('click', function(){
            app.modal.hide();
            base.hide();
            return;
        });
        
        return;
    }



})();
