<?PHP
/**
 * Seafプロジェクト
 * WEBブラウザからアクセスされるファイル
 */
/** 変数定義 **/
define('SEAF_ROOT_DIR', dirname(__FILE__) . '/../../../seaf');

//Seaf初期処理
require_once SEAF_ROOT_DIR . '/class/seaf.class.php';
Seaf::rc(realpath(dirname(__FILE__) . '/../../../conf'));

$fbappid = Seaf::ini('APP_FACEBOOK_CONKEY');
$fbappperm = Seaf::ini('APP_FACEBOOK_PERM');
$url = Seaf::ini('APP_URL');
?>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>soundSquare</title>
    <link rel="stylesheet" type="text/css" href="css/general.css" media="screen" />
    <script charset="utf-8" src="js/jquery-1.8.2.min.js"></script>
    <script charset="utf-8" src="js/dateformat.js"></script>
    <script charset="utf-8" src="js/easeljs/lib/easeljs-0.5.0.min.js"></script>
    <script charset="utf-8" src="js/tweenjs/lib/tweenjs-0.3.0.min.js"></script>
    <script charset="utf-8" src="js/soundjs/lib/soundjs-0.3.0.min.js"></script>

    <script charset="utf-8" src="js/jquery.activity-indicator-1.0.0.min.js"></script>
    <script charset="utf-8" src="js/jquery.extend.js"></script>
    <script charset="utf-8" src="js/jquery.easing-1.3.js"></script>
    <script charset="utf-8" src="js/jquery.transit.js"></script>

    <script charset="utf-8" src="js/lib.stage.js"></script>
    
    <script charset="utf-8" src="js/app.config.js"></script>
    <script charset="utf-8" src="js/index.js"></script>
    <script charset="utf-8" src="js/app.ajax.js"></script>
    <script charset="utf-8" src="js/app.loader.js"></script>
    <script charset="utf-8" src="js/app.facebook.js"></script>
    <script charset="utf-8" src="js/app.modal.js"></script>
    <script charset="utf-8" src="js/app.titlebar.js"></script>
    <script charset="utf-8" src="js/app.button.js"></script>
    <script charset="utf-8" src="js/app.block.js"></script>
    <script charset="utf-8" src="js/app.statusbar.js"></script>
    <script charset="utf-8" src="js/app.player.js"></script>
    <script charset="utf-8" src="js/app.setting.js"></script>
    <script charset="utf-8" src="js/app.tutorial.js"></script>
    
    <script charset="utf-8" src="js/app.main.js"></script>
    <script charset="utf-8" src="js/app.like.js"></script>
    <script charset="utf-8" src="js/app.register.js"></script>
    <script charset="utf-8">
    var app = app || {};
    app.config = {
        name: 'soundSquare',
        url: '<?PHP echo $url; ?>',
        baseurl: '.',
        apiurl: '/api',
        screenWidth: $(window).width(),
        screenHeight: $(window).height(),
        
        blockWidth: 70,
        blockCount: Math.ceil($(window).width() / 70),

        fbappid: '<?PHP echo $fbappid; ?>',
        fbperm: '<?PHP echo $fbappperm; ?>'
    };
    </script>
    </head>
    <body>
        <div id="fb-root"></div>
        <!--<canvas id="stage" width="500" height="300"></canvas>-->
        <div style="display: none;">

            <div id="profilebar" class="titlebar">
            </div>

            <div id="titlebar" class="titlebar">
                <div class="logo" id="logo"></div>
            
                <div id="notlogin" class="statusbar" style="display: none; margin-top: 6px;">
                    <ul class="bar">
                    <li id="tutorial" class="button">Tutorial</li>
                    <li id="register" class="button">Register</li>
                    <li id="settings" class="button black">Settings</li>
                    </ul>
                </div>
                
                <div id="login" class="statusbar" style="display: none; margin-top: 6px;">
                    <ul class="bar">
                    <li id="likes" class="button">Likes</li>
                    <li style="display: none;" id="friends" class="button">Friends</li>
                    <li id="settings" class="button black">Settings</li>
                    </ul>
                </div>
            
            </div>

            <div id="register-win" class="register modal-win">
                <div style="width: 320px; text-align: center; margin: 20px auto;">
                    <div class="logo"></div>
                    <p id="message">Please connect with Facebook to be a member!</p>
                    <div id="button" class="button facebook"></div>
                </div>
            </div>
            
            <div id="about-win">
                <div style="padding: 20px 0;">
                    <div class="logo"></div>
                    <p>by Jamlogic, INC. + techGarage Fukuoka</p>
                </div>
            </div>

            <div id="tutorial-win">
                <div class="step1">
                    <div class="logo"></div>
                    <p id="message">Please connect with Facebook to be a member!</p>
                    <div id="button" class="button facebook"></div>
                </div>
            </div>

        </div>
    </body>
</html>
