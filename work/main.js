/**
 * author :小潘
 * time: 2015年9月9日 16:52:26
 * description:  整站仅有一个，避免再次创建，方便发布、压缩、合并
 */
requirejs.config({
    paths: {
        "lib": "lib",
        'jquery': "libs/jquery/jquery-2.1.4.min",
        "ionic": "libs/ionic/js/ionic.bundle",
        'app': "modules/baseapp/app"
    },
    shim: {
        "ionic": {
            'deps': ["jquery"]
        }
    }
});
require([
   "app", window.wxlib
], function (app, wxlib) {
    window.wx = wxlib;
    if (window.wx) {
        wx.config({
            debug: false,
            appId: window.appId,
            timestamp: window.timestamp,
            nonceStr: window.nonceStr,
            signature: window.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'getLocation', 'getNetworkType', 'chooseImage', 'uploadImage', 'downloadImage', 'previewImage', 'chooseWXPay']
        });
    }
    angular.element(document).ready(function () {
        document.addEventListener("DOMContentLoaded", function (event) {
            if (window.orientation == 90 || window.orientation == -90) {
                document.getElementById("csshardow").style.display = "block";
            }
        });
        window.addEventListener('orientationchange', function (event) {
            if (window.orientation == 180 || window.orientation == 0) {
                document.getElementById("csshardow").style.display = "none";
            }
            if (window.orientation == 90 || window.orientation == -90) {
                document.getElementById("csshardow").style.display = "block";
            }
        });
        // changefontSize();
        angular.bootstrap(document, ["BaseApp"]);
    });
});