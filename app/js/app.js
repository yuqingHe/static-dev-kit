/*global $ */
$(function(){

    function init(){
        changeFontSizeNewMicoSite();
    }
    init();

    var $scroll_ionic = $('#ionic-scroll');
	var $scroll_raw = $('#row-scroll');

	var $wrap_div = $('#wrap-div');
	var $body_div = $('#body-div');

	var $wrap_bg = $('#wrap-bg');
	var $body_bg = $('#body-bg');

	$('input').on("click",function(e){

        $scroll_ionic[0].checked === true ? $('body').addClass("ionic-body") : $('body').removeClass("ionic-body");

		
	});
 


 function keyBoardFix(){

		var 
			
			$isliderWrap = $("#iSlider-wrapper"),//渲染模板容器

			inputsOnFocus = function(){
				$html.css("height","100%");
				$body.css({"overflow":"visible","height":"100%"});
				$wrapDiv.height();
			},

			inputsOnBlur = function(){
				$html.css("height","");
				$body.css({"overflow":"","height":""});
				$wrapDiv.css("height", "");
			};

		//事件代理，绑定后处理事件
		$isliderWrap
			.on("focus", "input[placeholder], textarea", inputsOnFocus)
			.on("blur", "input[placeholder], textarea", inputsOnBlur);  
	};

});