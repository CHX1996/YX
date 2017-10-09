
$(function(){
	
	var cartList = $('#cartList');
	var oprice = $('#price');
	var price = 0;
	
	// 存储数据
	/*
	 * localStorage 中存储 两个key
	 * 1.     cartLength
	 * 2. 	  cartData
	 */
	
	
	// 页面初始化
	if( localStorage.hasOwnProperty('cartData')  ){
		var cartDatas = localStorage.getItem('cartData');
		cartDatas = JSON.parse(cartDatas);
		
		if( cartDatas.length>0 ){
			for( var i=0;i<cartDatas.length;i++ ){
				
				var book = cartDatas[i];
				var pri = Number( book.price ) * book.num ;
				price += pri;
				createGoods( book,cartList );
			}
			
			price = Number(price);
			oprice.html( price.toFixed(2) );
		}	
	}
	
	
	// 点击 删除购物车中的商品
	cartList.on('click', 'a.del',function(e){
		e.stopPropagation();
		
		var li = $(this).parents('li');
		var bookId = li.attr('id');
		li.remove();
		
		var cartDatas = localStorage.getItem('cartData');
		cartDatas = JSON.parse(cartDatas);
		
		var index = dataIndex(cartDatas,bookId);
		var num = Number( cartDatas[index].num );
		var pri = Number( cartDatas[index].price );
		var minusPrice = num*pri;
		
		if( index > -1 ){
			cartDatas.splice( index,1 );	
		}
		
		var cartLength = Number( localStorage.getItem('cartLength') );
		cartLength = cartLength-num;
		localStorage.setItem('cartData', JSON.stringify(cartDatas) );
		localStorage.setItem('cartLength', cartLength );
		
		price = price-minusPrice;
		oprice.html( price.toFixed(2) );
		
	})
	
	// 通过商品id, 返回商品在数组的下标
	function dataIndex(arr,bookId){
		var index = -1;
		for( var i=0;i<arr.length;i++ ){
			var id = arr[i].bookId;
			if( id == bookId ){
				index = i;
			}
		}
		return index;
	}
	

	
	
	// 生成 购物车商品
	function createGoods( book,ul ){
		
		var li = $('<li></li>');
		li.attr('id', book.bookId);
		
		var html = '';
		html  += '<a class="img-a"> <img src="'+ book.bookCover +'" /> </a>';
		html  += '<div>';
		html  += 	'<span class="name">'+ book.bookName +'</span>';
		html  += 	'<span class="key-words">'+ book.keyWords +'</span>';
		html  += 	'<span class="price"><em>￥</em>'+ book.price.toFixed(2) +'</span>';
		html  += 	'<span class="num">'+ book.num +'</span>';
		html  += 	'<a href="javascript:;" class="del">删除</a>';
		html  += '</div>';
		
		li.html( html );
		console.log( html );
		ul.append(li );
	}
	
	
	
	
	
	
})
