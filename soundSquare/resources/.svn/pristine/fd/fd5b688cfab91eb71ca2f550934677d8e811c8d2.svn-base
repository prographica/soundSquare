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
        var h = config.height || 480;

        var base = app.modal.window({
        	tpl: '#tutorial-win',
        	width: 640,
			height: 480
        });
        
        var m = app.modal.show();
        m.on('click', function(){
        	app.modal.hide();

        	$('iframe', base).attr('src', '');
            base.hide();
            return;
        });
        
        return;
    }



})();
