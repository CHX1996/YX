$(function(){
	
	//获取dom元素
	var box = $('#boxx');

	var pics = $("#pics");
	var dots = $('#dots');
	var flag = true;
	//每一个图片li
	var lis = pics.children();
	var dot = dots.children();

	//运动方式
	function toPlay(){
		flag = false;
		var curLeft = pics.position().left;

		//如果最后一张图片出现在视野中，那么就可以将第一张图片定位到最后一张图片的后面
		//第一张图片应该移动的位置：图片宽度 * 图片数量
		if (curLeft <= (1-lis.length) * lis.width()) {
			lis.eq(0).css('left',lis.width()*lis.length)
		}
		//当第一张图片出现在视野中的时候，还原图片和ul的位置
		if (curLeft <= -lis.length * lis.width()) {
			//还原第一张图的位置
			lis.eq(0).css('left',0);
			//还原ul的位置
			pics.css('left',0);
			//因为ul的位置改变了，所以需要重新获取ul的left值
			curLeft = 0;
		}
		
		//获取有checked样式的点
		var checked = $("#checked");
		//移除checked样式
		checked.removeClass('checked');
		//如果该点后面有兄弟节点
		if (checked.next().length != 0) {
			//让下一个兄弟节点加上checked样式
			checked.next().addClass('checked');
		}else{
			//如果该点已经是最后一个点了，就让第一个点加上checked样式
			dot.eq(0).addClass('checked');
		}

		//console.log(curLeft)
		//给图片切换加上动画效果
		pics.animate({
			left : curLeft - 820
		},1000,function(){
			flag = true;
		})
	}
	
	//隔多久切换一次图片
	var timer = setInterval(toPlay,3000)

	//box的移入移出事件
	box.hover(function(){
		clearInterval(timer)
	},function(){
		timer = setInterval(toPlay,2000)
	})
	
	//给点加上点击事件
	dot.click(function(){
		if (flag == false) {
			return;
		}

		//获取当前点击的点的索引
		var thisIndex = $(this).index();
		if (thisIndex == $('.checked').index()) {
			return;
		}


		//清空所有点的样式
		dot.removeClass('checked');

		//给自己加上样式
		$(this).addClass('checked');

		console.log(thisIndex)
		//ul的left值 = 点的索引值 * 每张图片的宽度
		pics.animate({
			left : -thisIndex * lis.width()
		},80)
	})

	var toLeft = $('.dir-left');
	toLeft.click(function(){
		//获取当前ul的left值
		var curLeft = pics.position().left;

		//当第一张图片出现的时候，将最后一张图片定位到第一张的前面
		if (curLeft == 0) {
			lis.last().css('left',lis.width() * (-lis.length))
		}
		//当最后一张图片出现的时候，还原位置
		if (curLeft >= lis.width()) {
			//还原最后一张图的位置
			lis.last().css('left',0);
			//还原ul的位置
			pics.css('left',(1-lis.length)*lis.width());
			//因为ul的位置改变了，所以需要重新获取ul的left值
			curLeft = (1-lis.length)*lis.width();
		}

		var checked = $(".checked");
		checked.removeClass('checked');
		if (checked.prev().length != 0) {
			checked.prev().addClass('checked');
		}else{
			//如果该点已经是最后一个点了，就让第一个点加上checked样式
			dot.last().addClass('checked');
		}

		pics.animate({
			left : curLeft + 820
		},80)
	})


	

})
