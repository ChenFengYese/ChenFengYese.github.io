/**
 * js缃戦〉闆姳鏁堟灉jquery鎻掍欢
 * 鎳掍汉寤虹珯 www.51xuediannao.com   鏁寸悊
 * @see http://workshop.rs
 */
(function($){

	$.fn.snow = function(options){

			var $flake 			= $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('&#10052;'),
				documentHeight 	= $(document).height(),
				documentWidth	= $(document).width(),
				defaults		= {
									minSize		: 10,		//闆姳鐨勬渶灏忓昂瀵�
									maxSize		: 20,		//闆姳鐨勬渶澶у昂瀵�
									newOn		: 1000,		//闆姳鍑虹幇鐨勯鐜�
									flakeColor	: "#FFFFFF"	//鎳掍汉寤虹珯 www.51xuediannao.com   鏁寸悊
								},
				options			= $.extend({}, defaults, options);

			var interval		= setInterval( function(){
				var startPositionLeft 	= Math.random() * documentWidth - 100,
				 	startOpacity		= 0.5 + Math.random(),
					sizeFlake			= options.minSize + Math.random() * options.maxSize,
					endPositionTop		= documentHeight - 40,
					endPositionLeft		= startPositionLeft - 100 + Math.random() * 500,
					durationFall		= documentHeight * 10 + Math.random() * 5000;
				$flake.clone().appendTo('body').css({
							left: startPositionLeft,
							opacity: startOpacity,
							'font-size': sizeFlake,
							color: options.flakeColor
						}).animate({
							top: endPositionTop,
							left: endPositionLeft,
							opacity: 0.2
						},durationFall,'linear',function(){
							$(this).remove()
						}
					);

			}, options.newOn);

	};

})(jQuery);
