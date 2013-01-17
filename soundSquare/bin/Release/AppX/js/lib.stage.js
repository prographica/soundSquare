var lib = lib || {};


/**
 * WinJS用のメディアプレイバック
 */
(function () {

    var mediaControl = Windows.Media.MediaControl;
    var listeners = {};

    var notify = Windows.UI.Notifications;



    lib.stage.prototype.complete = function (config) {
        notify.TileUpdateManager.createTileUpdaterForApplication().clear();
        notify.BadgeUpdateManager.createBadgeUpdaterForApplication().clear();
    };




    lib.stage.prototype.createPlayer = function (config)
    {
        config = config || {};
        var data = config.data || {};
        var list = config.list || [];
        var current = config.current || 0;

        var remain = list.length - current;

        $.each(listeners, function(k, v){
            mediaControl.removeEventListener(k, v);
        });

        listeners = {
            playpressed: function () {
                player.play();
                Windows.Media.MediaControl.isPlaying = true;
            },

            playpausetogglepressed: function () {
                if (!player.paused) {
                    player.pause();
                    Windows.Media.MediaControl.isPlaying = false;
                } else {
                    player.play();
                    Windows.Media.MediaControl.isPlaying = true;
                }
            },

            stoppressed: function () {
            },

            pausepressed: function () {
                player.pause();
                Windows.Media.MediaControl.isPlaying = false;
            }
        }

        $.each(listeners, function(k, v){
            mediaControl.addEventListener(k, v, false);
        });

        var player = document.createElement('audio');
        player.setAttribute('msAudioCategory', 'backgroundcapablemedia');
        player.setAttribute('src', data.previewurl);

        if (config.listeners) {
            $.each(config.listeners, function (k, v) {
                player.addEventListener(k, v);
            });
        }

        //再生を開始した時にライブタイルを表示
        player.addEventListener('play', function (e) {
            var t = notify.TileTemplateType.tileWideSmallImageAndText04;
            var xml = notify.TileUpdateManager.getTemplateContent(t);


            (xml.getElementsByTagName('image'))[0].setAttribute('src', data.imageurl);
            (xml.getElementsByTagName('text'))[0].appendChild(xml.createTextNode(data.name));
            (xml.getElementsByTagName('text'))[1].appendChild(xml.createTextNode(data.artist_name));

            var n = new notify.TileNotification(xml);

            notify.TileUpdateManager.createTileUpdaterForApplication().clear();
            notify.TileUpdateManager.createTileUpdaterForApplication().update(n);

            var xml = notify.BadgeUpdateManager.getTemplateContent(notify.BadgeTemplateType.badgeNumber);

            (xml.getElementsByTagName("badge"))[0].setAttribute("value", remain);
            notify.BadgeUpdateManager.createBadgeUpdaterForApplication().clear();
            notify.BadgeUpdateManager.createBadgeUpdaterForApplication().update(new notify.BadgeNotification(xml));
            return;
        });

        return player;
    }




})();