var app = app || {};
app.ajax = {};


(function(){



    /**
     * 通信系ラッパー 
     */
    app.ajax.request = function(config){
        config = config || {};
        config.type = config.type ? config.type : 'POST';

        //オフラインの場合は、終了
        if (navi.onLine) {
            if (!config.slient) {
                app.alert('オフラインのため情報を取得することができませんでした');
                return;
            }
        }

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
                } catch(e) {

                    if(app.config.debug === true) {
                        console.log(res);
                    }

                    if(!$.isFunction(config.failure)) return;
                    config.failure.apply(config.scope || this, [{success: false}]);
                    return;
                }

                if(!$.isFunction(config.success)) return;
                config.success.apply(config.scope || this, [res]);
                return;
            },
            error: function () {

				//TODO エラーを出力

                if(!$.isFunction(config.failure)) return;
                config.failure.apply(config.scope || this, [{success: false}]);
                return;
            }
        }));
        return;
    }



})();
