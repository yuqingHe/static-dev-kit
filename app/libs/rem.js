/**
 * Created by greedy on 2016/8/8.
 * modified by tianyu.chen on 2016-8-16.
 * mail:tianyu.chen@xiaobao100.com | cty8998@163.com
 */

//==============================================================
//功能：rem+scale 布局实现自适应（适配retina,改编自手淘flexible）
//
//说明：历史原因，默认按照iphone 5s （640宽度）进行开发并适应其他屏幕
//
//参数：
//#  win 窗口window对象
//#  option{
//      designWidth: 设计稿宽度，必须
//      designHeight: 设计稿高度，不传的话则比例按照宽度来计算，可选
//      Rem: 设计稿宽高下用于计算的字体大小，默认40，可选
//      callback: 字体计算之后的回调函数，可选
//    }
//
// ps:请尽量第一时间运行此js计算字体
//==============================================================

"use strict";
var screenAdapt = {};//全局变量

!(function (win, option) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var dpr = 0;
    var scale = 0;
    var designWidth = option.designWidth;
    var designFontSize = option.designFontSize;
    // var callback = option.callback || {};
    var timer;

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIphone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIphone) {
            // iOS下，对于2和3的屏，用2倍、3倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);

    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no');
        docEl.firstElementChild.appendChild(metaEl);
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {//限制最大宽度，超出这个范围建议跳转至桌面站点
            // window.location.href = "http://www.xxx.com";
            width = 540 * dpr;
        }
        var rem = designWidth / designFontSize;//(rem per px)
        docEl.style.fontSize =  width / rem + 'px';
    }

    win.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(refreshRem, 300);
    }, false);

    // win.addEventListener('pageshow',function(e){// onpageshow事件在每次加载页面时触发，区别于onload
    //     if(e.persisted){//event.persisted判断页面是否从缓存中读取，是则返回true
    //         clearTimeout(timer);
    //         timer = setTimeout(refreshRem,300);
    //     }
    // },false);

    //字体初始化，防止跟着root Fontsize变动
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();
    
    screenAdapt.dpr = win.dpr = dpr;
    screenAdapt.refreshRem = refreshRem;
    screenAdapt.rem2px = function (d) {
        var val = parseFloat(d) * designFontSize;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    };
    screenAdapt.px2rem = function (d) {
        var val = parseFloat(d) / designFontSize;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    };

})(//配置项
    window, {
        designWidth: 640,
        designFontSize: 40,//根字体大小（40px/rem）
    });

