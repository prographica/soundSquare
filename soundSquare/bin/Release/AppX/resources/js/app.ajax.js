var app = app || {};
app.ajax = {};


(function(){



    /**
     * 通信系ラッパー 
     */
    app.ajax.request = function(config){
        config = config || {};
        config.type = config.type ? config.type : 'POST';

        

        $.ajax($.extend({}, config, {
            success: function(res, success, xhr){

                if(!success){
                    if(!$.isFunction(config.failure)) return;
                    config.failure.apply(config.scope || this, [{success: false}]);
                    return;
                }

                //ajaxで正しい結果が帰ってきているか確認
                try{
                    res = $.parseJSON(res);
                }catch(e){
                    if(!$.isFunction(config.failure)) return;
                    config.failure.apply(config.scope || this, [{success: false}]);
                    return;
                }

                if(!$.isFunction(config.success)) return;
                config.success.apply(config.scope || this, [res]);
                return;
            },
            error: function(){
                if(!$.isFunction(config.failure)) return;
                config.failure.apply(config.scope || this, [{success: false}]);
                return;
            }
        }));
        return;
    }



})();
