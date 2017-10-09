
$(function(){
	
//	localStorage.clear();
	
	var bookList = $('#bookList');
	var oCart = $('#cart');
	var bookData = data.bookList;
	var guc0=$('#guc0')
	var cartLength = 0;




	// 初始化
	for( var i=0;i<bookData.length;i++){
		var book = bookData[i];
		createBook( book, bookList );
	}
	if( localStorage.hasOwnProperty('cartLength') ){
		cartLength = Number( localStorage.getItem('cartLength') );
		oCart.html(cartLength);
	}


	
	// 点击 加入购物车
	bookList.on('click', '.add-cart',function(e){
		e.stopPropagation();
		
		var li = $(this).parents('li');
		var bookId = li.attr('id');
		var book = getBook(bookId);
		
		if( book ){
			// 可以加入
			cartLength += 1;
			oCart.html( cartLength );
			
			save( book );

			if( cartLength==0){

				guc0.show(1000,function(){
					guc0.css('display','block')
				})
			}
			else if( cartLength>0)
			{
				guc0.slideUp(1000,function(){
					guc0.css('display','none')
				})

			}
		}

		else{

			alert( '查无数据');
		}

	})
	
	// 存储数据
	/*
	 * localStorage 中存储 两个key
	 * 1.     cartLength
	 * 2. 	  cartData
	 */
	function save(book){
		if( localStorage.hasOwnProperty('cartData') ){
			
			var cartDatas = localStorage.getItem('cartData');
			cartDatas = JSON.parse(cartDatas);
			
			var index = dataIndex( cartDatas, book.bookId );
			if( index>-1 ){
				cartDatas[index].num += 1;
				
				localStorage.setItem('cartData',  JSON.stringify(cartDatas)  )
			}
			else{
				
				book.num = 1;
				cartDatas.push(book);
				
				localStorage.setItem('cartData', JSON.stringify(cartDatas) );
			}
		}
		else{
			
			var arr = [];
			book.num = 1;
			arr.push(book);
			
			localStorage.setItem('cartData', JSON.stringify(arr) );
		}
		
		localStorage.setItem('cartLength', cartLength);
	}
	
	// 查询当前购物车里面有没有  点击商品
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
	
	
	// 通过id，过去图书对象
	function getBook( bookId ){
		var book = null;
		for( var i=0;i<bookData.length;i++){	
			var id = bookData[i].bookId;
			if( bookId ==id ){
				book = bookData[i];
			}
		}
		return book;
	}
	
	
	
	
	// 动态添加商品
	function createBook( book, bookList ){
		var li = $('<li></li>');
		li.attr('id', book.bookId);
		
		var html = '';
		html += '<a class="img-a" > <img src="'+ book.bookCover +'" /> </a>';
		var price = book.price;
		html += '<p class="price"><em>￥</em>'+ price.toFixed(2) +'</p>';
		html += '<div>';
		html += '<span class="name">'+ book.bookName +'</span>';
		html += '<span class="key-words">'+ book.keyWords +'</span>';
		html += '</div>';
		html += '<a href="javascript:;" class="add-cart">加入购物车</a>';
	
		li.html( html );
		bookList.append(li);
	}
	
	
	
})
