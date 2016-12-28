define([
        "ionic",
        // "modules/baseapp/controller"
    ],
    function () {
        return angular.module("BaseApp", [
                "ionic"
            ])
            .config([
                "$urlRouterProvider", "$ionicConfigProvider", "$locationProvider",
                function ($urlRouterProvider, $ionicConfigProvider, $locationProvider) {
                    // $urlRouterProvider.otherwise("/index");
                    $ionicConfigProvider.platform.android.tabs.style("bottom");
                    $ionicConfigProvider.platform.android.tabs.position("bottom");
                    ionic.Platform.isFullScreen = true;
                    $ionicConfigProvider.scrolling.jsScrolling(true);
                    //关闭ionic页面切换动画
                    $ionicConfigProvider.views.transition("none");
                    //是否可直接分享，直接分享
                    if (window.isAllowDirectShare) {
                        $locationProvider.html5Mode(true);
                    }
                }
            ]).controller("BaseController", [
                "$scope", "$filter", "$rootScope", "$q", "$sce", "$timeout", "$ionicScrollDelegate",
                function ($scope, $filter, $rootScope, $q, $sce, $timeout, $ionicScrollDelegate) {
                    //初始化数据
                    $scope.initData = function () {
                        $scope.isShowDay = true;
                        $scope.isShowWeek = false;
                        $scope.isShowMonth = false;
                        $scope.cacheData = {};
                        $scope.data = {};
                    };
                    //初始化
                    $scope.init = function () {};
                    $scope.init();
                }
            ])
            .run([
                "$rootScope", "$state", "$stateParams", "$ionicPlatform", "$compile", "$browser", '$stateProvider',
                function ($rootScope, $state, $stateParams, $ionicPlatform, $compile, $browser, $stateProvider) {
                    $stateProvider.state('index', {
                        title: '我的场景',
                        cache: false,
                        url: '/index?id',
                        templateUrl: 'modules/baseapp/directive.html',
                        controller: 'BaseController'
                    });

                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    $state.go("index");

                    //warning 由于新rem规则适配需要，暂时只开放给新微官网使用
                    $rootScope.$on("$stateChangeSuccess", function (event, toState) {
                        if (toState.name.indexOf("newsite") !== -1 || toState.name.indexOf("activity") !== -1) {
                            window.changeFontSizeNewMicoSite();
                        } else {
                            // window.changefontSize();
                        }
                    });

                }
            ]);
    }
);