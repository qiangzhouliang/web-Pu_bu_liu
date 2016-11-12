window.onload = function(){
	waterfall('main','box');
	var dataInt = {'data':[{'src':'23.jpg'},{'src':'24.jpg'},{'src':'25.jpg'},{'src':'26.jpg'},
					{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},
					{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},
					{'src':'35.jpg'},{'src':'36.jpg'},{'src':'37.jpg'},{'src':'38.jpg'},
					{'src':'39.jpg'},{'src':'40.jpg'},{'src':'41.jpg'},{'src':'42.jpg'}]}
	//拖动滚动条时，触发该事件
	window.onscroll = function(){
		if (checkScrollSlide) {
			var oPerent = document.getElementById('main');
			//具备了加载数据块的条件
			//将数据快渲染到页面尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oPerent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'img/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}
function waterfall(parent,box){
	//1 将mian下的所有 class 为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	//2 计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//3 设置main的宽度
	oParent.style.cssText = 'width: '+oBoxW * cols + 'px;margin:0 auto';
	//存放每一列高度的数组
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if(i < cols){//第一行
			hArr.push(oBoxs[i].offsetHeight);
		}else{//第二行或以下
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH+'px';
			//oBoxs[i].style.left = oBoxW*index+'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			hArr[index]+= oBoxs[i].offsetHeight;
		}
	}
	
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array();//用来存储获取到的所有 class为box的元素
	oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if (oElements[i].className == clsName) {
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//获取最小高度的索引
function getMinhIndex(arr,value){
	for(var i in arr){
		if (arr[i] == value) {
			return i;
		}
	}
}

//判断是否具备了滚动加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	//最后一个box的距离
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	//当前浏览器窗口的高度
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	
	return (lastBoxH < screenTop + height)?true : false;
}
