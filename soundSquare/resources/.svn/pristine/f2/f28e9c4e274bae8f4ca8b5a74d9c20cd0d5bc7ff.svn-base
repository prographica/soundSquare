var app = app || {};
app.button = {};



(function(){



    app.button.create = function(config)
    {
        config = config || {};

        var cn = new createjs.Container();
        
        var hit = new createjs.Shape();
        hit.graphics.beginFill("#ff0000").drawRect(0,0, config.width || 120, config.size + 4);
        //cn.hitArea = hit;
        cn.addChild(hit);

        var ar = new createjs.Bitmap(app.config.baseurl + '/images/arrow_right.png');
        ar.x = 0;
        ar.y = 0;
        ar.scaleX = .4 * (config.size / 24);
        ar.scaleY = .4 * (config.size / 24);
        cn.addChild(ar);

        var tb = new createjs.Text(config.text, "bold "+config.size+"px Arial", "#FFF");
        tb.x = config.size + 1;
        tb.y = 1;
        cn.addChild(tb);

        cn.onMouseOver = function(){
            document.body.style.cursor = "pointer";
            return;
        }
        
        cn.onMouseOut = function(){
            document.body.style.cursor = "default";
            return;
        }

        return cn;
    }




})();
