
/**
 * 子供から特定のIDのものを探す 
 */
$.extend({


    /**
     * 子要素から特定のスプライトを見つける 
     */
    findChild: function(id, c){
        var f = null;
        c._cache = c._cache || {};

        //中身にcacheを持つ
        if(c._cache[id]){
            return c._cache[id];
        }

        $.each(c.children, function(k, v){
            c._cache[v.id] = v;

            if(v.id === id){
                f = v;
                return false;
            }
        });

        return f;
    },


    /**
     * 子要素にキャッシュを生成 
     */
    genCache: function(id, v, c){
        c._cache = c._cache || {};
        c._cache[id] = v;
    
        return;
    },

    

    time: function(d)
    {
        var df = new DateFormat("mm:ss");
        var dobj = new Date();
        dobj.setTime(d);
        return df.format(dobj);
    }


});



$.extend(String, {
    format : function(format){
         var args = Array.prototype.slice.call(arguments, 1);
         return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
         });
    }
});
