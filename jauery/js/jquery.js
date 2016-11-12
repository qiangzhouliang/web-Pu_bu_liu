$(window).on('load',function(){
	waterfall();
	var dataInt = {'data':[{'src':'23.jpg'},{'src':'24.jpg'},{'src':'25.jpg'},{'src':'26.jpg'},
					{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},
					{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},
					{'src':'35.jpg'},{'src':'36.jpg'},{'src':'37.jpg'},{'src':'38.jpg'},
					{'src':'39.jpg'},{'src':'40.jpg'},{'src':'41.jpg'},{'src':'42.jpg'}]}
	$(window).on('scroll',function(){
		if (checkScrollSlide) {
			$.each(dataInt.data,function(key,value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src','img/'+$(value).attr('src')).appendTo($(oPic));
			});
			waterfall();
		}
	});
});
function waterfall(){
	var $boxs = $("#main>div");//main下面的一级子元素，找出所有的div
	var W = $boxs.eq(0).outerWidth();//获取一列的宽度
	var cols = Math.floor($(window).width()/W);
	$("#main").width(W * cols).css('margin','0 auto');
	
	var hArr = [];
	//遍历元素
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if (index < cols) {
			hArr.push(h);
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);//找到索引
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex * W + 'px'
			});
			
			//改变某一列的值
			hArr[minHIndex] += $boxs.eq(index).outerHeight();
		}
	});
}

function checkScrollSlide(){
	var $lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	
	return (lastBoxDis < scrollTop + documentH)?true:false;
}
